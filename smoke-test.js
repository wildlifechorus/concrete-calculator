#!/usr/bin/env node

// Smoke tests — covers premixed/scratch/CSA modes, X33 on/off, edge cases.
// Run with: node smoke-test.js

import {
  calculatePremixedConcrete,
  calculateScratchMix,
  formatDefoamer,
} from './index.js';

let passed = 0;
let failed = 0;

function assertClose(label, actual, expected, tolerance = 0.001) {
  const diff = Math.abs(actual - expected);
  if (diff <= tolerance) {
    console.log(`  ✅ ${label}: ${actual.toFixed(4)} ≈ ${expected}`);
    passed++;
  } else {
    console.error(
      `  ❌ ${label}: got ${actual.toFixed(4)}, expected ${expected} (diff ${diff.toFixed(6)})`
    );
    failed++;
  }
}

function assertEqual(label, actual, expected) {
  if (actual === expected) {
    console.log(`  ✅ ${label}: "${actual}"`);
    passed++;
  } else {
    console.error(`  ❌ ${label}: got "${actual}", expected "${expected}"`);
    failed++;
  }
}

function assert(label, condition) {
  if (condition) {
    console.log(`  ✅ ${label}`);
    passed++;
  } else {
    console.error(`  ❌ ${label}`);
    failed++;
  }
}

console.log('\n🧪 Concrete Calculator — Smoke Tests\n');

// formatDefoamer
console.log('── formatDefoamer ──────────────────────────────────────');

assertEqual('sub-1g value shows mg + g', formatDefoamer(0.25), '250mg (0.250g)');
assertEqual('sub-1g rounds mg correctly (0.1g → 100mg)', formatDefoamer(0.1), '100mg (0.100g)');
assertEqual('exactly 1g uses g format', formatDefoamer(1.0), '1.000g');
assertEqual('over 1g uses g format', formatDefoamer(1.5), '1.500g');

// calculatePremixedConcrete — X33 off
console.log('\n── calculatePremixedConcrete (X33 off) ─────────────────');

{
  // README reference: 1000g concrete, 18ml/100g ratio
  const r = calculatePremixedConcrete(1000, 18, false);

  assertClose('baseWaterAmount', r.baseWaterAmount, 180.0);
  assertClose('waterAmount (10% reduction)', r.waterAmount, 162.0);
  assertClose('waterSaved', r.waterSaved, 18.0);
  assertClose('waterReduction %', r.waterReduction, 10.0);
  assertClose('estimatedCement (50% of concrete)', r.estimatedCement, 500.0);
  assertClose('plasticizerAmount', r.plasticizerAmount, 3.75);
  assertEqual('useX33 flag', r.useX33, false);
  assertClose('x33Amount is 0', r.x33Amount, 0.0);
}

// calculatePremixedConcrete — X33 on
console.log('\n── calculatePremixedConcrete (X33 on) ──────────────────');

{
  const r = calculatePremixedConcrete(1000, 18, true);

  assertEqual('useX33 flag', r.useX33, true);
  // X33: 0.05% of estimated cement (500g) = 0.25g
  assertClose('x33Amount (0.05% × 500g cement)', r.x33Amount, 0.25);
  assertClose('waterAmount unchanged', r.waterAmount, 162.0);
  assertClose('plasticizerAmount unchanged', r.plasticizerAmount, 3.75);
}

// calculatePremixedConcrete — small batch (100g)
console.log('\n── calculatePremixedConcrete (100g small batch, X33 on) ');

{
  const r = calculatePremixedConcrete(100, 15, true);

  assertClose('estimatedCement', r.estimatedCement, 50.0);
  assertClose('baseWater', r.baseWaterAmount, 15.0);
  assertClose('reducedWater', r.waterAmount, 13.5);
  assertClose('plasticizer', r.plasticizerAmount, 0.375);
  // X33: 0.05% of 50g = 0.025g = 25mg
  assertClose('x33Amount', r.x33Amount, 0.025);
  assertEqual('formatDefoamer for 25mg', formatDefoamer(r.x33Amount), '25mg (0.025g)');
}

// calculateScratchMix — Portland only, X33 off
console.log('\n── calculateScratchMix (Portland only, X33 off) ────────');

{
  const r = calculateScratchMix(1000, false, false);

  assertClose('portlandCement', r.portlandCement, 500.0);
  assertClose('csaCement is 0', r.csaCement, 0.0);
  assertClose('fineSand', r.fineSand, 500.0);
  assertClose('totalCementWeight', r.totalCementWeight, 500.0);
  assertClose('water (W/C 0.44)', r.water, 220.0);
  assertClose('plasticizer', r.plasticizer, 3.75);
  assertEqual('useCSA flag', r.useCSA, false);
  assertEqual('useX33 flag', r.useX33, false);
  assertClose('x33Amount is 0', r.x33Amount, 0.0);
}

// calculateScratchMix — Portland only, X33 on
console.log('\n── calculateScratchMix (Portland only, X33 on) ─────────');

{
  const r = calculateScratchMix(1000, false, true);

  assertEqual('useX33 flag', r.useX33, true);
  assertClose('x33Amount', r.x33Amount, 0.25);
  assertEqual('formatDefoamer for 0.25g', formatDefoamer(r.x33Amount), '250mg (0.250g)');
}

// calculateScratchMix — Portland + CSA, X33 on (README reference)
console.log('\n── calculateScratchMix (CSA blend, X33 on) ─────────────');

{
  const r = calculateScratchMix(1000, true, true);

  // Total cement = 500g → Portland 65% = 325g, CSA 35% = 175g
  assertClose('portlandCement (65%)', r.portlandCement, 325.0);
  assertClose('csaCement (35%)', r.csaCement, 175.0);
  assertClose('fineSand', r.fineSand, 500.0);
  assertClose('totalCementWeight', r.totalCementWeight, 500.0);
  assertClose('water', r.water, 220.0);
  assertClose('plasticizer', r.plasticizer, 3.75);
  assertClose('x33Amount', r.x33Amount, 0.25);
  assertEqual('useCSA flag', r.useCSA, true);
  assertEqual('useX33 flag', r.useX33, true);
}

// calculateScratchMix — large batch (5000g), CSA + X33
console.log('\n── calculateScratchMix (5000g large batch, CSA + X33) ──');

{
  const r = calculateScratchMix(5000, true, true);

  assertClose('portlandCement', r.portlandCement, 1625.0);
  assertClose('csaCement', r.csaCement, 875.0);
  assertClose('fineSand', r.fineSand, 2500.0);
  assertClose('water', r.water, 1100.0);
  assertClose('plasticizer', r.plasticizer, 18.75);
  // X33: 0.05% of 2500g = 1.25g → switches to g format
  assertClose('x33Amount', r.x33Amount, 1.25);
  assertEqual('formatDefoamer for 1.25g uses g format', formatDefoamer(r.x33Amount), '1.250g');
}

// X33 dosage boundary checks
console.log('\n── X33 dosage boundary checks ───────────────────────────');

{
  const r = calculateScratchMix(1000, false, true); // 500g cement
  const minDose = r.totalCementWeight * 0.0001; // 0.01%
  const maxDose = r.totalCementWeight * 0.002;  // 0.20%

  assert(
    'x33Amount is within safe range (0.01%–0.20% of cement)',
    r.x33Amount >= minDose && r.x33Amount <= maxDose
  );
  assert(
    'x33Amount is closer to conservative low end (≤ midpoint)',
    r.x33Amount <= (minDose + maxDose) / 2
  );
}

// 1:1 cement:sand ratio invariant
console.log('\n── Mix ratio invariant ──────────────────────────────────');

{
  for (const total of [200, 500, 1000, 2500]) {
    const r = calculateScratchMix(total, false, true);
    assertClose(`1:1 ratio holds at ${total}g total`, r.portlandCement / r.fineSand, 1.0);
  }
}

// Summary
console.log(`\n${'─'.repeat(55)}`);
console.log(`Results: ${passed} passed, ${failed} failed`);

if (failed > 0) {
  console.error('\n❌ Some tests failed — review output above.\n');
  process.exit(1);
} else {
  console.log('\n✅ All smoke tests passed.\n');
}
