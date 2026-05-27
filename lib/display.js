import { formatDefoamer } from './calculations.js';
import { PIGMENTS } from './data.js';
import { LIGHTWEIGHT } from './constants.js';

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
  console.log(`\n📝 ${ratioNote} | W/C: 0.44${csaNote}${whiteCsaNote}${experimentalNote}`);

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

export function displayLightweightResults(results) {
  const cementLabel = results.cementType === 'white' ? 'White Portland' : 'Portland';

  console.log('\n✅ Results (Lightweight Perlite Mix)');
  console.log(`Cement input: ${results.cementWeight.toFixed(0)}g`);
  console.log(`${cementLabel}: ${results.portlandCement.toFixed(1)}g`);

  if (results.useCSA) {
    console.log(`CSA: ${results.csaCement.toFixed(1)}g`);
  }

  console.log(
    `Fine perlite: ${results.perliteVolumeL.toFixed(2)}L  (≈ ${(results.perliteVolumeL * LIGHTWEIGHT.PERLITE_BULK_DENSITY_G_PER_L).toFixed(0)}g by weight)`
  );

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
    console.log(`  ${step++}. Combine ${cementLabel} + CSA cement in mixing vessel`);
  } else {
    console.log(`  ${step++}. Weigh ${cementLabel} into mixing vessel`);
  }

  if (results.pigmentWeight > 0) {
    console.log(`  ${step++}. Add pigment — mix dry until color is uniform`);
  }

  if (results.fiberWeight > 0) {
    console.log(`  ${step++}. Add AR glass fibers — toss through dry cement to distribute`);
  }

  if (results.useX33) {
    console.log(`  ${step++}. Add X33 powder — mix dry for 30 seconds until evenly distributed`);
  }

  console.log(`  ${step++}. Mix plasticizer into water in a separate cup`);
  console.log(`  ${step++}. Pour water+plasticizer into dry cement — mix into a smooth slurry (2 min)`);
  console.log(`  ${step++}. Add perlite — fold in gently until fully coated`);
  console.log(`  ${step++}. Mix for 2–3 minutes MAX — stop as soon as uniform`);
  console.log(`  ${step++}. Pour into mold and vibrate thoroughly to settle into all detail`);
  console.log(`  ${step}. Do NOT remix or top up — perlite crushes under prolonged agitation`);

  if (results.useX33) {
    console.log('  ⚠️  Do not exceed X33 dosage — overdosing weakens surface quality');
  }

  const csaNote = results.useCSA ? ' | CSA blend: ~1hr demold' : '';
  const whiteCsaNote =
    results.cementType === 'white' && results.useCSA
      ? ' | ⚠️  Grey CSA will visibly shift the white color'
      : '';
  const fiberNote = results.fiberWeight > 0 ? ' | AR fibers: crack resistance' : '';
  console.log(
    `\n📝 1:2 cement:perlite (vol) | W/C: ${LIGHTWEIGHT.WATER_CEMENT_RATIO} | ~57% lighter than standard${csaNote}${whiteCsaNote}${fiberNote}`
  );

  console.log('\n⚠️  Over-mixing warning:');
  console.log('  Perlite particles are fragile — excess mixing crushes them,');
  console.log('  increases density, and reduces the weight benefit. Stop mixing');
  console.log('  as soon as the mix looks uniform.');

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

  console.log('  Keep moist for first 3–7 days — lightweight mixes dry faster');
}
