const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const defaultSkips = require('./defaultSkips');

const app = express();
const authCookieName = 'token';

// Users, skips, and votes live in memory and reset when the service restarts.
let users = [];
let skips = defaultSkips.map((skip) => ({ ...skip }));
const votes = new Set();

const ITEM_IDS = {
  'Superior Sigil of Force': 24615,
  'Superior Sigil of Impact': 24868,
  'Superior Sigil of the Night': 36053,
};

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

const apiRouter = express.Router();
app.use('/api', apiRouter);

// CreateAuth a new user
apiRouter.post('/auth/create', async (req, res) => {
  const email = normalizeEmail(req.body.email);
  const password = req.body.password;
  if (!email || !password) {
    res.status(400).send({ msg: 'Email and password are required' });
    return;
  }
  if (await findUser('email', email)) {
    res.status(409).send({ msg: 'Existing user' });
    return;
  }

  const user = await createUser(email, password);
  setAuthCookie(res, user.token);
  res.send({ email: user.email, username: user.username });
});

// GetAuth login an existing user
apiRouter.post('/auth/login', async (req, res) => {
  const email = normalizeEmail(req.body.email);
  const user = await findUser('email', email);
  if (user && (await bcrypt.compare(req.body.password, user.password))) {
    user.token = uuid.v4();
    setAuthCookie(res, user.token);
    res.send({ email: user.email, username: user.username });
    return;
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// DeleteAuth logout a user
apiRouter.delete('/auth/logout', async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    delete user.token;
  }
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// Current user from the auth cookie. Used to restore the session after refresh.
apiRouter.get('/auth/me', async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (!user) {
    res.status(401).send({ msg: 'Unauthorized' });
    return;
  }
  res.send({ email: user.email, username: user.username });
});

// GetSkips — public, like browsing the list before signing in
apiRouter.get('/skips', (_req, res) => {
  res.send(sortedSkips());
});

// SubmitSkip — restricted
apiRouter.post('/skips', verifyAuth, (req, res) => {
  const fractal = String(req.body.fractal || '').trim();
  const title = String(req.body.title || '').trim();
  const notes = String(req.body.notes || '').trim();
  if (!fractal || !title || !notes) {
    res.status(400).send({ msg: 'Fractal, title, and notes are required' });
    return;
  }

  const skip = {
    id: `skip-${uuid.v4()}`,
    fractal,
    title,
    notes,
    submittedBy: req.user.username,
    votes: 0,
  };
  skips.unshift(skip);
  res.send(sortedSkips());
});

// Upvote a skip — restricted, one vote per user
apiRouter.post('/skips/:id/vote', verifyAuth, (req, res) => {
  const skip = skips.find((entry) => entry.id === req.params.id);
  if (!skip) {
    res.status(404).send({ msg: 'Skip not found', skips: sortedSkips() });
    return;
  }

  const key = `${req.user.email}:${skip.id}`;
  if (votes.has(key)) {
    res.status(409).send({ msg: 'You already voted for this skip.', skips: sortedSkips() });
    return;
  }

  votes.add(key);
  skip.votes += 1;
  res.send({ skips: sortedSkips() });
});

// Today's fractal dailies from the Guild Wars 2 API
apiRouter.get('/dailies', async (_req, res) => {
  const category = await gw2('/v2/achievements/categories/88?v=latest');
  const ids = category.achievements.map((entry) => entry.id).join(',');
  const achievements = await gw2(`/v2/achievements?ids=${ids}`);

  const fractals = [];
  const recommended = [];
  for (const achievement of achievements) {
    const tier = achievement.name.match(/^Daily Tier \d+ (.+)$/);
    if (tier && !fractals.includes(tier[1])) {
      fractals.push(tier[1]);
    }
    const scale = achievement.name.match(/Scale (\d+)/);
    if (scale) {
      recommended.push(`Scale ${scale[1]}`);
    }
  }

  res.send({
    date: new Date().toISOString().slice(0, 10),
    fractals,
    recommended,
    source: 'https://api.guildwars2.com/v2/achievements/categories/88',
  });
});

// Item details from the Guild Wars 2 API
apiRouter.get('/items', async (req, res) => {
  const name = String(req.query.name || '').trim();
  const id = ITEM_IDS[name];
  if (!id) {
    res.status(404).send({ msg: `No Guild Wars 2 item is mapped for "${name}".` });
    return;
  }

  const item = await gw2(`/v2/items/${id}`);
  const effect = item.details?.infix_upgrade?.buff?.description;
  res.send({
    date: new Date().toISOString().slice(0, 10),
    source: `https://api.guildwars2.com/v2/items/${id}`,
    item: {
      id: item.id,
      name: item.name,
      type: item.type,
      rarity: item.rarity,
      level: item.level,
      description: effect || item.description,
      icon: item.icon,
    },
  });
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500).send({ type: err.name, message: err.message });
});

app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

function sortedSkips() {
  return [...skips].sort((a, b) => b.votes - a.votes);
}

async function verifyAuth(req, res, next) {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    req.user = user;
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
}

async function createUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 10);
  const user = {
    email,
    username: email.split('@')[0] || email,
    password: passwordHash,
    token: uuid.v4(),
  };
  users.push(user);
  return user;
}

async function findUser(field, value) {
  if (!value) return null;
  return users.find((user) => user[field] === value);
}

function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase();
}

function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    maxAge: 1000 * 60 * 60 * 24 * 365,
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

async function gw2(path) {
  const response = await fetch(`https://api.guildwars2.com${path}`);
  if (!response.ok) {
    const error = new Error(`Guild Wars 2 API returned ${response.status}`);
    error.status = 502;
    throw error;
  }
  return response.json();
}

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
