/**
 * Guild Wars 2 data loaded through the Express service.
 * The service is the only caller of https://api.guildwars2.com.
 */

const DAILY_SOURCE = 'https://api.guildwars2.com/v2/achievements/categories/88';

function unavailableItem(itemName, message) {
  return {
    date: new Date().toISOString().slice(0, 10),
    source: '/api/items',
    error: message,
    item: {
      id: '',
      name: itemName,
      type: '',
      rarity: '',
      level: '',
      description: message,
      icon: null,
    },
  };
}

export async function getItemsByName(names) {
  const unique = [...new Set(names.filter(Boolean))];
  if (!unique.length) return {};

  try {
    const params = new URLSearchParams({ names: unique.join(',') });
    const response = await fetch(`/api/items?${params}`);
    if (!response.ok) return {};
    const body = await response.json();
    return body.items || {};
  } catch {
    return {};
  }
}

export async function getItemDetails(itemName) {
  try {
    const params = new URLSearchParams({ name: itemName });
    const response = await fetch(`/api/items?${params}`);
    const body = await response.json().catch(() => ({}));
    if (!response.ok) {
      return unavailableItem(itemName, body.msg || 'Item lookup failed.');
    }
    return body;
  } catch {
    return unavailableItem(itemName, 'Could not reach the service.');
  }
}

export async function getDailyFractals() {
  const empty = {
    date: new Date().toISOString().slice(0, 10),
    fractals: [],
    recommended: [],
    source: DAILY_SOURCE,
    error: 'Daily fractals are unavailable.',
  };

  try {
    const response = await fetch('/api/dailies');
    if (!response.ok) return empty;
    return response.json();
  } catch {
    return empty;
  }
}
