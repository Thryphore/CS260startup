/**
 * Direct Guild Wars 2 API calls from the browser.
 * https://api.guildwars2.com allows cross-origin fetch.
 */

const GW2 = 'https://api.guildwars2.com';

/** Official item ids for the names shown on the gear page. */
const ITEM_IDS = {
  'Superior Sigil of Demon Slaying': 24664,
  'Superior Sigil of Force': 24615,
  'Powerful Potion of Demon Slaying': 8886,
  'Superior Sigil of Impact': 24868,
  'Superior Sharpening Stone': 9443,
  'Superior Sigil of the Night': 36053,
  "Powerful Potion of Slaying Scarlet's Armies": 50082,
  'Superior Sigil of Icebrood Slaying': 24651,
  'Extended Potion of Sons of Svanir Slaying': 8487,
  'Superior Sigil of Justice': 24678,
  'Extended Potion of Outlaw Slaying': 8488,
  'Superior Sigil of Wrath': 24667,
  'Superior Sigil of Grawl Slaying': 24648,
  'Extended Potion of Inquest Slaying': 8490,
  'Superior Sigil of Sorrow': 24684,
  'Extended Potion of Dredge Slaying': 8492,
  'Superior Sigil of Elemental Slaying': 24661,
  'Powerful Potion of Elemental Slaying': 8885,
  'Superior Sigil of Serpent Slaying': 24658,
};

/** Labels that add a note onto a real item name. */
const NAME_ALIASES = {
  'Powerful Potion of Demon Slaying (endboss swap)': 'Powerful Potion of Demon Slaying',
  'Extended Potion of Outlaw Slaying / Elemental as needed': 'Extended Potion of Outlaw Slaying',
};

function canonicalName(name) {
  return NAME_ALIASES[name] || name;
}

function knownItemId(name) {
  return ITEM_IDS[canonicalName(name)] || null;
}

function shapeItem(item) {
  const effect = item.details?.infix_upgrade?.buff?.description;
  return {
    id: item.id,
    name: item.name,
    type: item.type,
    rarity: item.rarity,
    level: item.level,
    description: effect || stripMarkup(item.description),
    icon: item.icon,
  };
}

function stripMarkup(value) {
  return String(value || '')
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function unavailableItem(itemName, message) {
  return {
    date: new Date().toISOString().slice(0, 10),
    source: `${GW2}/v2/items`,
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
  const ids = [...new Set(names.map(knownItemId).filter(Boolean))];
  if (!ids.length) return {};

  try {
    const response = await fetch(`${GW2}/v2/items?ids=${ids.join(',')}`);
    if (!response.ok) return {};
    const items = await response.json();
    const byId = new Map(items.map((item) => [item.id, shapeItem(item)]));
    const byName = {};
    for (const name of names) {
      const item = byId.get(knownItemId(name));
      if (item) byName[name] = item;
    }
    return byName;
  } catch {
    return {};
  }
}

export async function getItemDetails(itemName) {
  const id = knownItemId(itemName);
  if (!id) {
    return unavailableItem(itemName, `No Guild Wars 2 item is mapped for "${itemName}".`);
  }

  try {
    const response = await fetch(`${GW2}/v2/items/${id}`);
    if (!response.ok) {
      return unavailableItem(itemName, 'Item lookup failed.');
    }
    return {
      date: new Date().toISOString().slice(0, 10),
      source: `${GW2}/v2/items/${id}`,
      item: shapeItem(await response.json()),
    };
  } catch {
    return unavailableItem(itemName, 'Could not reach the Guild Wars 2 API.');
  }
}

export async function getDailyFractals() {
  const source = `${GW2}/v2/achievements/categories/88`;
  const empty = {
    date: new Date().toISOString().slice(0, 10),
    fractals: [],
    recommended: [],
    source,
    error: 'Daily fractals are unavailable.',
  };

  try {
    const categoryResponse = await fetch(`${source}?v=latest`);
    if (!categoryResponse.ok) return empty;
    const category = await categoryResponse.json();
    const ids = category.achievements.map((entry) => entry.id).join(',');
    const achievementsResponse = await fetch(`${GW2}/v2/achievements?ids=${ids}`);
    if (!achievementsResponse.ok) return empty;
    const achievements = await achievementsResponse.json();

    const fractals = [];
    const recommended = [];
    for (const achievement of achievements) {
      const tier = achievement.name.match(/^Daily Tier \d+ (.+)$/);
      if (tier && !fractals.includes(tier[1])) fractals.push(tier[1]);
      const scale = achievement.name.match(/Scale (\d+)/);
      if (scale) recommended.push(`Scale ${scale[1]}`);
    }

    return {
      date: new Date().toISOString().slice(0, 10),
      fractals,
      recommended,
      source,
    };
  } catch {
    return empty;
  }
}
