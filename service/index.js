import cookieParser from 'cookie-parser';
import bcrypt from 'bcryptjs';
import express from 'express';
import { v4 as uuid } from 'uuid';
import defaultSkips from './defaultSkips.js';
import { getDailyFractals, getItemById, getItemsByName, gw2Origin, itemIdForName } from './gw2.js';

const app = express();
const authCookieName = 'token';
const MAX_NOTES_LENGTH = 500;

// Users, skips, and votes live in memory and reset when the service restarts.
let users = [];
let skips = defaultSkips.map((skip) => ({ ...skip }));
const votes = new Set();

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
    user.token = uuid();
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
  if (notes.length > MAX_NOTES_LENGTH) {
    res.status(400).send({ msg: `Notes must be ${MAX_NOTES_LENGTH} characters or fewer` });
    return;
  }

  const skip = {
    id: `skip-${uuid()}`,
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
  res.send(await getDailyFractals());
});

// Item details from the Guild Wars 2 API.
// ?names=a,b returns icon data for the cheat sheet.
// ?name= returns one item for the lookup panel.
apiRouter.get('/items', async (req, res) => {
  if (req.query.names) {
    const names = String(req.query.names)
      .split(',')
      .map((name) => name.trim())
      .filter(Boolean);
    res.send({ items: await getItemsByName(names) });
    return;
  }

  const name = String(req.query.name || '').trim();
  const id = itemIdForName(name);
  if (!id) {
    res.status(404).send({ msg: `No Guild Wars 2 item is mapped for "${name}".` });
    return;
  }

  const item = await getItemById(id);
  res.send({
    date: new Date().toISOString().slice(0, 10),
    source: `${gw2Origin}/v2/items/${id}`,
    item,
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
    token: uuid(),
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

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
