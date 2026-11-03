/**
 * Skip list calls. The Express service keeps the list in memory.
 */

async function readBody(response) {
  try {
    return await response.json();
  } catch {
    return {};
  }
}

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
    if (!response.ok) {
      return { ok: false, error: body.msg || 'Could not submit skip.', skips: body.skips || [] };
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
    if (!response.ok) {
      return { ok: false, error: body.msg || 'Could not record vote.', skips: body.skips || [] };
    }
    return { ok: true, skips: body.skips };
  } catch {
    return { ok: false, error: 'Could not reach the service.', skips: [] };
  }
}
