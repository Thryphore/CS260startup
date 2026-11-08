/**
 * Skip list calls. The Express service keeps the list in memory.
 */

import { readBody } from '@/services/apiUtils';

export async function getSkips() {
  const response = await fetch('/api/skips');
  if (!response.ok) {
    throw new Error('Could not load skips.');
  }
  return response.json();
}

export async function addSkip({ fractal, title, notes }) {
  try {
    const response = await fetch('/api/skips', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({ fractal, title, notes }),
    });
    const body = await readBody(response);
    if (!response.ok || body.error) {
      return { ok: false, error: body.msg || body.error || 'Could not submit skip.', skips: body.skips || [] };
    }
    return { ok: true, skips: body };
  } catch {
    return { ok: false, error: 'Could not reach the service.', skips: [] };
  }
}

export async function upvoteSkip(skipId) {
  try {
    const response = await fetch(`/api/skips/${encodeURIComponent(skipId)}/vote`, {
      method: 'POST',
    });
    const body = await readBody(response);
    if (!response.ok || body.error) {
      return { ok: false, error: body.msg || body.error || 'Could not record vote.', skips: body.skips || [] };
    }
    return { ok: true, skips: body.skips };
  } catch {
    return { ok: false, error: 'Could not reach the service.', skips: [] };
  }
}
