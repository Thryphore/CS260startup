import cookieParser from 'cookie-parser';
import bcrypt from 'bcryptjs';
import express from 'express';
import morgan from 'morgan';
import { v4 as uuid } from 'uuid';
import {
  addSkip,
  addUser,
  addVote,
  connectDatabase,
  getSkipById,
  getSkips,
  getUserByEmail,
  getUserByToken,
  removeUserToken,
  updateUserToken,
} from './database.js';
import { getDailyFractals, getItemById, getItemsByName, gw2Origin, itemIdForName } from './gw2.js';

const app = express();
const authCookieName = 'token';
const MAX_NOTES_LENGTH = 500;

const port = process.env.PORT || (process.argv.length > 2 ? process.argv[2] : 4000);

app.use(morgan('dev'));
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
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    res.status(400).send({ msg: 'A valid email is required' });
    return;
  }
  if (await getUserByEmail(email)) {
    res.status(409).send({ msg: 'Existing user' });
    return;
  }

  const user = await createUser(email, password);
  try {
    await addUser(user);
  } catch (ex) {
    if (ex.code === 11000) {
      res.status(409).send({ msg: 'Existing user' });
      return;
    }
    throw ex;
  }
  setAuthCookie(res, user.token);
  res.send({ email: user.email, username: user.username });
});

// GetAuth login an existing user
apiRouter.post('/auth/login', async (req, res) => {
  const email = normalizeEmail(req.body.email);
  const user = await getUserByEmail(email);
  if (user && (await bcrypt.compare(req.body.password, user.password))) {
    const token = uuid();
    await updateUserToken(user.email, token);
    setAuthCookie(res, token);
    res.send({ email: user.email, username: user.username });
    return;
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// DeleteAuth logout a user
apiRouter.delete('/auth/logout', async (req, res) => {
  const user = await getUserByToken(req.cookies[authCookieName]);
  if (user) {
    await removeUserToken(user.email);
  }
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// Current user from the auth cookie. Used to restore the session after refresh.
apiRouter.get('/auth/me', async (req, res) => {
  const user = await getUserByToken(req.cookies[authCookieName]);
  if (!user) {
    res.status(401).send({ msg: 'Unauthorized' });
    return;
  }
  res.send({ email: user.email, username: user.username });
});

// GetSkips — public, like browsing the list before signing in
apiRouter.get('/skips', async (_req, res) => {
  res.send(await getSkips());
});

// SubmitSkip — restricted
apiRouter.post('/skips', verifyAuth, async (req, res) => {
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
  await addSkip(skip);
  res.send(await getSkips());
});

// Upvote a skip — restricted, one vote per user
apiRouter.post('/skips/:id/vote', verifyAuth, async (req, res) => {
  const skip = await getSkipById(req.params.id);
  if (!skip) {
    res.status(404).send({ msg: 'Skip not found', skips: await getSkips() });
    return;
  }

  const added = await addVote(req.user.email, skip.id);
  if (!added) {
    res.status(409).send({ msg: 'You already voted for this skip.', skips: await getSkips() });
    return;
  }

  res.send({ skips: await getSkips() });
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

async function verifyAuth(req, res, next) {
  const user = await getUserByToken(req.cookies[authCookieName]);
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
  return user;
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

connectDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  })
  .catch((ex) => {
    console.log(`Unable to connect to database: ${ex.message}`);
    process.exit(1);
  });
