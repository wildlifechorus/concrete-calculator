import { formatDefoamer } from './calculations.js';
import { PIGMENTS } from './data.js';
import { RUBBER, UNITS } from './constants.js';

export function displayScratchResults(results) {
  const cementLabel = results.cementType === 'white' ? 'White Portland' : 'Portland';

  console.log('\n✅ Results (From Scratch Mix)');
  console.log(`Dry mix total: ${results.totalAmount.toFixed(0)}g`);
  console.log(`${cementLabel}: ${results.portlandCement.toFixed(1)}g`);

  if (results.useCSA) {
    console.log(`CSA: ${results.csaCement.toFixed(1)}g`);
  }

  if (results.useSand) {
    console.log(`Sand: ${results.fineSand.toFixed(1)}g`);
  } else {
    console.log('Sand: none (cement-only paste)');
  }

  if (results.fiberWeight > 0) {
    console.log(`AR glass fibers: ${results.fiberWeight.toFixed(1)}g`);
  }

  if (results.pigmentWeight > 0) {
    const pigmentLabel = results.pigmentKey ? (PIGMENTS[results.pigmentKey]?.label ?? '') : '';
    const colorNote = results.cementType === 'grey' ? ' — earthy/muted tones on grey base' : '';
    const productSuffix = pigmentLabel ? ` (${pigmentLabel})` : '';
    console.log(
      `Pigment${productSuffix}: ${results.pigmentWeight.toFixed(1)}g (${results.pigmentPercent}% of cement)${colorNote}`
    );
  }

  console.log(`Water: ${results.water.toFixed(1)}ml`);
  console.log(`Level+ Plasticizer: ${results.plasticizer.toFixed(1)}ml`);

  if (results.useX33) {
    console.log(`X33 Defoamer: ${formatDefoamer(results.x33Amount)} — weigh on a mg scale`);
  }

  console.log('\n📋 Mixing Order:');
  let step = 1;

  if (results.useCSA) {
    console.log(`  ${step++}. Combine ${cementLabel} + CSA cement in vessel`);
  } else {
    console.log(`  ${step++}. Weigh ${cementLabel} into vessel`);
  }

  if (results.pigmentWeight > 0) {
    console.log(`  ${step++}. Add pigment — mix dry until color is uniform`);
  }

  if (results.useSand) {
    console.log(`  ${step++}. Add fine sand — stir to combine`);
  }

  if (results.fiberWeight > 0) {
    console.log(`  ${step++}. Add AR glass fibers — toss through dry mix to distribute evenly`);
  }

  if (results.useX33) {
    console.log(`  ${step++}. Add X33 powder — mix dry for 30 seconds until evenly distributed`);
  }

  console.log(`  ${step++}. Mix plasticizer into water in a separate cup`);
  console.log(`  ${step++}. Add water+plasticizer to dry mix gradually`);
  console.log(`  ${step}. Mix thoroughly for 2–3 minutes`);

  if (results.useX33) {
    console.log('  ⚠️  Do not exceed X33 dosage — overdosing weakens surface quality');
  }

  const ratioNote = results.useSand ? '1:1 ratio' : 'Cement only';
  const csaNote = results.useCSA ? ' | CSA blend: ~1hr demold' : '';
  const whiteCsaNote =
    results.cementType === 'white' && results.useCSA
      ? ' | ⚠️  Grey CSA will visibly shift the white color'
      : '';
  const experimentalNote = !results.useSand ? ' | ⚠️  Higher shrinkage — experimental' : '';
  const fiberNote = results.fiberWeight > 0 ? ' | AR fibers: crack resistance' : '';
  console.log(`\n📝 ${ratioNote} | W/C: 0.44${csaNote}${whiteCsaNote}${experimentalNote}${fiberNote}`);

  console.log('\n⏱️  Curing Times:');
  if (results.useCSA) {
    console.log('  Initial set:    ~15–25 minutes — work quickly once mixed');
    console.log('  Hard / demold:  ~1 hour');
    console.log('  80% strength:   ~24 hours');
    console.log('  Full cure:      28 days');
  } else {
    console.log('  Initial set:    ~1–3 hours (touch dry)');
    console.log('  Hard / demold:  ~24 hours');
    console.log('  Full cure:      28 days');
  }

  if (!results.useSand) {
    console.log(
      '  ⚠️  Cement-only paste: keep moist for first 3–7 days to reduce shrinkage cracking'
    );
  }
}

/**
 * Display the rubber mold calculation results.
 * @param {ReturnType<import('./calculations.js').calculateRubberMold>} results
 */
export function displayRubberMoldResults(results) {
  const typeLabel = RUBBER.TYPES[results.rubberType] ?? results.rubberType;
  const boxMl = results.boxVolumeMm3 / UNITS.MM3_PER_ML;
  const boxL = results.boxVolumeMm3 / UNITS.MM3_PER_L;
  const cavityMl = results.cavityVolumeMm3 / UNITS.MM3_PER_ML;
  const objectsMl = results.totalObjectVolumeMm3 / UNITS.MM3_PER_ML;

  console.log(`\n✅ Results (${typeLabel})`);
  console.log(`Box volume:         ${boxMl.toFixed(1)} ml  (${boxL.toFixed(3)} L)`);

  if (results.objects.length > 0) {
    results.objects.forEach(({ volumeMm3, quantity }, i) => {
      const label =
        quantity > 1 ? `${quantity} × ${volumeMm3} mm³` : `${volumeMm3} mm³`;
      console.log(`Object ${i + 1}:           ${label}`);
    });
    console.log(`Total objects:      ${objectsMl.toFixed(1)} ml subtracted`);
    console.log(`Cavity volume:      ${cavityMl.toFixed(1)} ml`);
  }

  console.log(`Waste tolerance:    ${results.wastePercent}%`);
  console.log('─'.repeat(45));
  console.log(
    `Rubber to mix:      ${results.rubberMl.toFixed(1)} ml  (${results.rubberL.toFixed(3)} L)`,
  );
  console.log('─'.repeat(45));
  console.log(
    '\n📋 Notes:\n' +
      '  • If using a two-part system, A+B parts must sum to the above volume.\n' +
      '  • Round up when buying kit sizes — err on the side of more.\n' +
      '  • Degassing silicone under vacuum removes air bubbles before pouring.',
  );
}

