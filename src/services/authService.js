/**
 * Auth helpers backed by localStorage.
 * Will be replaced with Express + MongoDB auth in a later deliverable.
 */

const USERS_KEY = 'fsh_users';
const SESSION_KEY = 'fsh_session';

function readUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '{}');
  } catch {
    return {};
  }
}

function writeUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function getSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
  } catch {
    return null;
  }
}

export function setSession(user) {
  if (user) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(SESSION_KEY);
  }
}

export function createAccount(email, password) {
  const normalized = email.trim().toLowerCase();
  if (!normalized || !password) {
    return { ok: false, error: 'Email and password are required.' };
  }

  const users = readUsers();
  if (users[normalized]) {
    return { ok: false, error: 'An account with that email already exists.' };
  }

  const username = normalized.split('@')[0] || normalized;
  users[normalized] = { email: normalized, password, username };
  writeUsers(users);

  const session = { email: normalized, username };
  setSession(session);
  return { ok: true, user: session };
}

export function login(email, password) {
  const normalized = email.trim().toLowerCase();
  const users = readUsers();
  const account = users[normalized];

  if (!account || account.password !== password) {
    return { ok: false, error: 'Invalid email or password.' };
  }

  const session = { email: account.email, username: account.username };
  setSession(session);
  return { ok: true, user: session };
}

export function logout() {
  setSession(null);
}
