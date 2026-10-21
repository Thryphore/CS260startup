/**
 * Hard-coded fractal gear recommendations inspired by the Discretize cheat sheet:
 * https://archive.discretize.eu/guides/cheat-sheet/
 *
 * This will be replaced with database + live GW2 API calls later.
 */

export const PROFESSIONS = [
  'Guardian',
  'Revenant',
  'Warrior',
  'Engineer',
  'Ranger',
  'Thief',
  'Elementalist',
  'Mesmer',
  'Necromancer',
];

export const ROLES = ['DPS', 'Healer', 'Support / Quickness', 'Support / Alacrity', 'Tank'];

/** Power-build defaults used when a fight has no special overrides. */
const POWER_DEFAULT = {
  dayNight: 'Day',
  sigils: ['Superior Sigil of Force', 'Superior Sigil of Impact'],
  potion: 'Appropriate slaying potion for the fractal',
  relic: 'Relic of the Fractal',
  notes: 'Standard power fractal setup. Condition builds should follow class build pages.',
};

/**
 * Per-fractal recommendations (power average group), based on Discretize notes.
 * Keys match option values in the Gear fight select.
 */
export const FRACTAL_GEAR = {
  'General Fractals': {
    ...POWER_DEFAULT,
    potion: 'Match the daily fractal slaying potion',
    notes: 'Use Force + Impact for day fractals; swap Impact for Night on night fractals.',
  },
  'Lonely Tower': {
    dayNight: 'Day',
    sigils: ['Superior Sigil of Force', 'Superior Sigil of Impact'],
    potion: 'Kryptis Slaying (Eparch / adds); alternate for Deimos / Cerus',
    relic: 'Relic of the Fractal',
    notes:
      'Both Kryptis potions and matching slaying only work on Eparch and Kryptis adds. For Deimos and Cerus use the alternate utility that hits those targets.',
  },
  'Silent Surf': {
    dayNight: 'Day',
    sigils: ['Superior Sigil of Force', 'Superior Sigil of Impact'],
    potion: 'None required',
    relic: 'Relic of the Fractal',
    notes: 'No special slaying potion. Standard Force + Impact for power.',
  },
  'Sunqua Peak': {
    dayNight: 'Day (T4) / Night (CM)',
    sigils: ['Superior Sigil of Force', 'Superior Sigil of Impact (T4) or Night (CM)'],
    potion: 'Jade Brotherhood Slaying',
    relic: 'Relic of the Fractal',
    notes: 'On normal mode keep Impact. On CM, swap Impact for Superior Sigil of the Night.',
  },
  'Nightmare — Ensolyss': {
    dayNight: 'Day',
    sigils: ['Superior Sigil of Force', 'Superior Sigil of Impact'],
    potion: "Potion of Slaying Scarlet's Armies",
    relic: 'Relic of the Fractal',
    notes:
      'Right after MAMA swap to the Siax/Ensolyss-optimal sigil setup. Assassin breaks even with Impact at roughly 20% uptime.',
  },
  'Shattered Observatory — Arkk': {
    dayNight: 'Day',
    sigils: ['Superior Sigil of Force', 'Superior Sigil of Impact'],
    potion: "Potion of Slaying Scarlet's Armies",
    relic: 'Relic of the Fractal',
    notes:
      'When at Arkk, swap as needed. Although the fractal switches to night after Skorvald, Sigil of the Night does not work!',
  },
  'Silent Surf — Kanaxai': {
    dayNight: 'Day',
    sigils: ['Superior Sigil of Force', 'Superior Sigil of Impact'],
    potion: 'None required',
    relic: 'Relic of the Fractal',
    notes: 'Standard day power sigils. Ranged DPS is strongly preferred on Kanaxai.',
  },
  'Lonely Tower — Dagda': {
    dayNight: 'Day',
    sigils: ['Superior Sigil of Force', 'Superior Sigil of Impact'],
    potion: 'Kryptis Slaying where applicable',
    relic: 'Relic of the Fractal',
    notes: 'Follow Lonely Tower notes: slaying only on Kryptis targets; swap for other bosses.',
  },
  'Captain Mai Trin Boss': {
    dayNight: 'Day',
    sigils: ['Superior Sigil of Force', 'Superior Sigil of Impact'],
    potion: "Potion of Slaying Scarlet's Armies",
    relic: 'Relic of the Fractal',
    notes: 'Use a Mistlock Singularity to prestack at the mistlock and port right to the boss.',
  },
  'Molten Boss': {
    dayNight: 'Day',
    sigils: ['Superior Sigil of Force', 'Superior Sigil of Impact'],
    potion: "Potion of Slaying Scarlet's Armies",
    relic: 'Relic of the Fractal',
    notes: 'Scarlet\'s Armies works on all mobs here. No mid-run swaps required.',
  },
  Volcanic: {
    dayNight: 'Night',
    sigils: ['Superior Sigil of Force', 'Superior Sigil of the Night'],
    potion: 'Grawl Slaying → Demon Slaying on endboss',
    relic: 'Relic of the Fractal',
    notes: 'For the endboss swap to Demon Slaying and matching sigils.',
  },
  Uncategorized: {
    dayNight: 'Day',
    sigils: ['Superior Sigil of Force', 'Superior Sigil of Impact'],
    potion: 'Inquest Slaying',
    relic: 'Relic of the Fractal',
    notes: 'Swap your sigil once you reach Old Tom (Inquest-focused setup).',
  },
  Snowblind: {
    dayNight: 'Night',
    sigils: ['Superior Sigil of Force', 'Superior Sigil of the Night'],
    potion: 'Elemental Slaying → Svanir Slaying on final boss',
    relic: 'Relic of the Fractal',
    notes: 'Elemental until the last boss; Svanir Slaying for the final boss.',
  },
  Aetherblade: {
    dayNight: 'Day',
    sigils: ['Superior Sigil of Force', 'Superior Sigil of Impact'],
    potion: "Scarlet's Armies → Inquest for endboss golems",
    relic: 'Relic of the Fractal',
    notes: 'Swap to Inquest potion and matching sigils for the endboss room (not Frizz).',
  },
  Cliffside: {
    dayNight: 'Day',
    sigils: ['Superior Sigil of Force', 'Superior Sigil of Impact'],
    potion: 'Outlaw Slaying',
    relic: 'Relic of the Fractal',
    notes: 'Outlaw Slaying works on all mobs. No special swap.',
  },
  Swampland: {
    dayNight: 'Night',
    sigils: ['Superior Sigil of Force', 'Superior Sigil of the Night'],
    potion: 'None',
    relic: 'Relic of the Fractal',
    notes: 'No pots or slaying sigils work here.',
  },
  'Twilight Oasis': {
    dayNight: 'Night',
    sigils: ['Superior Sigil of Force', 'Superior Sigil of the Night'],
    potion: 'None',
    relic: 'Relic of the Fractal',
    notes: 'No special slaying potion for average power groups.',
  },
  'Urban Battlegrounds': {
    dayNight: 'Day',
    sigils: ['Superior Sigil of Force', 'Superior Sigil of Impact'],
    potion: 'None',
    relic: 'Relic of the Fractal',
    notes: 'No pots or slaying sigils work here.',
  },
  'Thaumanova Reactor': {
    dayNight: 'Day',
    sigils: ['Superior Sigil of Force', 'Superior Sigil of Impact'],
    potion: 'None',
    relic: 'Relic of the Fractal',
    notes: 'No pots or slaying sigils work here.',
  },
  Deepstone: {
    dayNight: 'Day',
    sigils: ['Superior Sigil of Force', 'Superior Sigil of Impact'],
    potion: 'None required',
    relic: 'Relic of the Fractal',
    notes: 'Standard day power setup.',
  },
  'Molten Furnace': {
    dayNight: 'Day',
    sigils: ['Superior Sigil of Force', 'Superior Sigil of Impact'],
    potion: "Potion of Slaying Scarlet's Armies",
    relic: 'Relic of the Fractal',
    notes: "Apart from the initial rooms, Scarlet's Armies works on the rest.",
  },
  'Underground Facility': {
    dayNight: 'Night',
    sigils: ['Superior Sigil of Force', 'Superior Sigil of the Night'],
    potion: 'Dredge Slaying (Elemental if Ice Elemental endboss)',
    relic: 'Relic of the Fractal',
    notes: 'Use Elemental Slaying and matching sigils if the final boss is the Ice Elemental.',
  },
  'Solid Ocean': {
    dayNight: 'Night',
    sigils: ['Superior Sigil of Force', 'Superior Sigil of the Night'],
    potion: 'None',
    relic: 'Relic of the Fractal',
    notes: 'Night fractal; no dedicated slaying potion.',
  },
  "Siren's Reef": {
    dayNight: 'Day',
    sigils: ['Superior Sigil of Force', 'Superior Sigil of Impact'],
    potion: 'None required',
    relic: 'Relic of the Fractal',
    notes: 'Standard day power setup.',
  },
  'Aquatic Ruins': {
    dayNight: 'Day',
    sigils: ['Superior Sigil of Force', 'Superior Sigil of Impact'],
    potion: "Potion of Slaying Scarlet's Armies",
    relic: 'Relic of the Fractal',
    notes:
      "Slaying does not work against the main boss. It works on split phases, adds, and the krait on the way to the arena.",
  },
  'Chaos Isles': {
    dayNight: 'Day',
    sigils: ['Superior Sigil of Force', 'Superior Sigil of Impact'],
    potion: 'None',
    relic: 'Relic of the Fractal',
    notes: 'No pots or slaying sigils work here.',
  },
  Kinfall: {
    dayNight: 'Day',
    sigils: ['Superior Sigil of Force', 'Superior Sigil of Impact'],
    potion: 'Can be stacked during the pre-event',
    relic: 'Relic of the Fractal',
    notes: 'Stack potions during the pre-event for a smoother clear.',
  },
};

/** Simple raid defaults so the fight dropdown still returns useful rows. */
export const RAID_GEAR = {
  default: {
    dayNight: 'N/A',
    sigils: ['Superior Sigil of Force', 'Superior Sigil of Accuracy / Impact'],
    potion: 'Food + utility per build',
    relic: 'Encounter-specific relic',
    notes: 'Raid gear varies by profession — use your build page. Fractal-specific tips live under Fractals.',
  },
};

export function getGearRecommendation(fight, role) {
  const fractal = FRACTAL_GEAR[fight];
  if (fractal) {
    return {
      fight,
      role,
      ...fractal,
      slots: [
        { slot: 'Sigil 1', item: fractal.sigils[0], why: `${fractal.dayNight} fractal power default` },
        { slot: 'Sigil 2', item: fractal.sigils[1] || fractal.sigils[0], why: fractal.notes },
        { slot: 'Potion', item: fractal.potion, why: 'Discretize cheat-sheet slaying recommendation' },
        { slot: 'Relic', item: fractal.relic, why: role === 'DPS' ? 'General fractal DPS relic' : 'Support-friendly fractal relic' },
      ],
    };
  }

  const raid = RAID_GEAR.default;
  return {
    fight,
    role,
    ...raid,
    slots: [
      { slot: 'Sigil 1', item: raid.sigils[0], why: 'Power raid baseline' },
      { slot: 'Sigil 2', item: raid.sigils[1], why: 'Swap for condition or specialty builds' },
      { slot: 'Potion', item: raid.potion, why: 'Follow profession build food/utility' },
      { slot: 'Relic', item: raid.relic, why: 'Pick the relic listed on your build page for this fight' },
    ],
  };
}
