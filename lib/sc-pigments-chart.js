/**
 * SC Pigments® (Serra Ciments) — complete colour chart reference.
 *
 * Source : https://www.serraciments.com/en/colour-chart/
 * Captured : 2026-05-29
 * Method  : scraped inline `bg-color` / `background-color` CSS values directly
 *           from the page HTML (no image processing needed — the site embeds
 *           the designed hex values in the DOM).
 *
 * Swatch layout per pigment:
 *   All four swatches are on WHITE Portland cement at the dosage shown.
 *   (The grey-cement tab requires a JavaScript interaction to load and
 *   was not captured here.)
 *
 * Dosage key:
 *   dose_2  → 2 % of cement weight
 *   dose_3  → 3 % of cement weight
 *   dose_4  → 4 % of cement weight
 *   dose_5  → 5 % of cement weight
 *
 * Starred pigments (*) are currently used in the simulator (lib/data.js).
 * Their tinting-strength factors were calibrated from these swatches via
 * Kubelka–Munk fitting.
 */

export const SC_PIGMENTS_CHART = {
  // ─── Yellows (Amarillos) ─────────────────────────────────────────────────
  amarillos: {
    label: 'Yellows / Amarillos',
    pigments: [
      {
        code: 'BT2',
        name: 'Amarillo BT-2',
        description: 'Soft cream-yellow iron oxide; bright on white cement.',
        swatches: { dose_2: '#fff7d5', dose_3: '#fff2bf', dose_4: '#f4e8bc', dose_5: '#f8ecbf' },
      },
      {
        code: '13',
        name: 'Amarillo 13',
        description: 'Bright mid-yellow iron oxide.',
        swatches: { dose_2: '#ffe8a1', dose_3: '#ffe388', dose_4: '#f7dd86', dose_5: '#fae097' },
      },
      {
        code: '170',
        name: 'Amarillo 170',
        description: 'Yellow ochre iron oxide.',
        swatches: { dose_2: '#ffe4a4', dose_3: '#ffda8a', dose_4: '#f2cf83', dose_5: '#f5d587' },
      },
      {
        code: '177',
        name: 'Amarillo 177',
        description: 'Warm creamy yellow iron oxide.',
        swatches: { dose_2: '#fddea1', dose_3: '#fed484', dose_4: '#f5cb83', dose_5: '#f6d281' },
      },
      {
        code: '180',
        name: 'Amarillo 180',
        description: 'Golden-yellow ochre iron oxide.',
        swatches: { dose_2: '#f7d78e', dose_3: '#f7d077', dose_4: '#efc873', dose_5: '#eecd76' },
      },
    ],
  },

  // ─── Oranges (Naranjas) ──────────────────────────────────────────────────
  naranjas: {
    label: 'Oranges / Naranjas',
    pigments: [
      {
        code: '230',
        name: 'Naranja 230',
        description: 'Light peach-orange iron oxide.',
        swatches: { dose_2: '#fccc98', dose_3: '#fbbd7b', dose_4: '#e6b27b', dose_5: '#ebaa69' },
      },
      {
        code: '260',
        name: 'Naranja 260',
        description: 'Medium warm orange iron oxide.',
        swatches: { dose_2: '#fbbd90', dose_3: '#f6ab78', dose_4: '#e39957', dose_5: '#ec9952' },
      },
      {
        code: '280',
        name: 'Naranja 280',
        description: 'Deep salmon-orange iron oxide.',
        swatches: { dose_2: '#febe99', dose_3: '#f0996e', dose_4: '#e29568', dose_5: '#f0996e' },
      },
    ],
  },

  // ─── Reds (Rojos) ────────────────────────────────────────────────────────
  rojos: {
    label: 'Reds / Rojos',
    pigments: [
      {
        code: 'N77',
        name: 'Rojo N77',
        description: 'Muted rose-red iron oxide.',
        swatches: { dose_2: '#dfa49c', dose_3: '#e3907f', dose_4: '#d68d7f', dose_5: '#e29181' },
      },
      {
        code: '340',
        name: 'Rojo 340',
        description: 'Mid terracotta-red iron oxide.',
        swatches: { dose_2: '#d78579', dose_3: '#cc6661', dose_4: '#b56157', dose_5: '#b75852' },
      },
      {
        code: '3130',
        name: 'Rojo 3130',
        description: 'Vivid warm red iron oxide.',
        swatches: { dose_2: '#f17f70', dose_3: '#e1604e', dose_4: '#d15d51', dose_5: '#ce543e' },
      },
      {
        code: '353',
        name: 'Rojo 353',
        description: 'Cool crimson-red iron oxide.',
        swatches: { dose_2: '#d95e65', dose_3: '#cc4d55', dose_4: '#ca575c', dose_5: '#c85054' },
      },
      {
        code: '390',
        name: 'Rojo 390',
        description: 'Dusty rose-pink iron oxide.',
        swatches: { dose_2: '#e8b0b4', dose_3: '#e2999f', dose_4: '#c06f74', dose_5: '#c85054' },
      },
    ],
  },

  // ─── Browns (Pardos) ─────────────────────────────────────────────────────
  pardos: {
    label: 'Browns / Pardos',
    pigments: [
      {
        code: 'F-24',
        name: 'Pardo F-24',
        description: 'Very pale cream iron oxide; subtle warm tint.',
        swatches: { dose_2: '#f3ecd1', dose_3: '#ebe0c1', dose_4: '#e1d3b0', dose_5: '#dacca9' },
      },
      {
        code: '40',
        name: 'Pardo 40',
        description: 'Warm buff-tan iron oxide.',
        swatches: { dose_2: '#e9c799', dose_3: '#d9b587', dose_4: '#c9a878', dose_5: '#caa573' },
      },
      {
        code: '45',
        name: 'Pardo 45',
        description: 'Golden tan iron oxide.',
        swatches: { dose_2: '#e5cf9f', dose_3: '#cdb174', dose_4: '#c0a66e', dose_5: '#bea267' },
      },
      {
        code: '411',
        name: 'Pardo 411',
        description: 'Medium sandy-brown iron oxide.',
        swatches: { dose_2: '#f6cc9d', dose_3: '#f2c090', dose_4: '#d6a273', dose_5: '#d6aa7f' },
      },
      {
        code: '440',
        name: 'Pardo 440',
        description: 'Warm mid-brown iron oxide.',
        swatches: { dose_2: '#cda375', dose_3: '#be9467', dose_4: '#9b7854', dose_5: '#9b7550' },
      },
      {
        code: '4610',
        name: 'Pardo 4610',
        description: 'Warm reddish-brown iron oxide.',
        swatches: { dose_2: '#d2a482', dose_3: '#b78b6a', dose_4: '#9a7356', dose_5: '#9f7454' },
      },
      {
        code: '4640',
        name: 'Pardo 4640',
        description: 'Cool grey-brown iron oxide.',
        swatches: { dose_2: '#a59483', dose_3: '#86715f', dose_4: '#745e4a', dose_5: '#614e40' },
      },
      {
        // ★ Currently used in the simulator (lib/data.js key: "brown")
        // Tinting strength calibrated: 1.13×
        code: '4660',
        name: 'Pardo 4660',
        inSimulator: true,
        simulatorKey: 'brown',
        description:
          'Dark warm brown (leather tone) iron oxide. Currently used in simulator as "brown".',
        swatches: { dose_2: '#ac8276', dose_3: '#a97a69', dose_4: '#a4796c', dose_5: '#94685b' },
      },
      {
        code: '4663',
        name: 'Pardo 4663',
        description: 'Deep cool-brown iron oxide; slightly darker than 4660.',
        swatches: { dose_2: '#a88977', dose_3: '#876a59', dose_4: '#7c6556', dose_5: '#6b5145' },
      },
    ],
  },

  // ─── Blacks (Negros) ─────────────────────────────────────────────────────
  negros: {
    label: 'Blacks / Negros',
    pigments: [
      {
        code: '51',
        name: 'Negro 51',
        description: 'Blue-grey black iron oxide; lightens to warm grey on white cement.',
        swatches: { dose_2: '#b0b5b9', dose_3: '#9aa1a7', dose_4: '#94999d', dose_5: '#828689' },
      },
      {
        code: '53',
        name: 'Negro 53',
        description: 'Neutral grey-black iron oxide.',
        swatches: { dose_2: '#b4b6b5', dose_3: '#a0a2a1', dose_4: '#8a8c8b', dose_5: '#747673' },
      },
      {
        // ★ Currently used in the simulator (lib/data.js key: "black")
        // Tinting strength calibrated: 1.52×
        code: '55',
        name: 'Negro 55',
        inSimulator: true,
        simulatorKey: 'black',
        description:
          'Deep neutral black iron oxide. Currently used in simulator as "black". ' +
          'Note: site shows dose_4 as #6a6a6a which is lighter than dose_3 — ' +
          'likely a page artefact; treat dose_4 data with caution.',
        swatches: { dose_2: '#70706e', dose_3: '#5c5c5a', dose_4: '#6a6a6a', dose_5: '#4a4a48' },
      },
      {
        code: '5990',
        name: 'Negro 5990',
        description: 'Very deep black iron oxide; reaches near-pure black at 5 %.',
        swatches: { dose_2: '#343434', dose_3: '#131313', dose_4: '#282828', dose_5: '#000000' },
      },
    ],
  },

  // ─── White (Blanco) ──────────────────────────────────────────────────────
  blancos: {
    label: 'White / Blanco',
    pigments: [
      {
        code: '00',
        name: 'Blanco 00',
        description: 'Titanium dioxide white. Brightens white cement or lightens grey cement.',
        swatches: { dose_2: '#fefefe', dose_3: '#ffffff', dose_4: '#f4f4f4', dose_5: '#f6f6f6' },
      },
    ],
  },

  // ─── Greens (Verdes) ─────────────────────────────────────────────────────
  verdes: {
    label: 'Greens / Verdes',
    pigments: [
      {
        code: '60',
        name: 'Verde 60',
        description: 'Chromium oxide green; bright sage-green on white cement.',
        swatches: { dose_2: '#badfb3', dose_3: '#a6d69e', dose_4: '#9fcf99', dose_5: '#9cc793' },
      },
    ],
  },

  // ─── Blues (Azules) ──────────────────────────────────────────────────────
  azules: {
    label: 'Blues / Azules',
    pigments: [
      {
        code: 'HWR',
        name: 'Azul HWR',
        description: 'Ultramarine blue; periwinkle-lavender on white cement.',
        swatches: { dose_2: '#b6cbe9', dose_3: '#7b95cc', dose_4: '#596eb4', dose_5: '#3d4fa0' },
      },
      {
        code: '750-C',
        name: 'Azul 750-C',
        description: 'Cobalt aluminate blue (coarser grade); sky-blue hue on white cement.',
        swatches: { dose_2: '#81ccec', dose_3: '#28b3e4', dose_4: '#72bcd7', dose_5: '#00a2c7' },
      },
      {
        code: '750-E',
        name: 'Azul 750-E',
        description: 'Cobalt aluminate blue (finer grade); deeper blue than 750-C.',
        swatches: { dose_2: '#76b9e3', dose_3: '#008ac9', dose_4: '#3487b5', dose_5: '#0072af' },
      },
    ],
  },
};

/**
 * Flat list of all SC Pigments products for easy iteration/lookup by code.
 *
 * @returns {{ code, family, name, description, inSimulator, simulatorKey, swatches }[]}
 */
export function getAllSCPigments() {
  return Object.entries(SC_PIGMENTS_CHART).flatMap(([familyKey, family]) =>
    family.pigments.map((p) => ({
      familyKey,
      familyLabel: family.label,
      code: p.code,
      name: p.name,
      description: p.description,
      inSimulator: p.inSimulator ?? false,
      simulatorKey: p.simulatorKey ?? null,
      swatches: p.swatches,
    }))
  );
}
