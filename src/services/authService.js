/**
 * Auth helpers. The service stores the password hash and sets an httpOnly
 * auth cookie. This module only remembers the display user for the UI.
 */

import { readBody } from '@/services/apiUtils';

const SESSION_KEY = 'fsh_session';

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

export async function createAccount(email, password) {
  return loginOrCreate('/api/auth/create', email, password, 'Could not create account.');
}

export async function login(email, password) {
  return loginOrCreate('/api/auth/login', email, password, 'Could not sign in.');
}

async function loginOrCreate(endpoint, email, password, fallbackError) {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    });
    const body = await readBody(response);
    if (response.status === 200 && !body.error) {
      const user = { email: body.email, username: body.username };
      setSession(user);
      return { ok: true, user };
    }
    return { ok: false, error: body.msg || body.error || fallbackError };
  } catch {
    return { ok: false, error: 'Could not reach the service.' };
  }
}

export async function logout() {
  try {
    await fetch('/api/auth/logout', { method: 'DELETE' });
  } catch {
    // Still clear the local display user if the service is unreachable.
  }
  setSession(null);
}

export async function getMe() {
  try {
    const response = await fetch('/api/auth/me');
    if (!response.ok) {
      setSession(null);
      return { ok: false };
    }
    const body = await readBody(response);
    const user = { email: body.email, username: body.username };
    setSession(user);
    return { ok: true, user };
  } catch {
    return { ok: false, error: 'Could not reach the service.' };
  }
}
