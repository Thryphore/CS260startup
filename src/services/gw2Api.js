/**
 * Frontend wrappers for service endpoints that call the Guild Wars 2 API.
 */

export async function getItemDetails(itemName) {
  const response = await fetch(`/api/items?name=${encodeURIComponent(itemName)}`);
  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    return {
      date: new Date().toISOString().slice(0, 10),
      source: 'https://api.guildwars2.com/v2/items',
      error: body.msg || body.message || 'Item lookup failed.',
      item: {
        id: '',
        name: itemName,
        type: '',
        rarity: '',
        level: '',
        description: body.msg || body.message || 'No details returned.',
        icon: null,
      },
    };
  }
  return body;
}

export async function getDailyFractals() {
  const response = await fetch('/api/dailies');
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    return {
      date: new Date().toISOString().slice(0, 10),
      fractals: [],
      recommended: [],
      source: 'https://api.guildwars2.com/v2/achievements/categories/88',
      error: body.message || 'Daily fractals are unavailable.',
    };
  }
  return response.json();
}
