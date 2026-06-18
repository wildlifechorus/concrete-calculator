/** Volume conversion constants. */
export const UNITS = {
  MM3_PER_ML: 1000,
  MM3_PER_L: 1_000_000,
};

/**
 * Rubber mold defaults.
 * TYPES is used for display labels only — volume is material-independent.
 */
export const RUBBER = {
  DEFAULT_WASTE_PERCENT: 10,
  TYPES: {
    silicone: 'Silicone rubber',
    polyurethane: 'Polyurethane rubber',
  },
};

export const MIX = {
  // Empirically calibrated (2026-06-15):
  //   Piece: 215,544 mm³ mold → 723 g fully cured → empirical constant 0.003008 g/mm³
  // Use the safety tolerance prompt (10-15%) for waste and spillage headroom.
  CONCRETE_DENSITY_G_PER_MM3: 0.003,
  PLASTICIZER_PERCENT: 0.0075,
  WATER_CEMENT_RATIO: 0.44,
  CSA_PORTLAND_FRACTION: 0.50,
  CSA_FRACTION: 0.50,
  X33_DOSAGE_PERCENT: 0.0005,
  PIGMENT_MIN_PCT: 1,
  PIGMENT_MAX_PCT: 10,
  // AR glass fibers: 3% of cement weight — prevents cracking in large pieces
  FIBER_PERCENT: 0.03,
};
