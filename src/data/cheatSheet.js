/**
 * Full Discretize fractal cheat sheet (power builds, average group).
 * Source: https://archive.discretize.eu/guides/cheat-sheet/ (June 30, 2025)
 *
 * Hard-coded until a live data source exists.
 */

export const CHEAT_SHEET_INTRO =
  "This sheet gives quick access to the most optimal sigils and potions for each fractal in an average group for power builds. Some fractals have small variations where different parts benefit from different potions or specific sigils such as Superior Sigil of the Night or Superior Sigil of Impact. For further information consult the individual Fractal guides and class-specific CM guides. Condition classes should use the sigils and utilities listed on their build pages.";

export const CHEAT_SHEET_ROWS = [
  {
    fractal: 'Lonely Tower',
    dayNight: 'Day',
    sigilPotion:
      'Superior Sigil of Demon Slaying, Superior Sigil of Force, Powerful Potion of Demon Slaying',
    description:
      'Both Superior Sigil of Demon Slaying and Powerful Potion of Demon Slaying will only work on Eparch and Kryptis adds. For Deimos and Cerus use Superior Sharpening Stone.',
  },
  {
    fractal: 'Silent Surf',
    dayNight: 'Day',
    sigilPotion:
      'Superior Sigil of Impact, Superior Sigil of Force, Superior Sharpening Stone',
    description: 'None',
  },
  {
    fractal: 'Sunqua Peak',
    dayNight: 'Day (T4) / Night (CM)',
    sigilPotion:
      'Superior Sigil of the Night, Superior Sigil of Force, Superior Sharpening Stone',
    description:
      'On normal mode swap Superior Sigil of the Night for Superior Sigil of Impact.',
  },
  {
    fractal: 'Shattered Observatory',
    dayNight: 'Day',
    sigilPotion:
      "Superior Sigil of Force, Superior Sigil of Impact, Powerful Potion of Slaying Scarlet's Armies",
    description:
      "When at Arkk swap to Powerful Potion of Slaying Scarlet's Armies. Although the fractal switches to night after Skorvald, Superior Sigil of the Night does not work!",
  },
  {
    fractal: 'Nightmare',
    dayNight: 'Day',
    sigilPotion:
      "Superior Sigil of Force, Superior Sigil of Impact, Powerful Potion of Slaying Scarlet's Armies",
    description:
      'Right after MAMA swap to Superior Sigil of Serpent Slaying. Superior Sigil of Impact breaks even with Superior Sigil of Force at 20% uptime.',
  },
  {
    fractal: 'Kinfall',
    dayNight: 'Day',
    sigilPotion:
      'Superior Sigil of Force, Superior Sigil of Icebrood Slaying, Extended Potion of Sons of Svanir Slaying',
    description: 'Superior Sigil of Bloodlust can be stacked during the pre-event.',
  },
  {
    fractal: 'Chaos Isles',
    dayNight: 'Day',
    sigilPotion:
      'Superior Sigil of Force, Superior Sigil of Impact, Superior Sharpening Stone',
    description: 'None',
  },
  {
    fractal: 'Aetherblade',
    dayNight: 'Day',
    sigilPotion:
      "Superior Sigil of Force, Superior Sigil of Impact, Powerful Potion of Slaying Scarlet's Armies",
    description:
      'Swap to Superior Sigil of Mad Scientists and Powerful Potion of Inquest Slaying for the endboss.',
  },
  {
    fractal: 'Captain Mai Trin',
    dayNight: 'Day',
    sigilPotion:
      "Superior Sigil of Force, Superior Sigil of Impact, Powerful Potion of Slaying Scarlet's Armies",
    description:
      'Use a White Mantle Portal Device to prestack at the mistlock and port right to the boss.',
  },
  {
    fractal: 'Cliffside',
    dayNight: 'Day',
    sigilPotion:
      'Superior Sigil of Force, Superior Sigil of Justice, Extended Potion of Outlaw Slaying',
    description: 'None',
  },
  {
    fractal: 'Snowblind',
    dayNight: 'Night',
    sigilPotion:
      'Superior Sigil of the Night, Superior Sigil of Wrath, Extended Potion of Outlaw Slaying / Elemental as needed',
    description: 'None',
  },
  {
    fractal: 'Volcanic',
    dayNight: 'Night',
    sigilPotion:
      'Superior Sigil of the Night, Superior Sigil of Grawl Slaying, Powerful Potion of Demon Slaying (endboss swap)',
    description:
      'For the endboss swap Superior Sigil of Grawl Slaying to Superior Sigil of Demon Slaying and Powerful Potion of Demon Slaying.',
  },
  {
    fractal: 'Uncategorized',
    dayNight: 'Day',
    sigilPotion:
      'Superior Sigil of Force, Superior Sigil of Impact, Extended Potion of Inquest Slaying',
    description:
      'Swap your Superior Sigil of Force to Superior Sigil of Mad Scientists once you reach Old Tom.',
  },
  {
    fractal: 'Molten Boss',
    dayNight: 'Day',
    sigilPotion:
      "Superior Sigil of Force, Superior Sigil of Impact, Powerful Potion of Slaying Scarlet's Armies",
    description: 'None',
  },
  {
    fractal: 'Swampland',
    dayNight: 'Night',
    sigilPotion:
      'Superior Sigil of the Night, Superior Sigil of Impact, Superior Sharpening Stone',
    description: 'None',
  },
  {
    fractal: 'Twilight Oasis',
    dayNight: 'Night',
    sigilPotion:
      'Superior Sigil of Force, Superior Sigil of the Night, Superior Sharpening Stone',
    description: 'None',
  },
  {
    fractal: 'Urban Battlegrounds',
    dayNight: 'Day',
    sigilPotion:
      'Superior Sigil of Force, Superior Sigil of Impact, Superior Sharpening Stone',
    description: 'None',
  },
  {
    fractal: 'Thaumanova Reactor',
    dayNight: 'Day',
    sigilPotion:
      'Superior Sigil of Force, Superior Sigil of Impact, Superior Sharpening Stone',
    description: 'None',
  },
  {
    fractal: 'Deepstone',
    dayNight: 'Day',
    sigilPotion:
      'Superior Sigil of Force, Superior Sigil of Impact, Superior Sharpening Stone',
    description: 'None',
  },
  {
    fractal: 'Molten Furnace',
    dayNight: 'Day',
    sigilPotion:
      "Superior Sigil of Force, Superior Sigil of Impact, Powerful Potion of Slaying Scarlet's Armies",
    description: 'None',
  },
  {
    fractal: 'Underground Facility',
    dayNight: 'Night',
    sigilPotion:
      'Superior Sigil of the Night, Superior Sigil of Sorrow, Extended Potion of Dredge Slaying',
    description:
      'Superior Sigil of Elemental Slaying and Powerful Potion of Elemental Slaying if the final boss is the Ice Elemental.',
  },
  {
    fractal: 'Solid Ocean',
    dayNight: 'Night',
    sigilPotion:
      'Superior Sigil of the Night, Superior Sigil of Elemental Slaying, Powerful Potion of Elemental Slaying',
    description: 'None',
  },
  {
    fractal: "Siren's Reef",
    dayNight: 'Day',
    sigilPotion:
      'Superior Sigil of Force, Superior Sigil of Impact, Superior Sharpening Stone',
    description: 'None',
  },
  {
    fractal: 'Aquatic Ruins',
    dayNight: 'Day',
    sigilPotion:
      'Superior Sigil of Force, Superior Sigil of Serpent Slaying, Powerful Potion of Demon Slaying',
    description:
      'Superior Sigil of Serpent Slaying does not work against the main boss of this fractal. Instead, it works on the split phases and adds as well as the krait on the way to the main boss arena.',
  },
];
