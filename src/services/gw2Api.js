/**
 * Hard-coded Guild Wars 2 API-shaped responses.
 * Will be replaced with real calls to https://api.guildwars2.com in a later deliverable.
 */

const ITEM_CATALOG = {
  'Superior Sigil of Force': {
    id: 24615,
    name: 'Superior Sigil of Force',
    type: 'UpgradeComponent',
    rarity: 'Exotic',
    level: 60,
    description: '+5% Damage',
    icon: 'https://render.guildwars2.com/file/2E71337A984C05C317C3D4BF33DF71F0608ADDAC/220767.png',
  },
  'Superior Sigil of Impact': {
    id: 24868,
    name: 'Superior Sigil of Impact',
    type: 'UpgradeComponent',
    rarity: 'Exotic',
    level: 60,
    description: '+3% damage / +7% vs stunned or knocked-down foes',
    icon: 'https://render.guildwars2.com/file/0A1D0BDB0F0F3C0E0C0E0C0E0C0E0C0E0C0E0C0E/220768.png',
  },
  'Superior Sigil of the Night': {
    id: 36053,
    name: 'Superior Sigil of the Night',
    type: 'UpgradeComponent',
    rarity: 'Exotic',
    level: 60,
    description: '+10% Damage at night',
    icon: 'https://render.guildwars2.com/file/night-sigil-placeholder/220769.png',
  },
  'Relic of the Fractal': {
    id: 100543,
    name: 'Relic of the Fractal',
    type: 'Relic',
    rarity: 'Exotic',
    level: 60,
    description: 'Gain increased outgoing damage after using a healing skill in fractals.',
    icon: 'https://render.guildwars2.com/file/relic-fractal-placeholder/220770.png',
  },
  "Potion of Slaying Scarlet's Armies": {
    id: 8493,
    name: "Potion of Slaying Scarlet's Armies",
    type: 'Consumable',
    rarity: 'Fine',
    level: 80,
    description: '+10% Damage vs Scarlet\'s armies',
    icon: 'https://render.guildwars2.com/file/scarlet-potion-placeholder/220771.png',
  },
};

const FALLBACK_ITEM = {
  id: 0,
  name: 'Unknown Item',
  type: 'UpgradeComponent',
  rarity: 'Exotic',
  level: 80,
  description: 'Mock GW2 API placeholder item.',
  icon: null,
};

/**
 * Returns a response shaped like GET /v2/items/:id from the GW2 API.
 */
export function getItemDetails(itemName) {
  // This will be replaced with a 3rd party service call
  const item = ITEM_CATALOG[itemName] || {
    ...FALLBACK_ITEM,
    name: itemName,
    description: `Mocked details for "${itemName}". Real stats will come from api.guildwars2.com.`,
  };

  return {
    date: new Date().toISOString().slice(0, 10),
    source: 'https://api.guildwars2.com/v2/items (mocked)',
    item,
  };
}

/**
 * Mock daily fractals endpoint shape (GET /v2/achievements/daily).
 */
export function getDailyFractals() {
  // This will be replaced with a 3rd party service call
  return {
    date: new Date().toISOString().slice(0, 10),
    fractals: ['Nightmare', 'Chaos Isles', 'Deepstone'],
    source: 'https://api.guildwars2.com (mocked)',
  };
}
