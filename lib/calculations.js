import { MIX, LIGHTWEIGHT } from './constants.js';

export function formatDefoamer(grams) {
  if (grams < 1) {
    return `${(grams * 1000).toFixed(0)}mg (${grams.toFixed(3)}g)`;
  }
  return `${grams.toFixed(3)}g`;
}

export function calculateScratchMix({
  totalAmount,
  useCSA = false,
  useX33 = true,
  cementType = 'grey',
  useSand = true,
  pigmentPercent = 0,
  pigmentKey = null,
}) {
  const totalParts = useSand ? 2 : 1;

  let portlandCement, csaCement;
  if (useCSA) {
    const totalCement = totalAmount * (1 / totalParts);
    portlandCement = totalCement * MIX.CSA_PORTLAND_FRACTION;
    csaCement = totalCement * MIX.CSA_FRACTION;
  } else {
    portlandCement = totalAmount * (1 / totalParts);
    csaCement = 0;
  }

  const fineSand = useSand ? totalAmount * (1 / totalParts) : 0;
  const totalCementWeight = portlandCement + csaCement;
  const water = totalCementWeight * MIX.WATER_CEMENT_RATIO;
  const plasticizer = totalCementWeight * MIX.PLASTICIZER_PERCENT;
  const x33Amount = useX33 ? totalCementWeight * MIX.X33_DOSAGE_PERCENT : 0;
  const pigmentWeight = totalCementWeight * (pigmentPercent / 100);

  return {
    totalAmount,
    portlandCement,
    fineSand,
    csaCement,
    water,
    plasticizer,
    useCSA,
    totalCementWeight,
    useX33,
    x33Amount,
    cementType,
    useSand,
    pigmentPercent,
    pigmentWeight,
    pigmentKey,
  };
}

export function calculateLightweightMix({
  cementWeight,
  useCSA = false,
  useX33 = true,
  useFibers = true,
  cementType = 'grey',
  pigmentPercent = 0,
  pigmentKey = null,
}) {
  let portlandCement, csaCement;
  if (useCSA) {
    portlandCement = cementWeight * LIGHTWEIGHT.CSA_PORTLAND_FRACTION;
    csaCement = cementWeight * LIGHTWEIGHT.CSA_FRACTION;
  } else {
    portlandCement = cementWeight;
    csaCement = 0;
  }

  const totalCementWeight = portlandCement + csaCement;

  // Perlite volume in liters: convert cement grams → liters, then apply volume ratio
  const cementVolumeL = totalCementWeight / LIGHTWEIGHT.CEMENT_BULK_DENSITY_G_PER_L;
  const perliteVolumeL = cementVolumeL * LIGHTWEIGHT.PERLITE_CEMENT_VOLUME_RATIO;

  const water = totalCementWeight * LIGHTWEIGHT.WATER_CEMENT_RATIO;
  const plasticizer = totalCementWeight * LIGHTWEIGHT.PLASTICIZER_PERCENT;
  const x33Amount = useX33 ? totalCementWeight * LIGHTWEIGHT.X33_DOSAGE_PERCENT : 0;
  const fiberWeight = useFibers ? totalCementWeight * LIGHTWEIGHT.FIBER_PERCENT : 0;
  const pigmentWeight = totalCementWeight * (pigmentPercent / 100);

  return {
    cementWeight,
    portlandCement,
    csaCement,
    totalCementWeight,
    perliteVolumeL,
    water,
    plasticizer,
    useCSA,
    useX33,
    x33Amount,
    useFibers,
    fiberWeight,
    cementType,
    pigmentPercent,
    pigmentWeight,
    pigmentKey,
  };
}
