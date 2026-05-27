export const MIX = {
  CONCRETE_DENSITY_G_PER_MM3: 0.0024,
  PLASTICIZER_PERCENT: 0.0075,
  WATER_CEMENT_RATIO: 0.44,
  CSA_PORTLAND_FRACTION: 0.50,
  CSA_FRACTION: 0.50,
  X33_DOSAGE_PERCENT: 0.0005,
  PIGMENT_MIN_PCT: 1,
  PIGMENT_MAX_PCT: 10,
};

export const LIGHTWEIGHT = {
  // 1 part cement : 2 parts perlite by volume — 57% lighter, ~12.8 MPa
  PERLITE_CEMENT_VOLUME_RATIO: 2,
  // Typical bulk density of fine expanded perlite
  PERLITE_BULK_DENSITY_G_PER_L: 100,
  // Wet density used for mold-volume-based cement weight estimation
  CONCRETE_DENSITY_G_PER_MM3: 0.00104,
  // Lower W/C than standard — no sand, plasticizer compensates
  WATER_CEMENT_RATIO: 0.38,
  PLASTICIZER_PERCENT: 0.0075,
  CSA_PORTLAND_FRACTION: 0.50,
  CSA_FRACTION: 0.50,
  X33_DOSAGE_PERCENT: 0.0005,
  PIGMENT_MIN_PCT: 1,
  PIGMENT_MAX_PCT: 10,
  // AR glass fibers: 3% of cement weight
  FIBER_PERCENT: 0.03,
  // Approximate cement bulk density (g/L) used to convert grams → volume for perlite ratio
  CEMENT_BULK_DENSITY_G_PER_L: 1500,
};
