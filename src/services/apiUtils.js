/**
 * Shared fetch helpers for the service client modules.
 */

export async function readBody(response) {
  try {
    return await response.json();
  } catch {
    return { error: 'Failed to parse server response' };
  }
}
