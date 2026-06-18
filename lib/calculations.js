import { MIX, RUBBER, UNITS } from './constants.js';

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
  useFibers = false,
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
  const fiberWeight = useFibers ? totalCementWeight * MIX.FIBER_PERCENT : 0;
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
    useFibers,
    fiberWeight,
    cementType,
    useSand,
    pigmentPercent,
    pigmentWeight,
    pigmentKey,
  };
}

/**
 * Calculate the volume of rubber needed for a block mold.
 *
 * Formula: rubber = (boxVolume - totalObjectVolume) × (1 + wastePercent / 100)
 *
 * @param {{
 *   rubberType: string,
 *   boxVolumeMm3: number,
 *   objects: Array<{ volumeMm3: number, quantity: number }>,
 *   wastePercent: number,
 * }} params
 * @returns {{
 *   rubberType: string,
 *   boxVolumeMm3: number,
 *   totalObjectVolumeMm3: number,
 *   cavityVolumeMm3: number,
 *   wastePercent: number,
 *   rubberVolumeMm3: number,
 *   rubberMl: number,
 *   rubberL: number,
 *   objects: Array<{ volumeMm3: number, quantity: number }>,
 * }}
 * @throws {Error} if boxVolumeMm3 <= 0 or total object volume >= box volume.
 */
export function calculateRubberMold({
  rubberType,
  boxVolumeMm3,
  objects = [],
  wastePercent = RUBBER.DEFAULT_WASTE_PERCENT,
}) {
  if (!boxVolumeMm3 || boxVolumeMm3 <= 0) {
    throw new Error('Box volume must be greater than zero.');
  }

  const totalObjectVolumeMm3 = objects.reduce((sum, { volumeMm3, quantity }) => {
    return sum + volumeMm3 * quantity;
  }, 0);

  if (totalObjectVolumeMm3 >= boxVolumeMm3) {
    throw new Error(
      'Total object volume equals or exceeds the box volume — objects do not fit.',
    );
  }

  const cavityVolumeMm3 = boxVolumeMm3 - totalObjectVolumeMm3;
  const rubberVolumeMm3 = cavityVolumeMm3 * (1 + wastePercent / 100);
  const rubberMl = rubberVolumeMm3 / UNITS.MM3_PER_ML;
  const rubberL = rubberVolumeMm3 / UNITS.MM3_PER_L;

  return {
    rubberType,
    boxVolumeMm3,
    totalObjectVolumeMm3,
    cavityVolumeMm3,
    wastePercent,
    rubberVolumeMm3,
    rubberMl,
    rubberL,
    objects,
  };
}
