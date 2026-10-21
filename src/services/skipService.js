/**
 * Skip persistence via localStorage.
 * Will be replaced with database service calls in a later deliverable.
 */

import { DEFAULT_SKIPS } from '@/data/defaultSkips';

const SKIPS_KEY = 'fsh_skips';
const VOTES_KEY = 'fsh_votes';

function readSkips() {
  try {
    const stored = localStorage.getItem(SKIPS_KEY);
    if (!stored) {
      localStorage.setItem(SKIPS_KEY, JSON.stringify(DEFAULT_SKIPS));
      return [...DEFAULT_SKIPS];
    }
    return JSON.parse(stored);
  } catch {
    return [...DEFAULT_SKIPS];
  }
}

function writeSkips(skips) {
  localStorage.setItem(SKIPS_KEY, JSON.stringify(skips));
}

function readVotes() {
  try {
    return JSON.parse(localStorage.getItem(VOTES_KEY) || '{}');
  } catch {
    return {};
  }
}

function writeVotes(votes) {
  localStorage.setItem(VOTES_KEY, JSON.stringify(votes));
}

export function getSkips() {
  return readSkips().sort((a, b) => b.votes - a.votes);
}

export function addSkip({ fractal, title, notes, submittedBy }) {
  const skips = readSkips();
  const skip = {
    id: `skip-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    fractal,
    title: title.trim(),
    notes: notes.trim(),
    submittedBy,
    votes: 0,
  };
  skips.unshift(skip);
  writeSkips(skips);
  return skip;
}

export function upvoteSkip(skipId, username) {
  const votes = readVotes();
  const key = `${username}:${skipId}`;
  if (votes[key]) {
    return { ok: false, error: 'You already voted for this skip.', skips: getSkips() };
  }

  const skips = readSkips();
  const index = skips.findIndex((s) => s.id === skipId);
  if (index === -1) {
    return { ok: false, error: 'Skip not found.', skips: getSkips() };
  }

  skips[index] = { ...skips[index], votes: skips[index].votes + 1 };
  writeSkips(skips);
  votes[key] = true;
  writeVotes(votes);
  return { ok: true, skips: getSkips() };
}
