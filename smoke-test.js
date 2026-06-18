#!/usr/bin/env node

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { calculateScratchMix, calculateRubberMold, formatDefoamer } from './lib/calculations.js';
import { MIX, UNITS } from './lib/constants.js';

const close = (actual, expected, tolerance = 0.001) => {
  const diff = Math.abs(actual - expected);
  assert.ok(
    diff <= tolerance,
    `expected ${expected}, got ${actual.toFixed(6)} (diff ${diff.toFixed(6)})`
  );
};

describe('formatDefoamer', () => {
  it('sub-1g: 0.25g → 250mg (0.250g)', () => assert.equal(formatDefoamer(0.25), '250mg (0.250g)'));
  it('sub-1g: 0.1g rounds mg correctly → 100mg (0.100g)', () =>
    assert.equal(formatDefoamer(0.1), '100mg (0.100g)'));
  it('exactly 1g → 1.000g', () => assert.equal(formatDefoamer(1.0), '1.000g'));
  it('over 1g: 1.5g → 1.500g', () => assert.equal(formatDefoamer(1.5), '1.500g'));
});

describe('calculateScratchMix — Portland only, X33 off', () => {
  const r = calculateScratchMix({
    totalAmount: 1000,
    useCSA: false,
    useX33: false,
    cementType: 'grey',
    useSand: true,
    pigmentPercent: 0,
  });

  it('portlandCement = 500g', () => close(r.portlandCement, 500.0));
  it('csaCement = 0', () => close(r.csaCement, 0.0));
  it('fineSand = 500g', () => close(r.fineSand, 500.0));
  it('totalCementWeight = 500g', () => close(r.totalCementWeight, 500.0));
  it('water = 220ml (W/C 0.44)', () => close(r.water, 220.0));
  it('plasticizer = 3.75ml', () => close(r.plasticizer, 3.75));
  it('useCSA flag', () => assert.equal(r.useCSA, false));
  it('useX33 flag', () => assert.equal(r.useX33, false));
  it('x33Amount = 0', () => close(r.x33Amount, 0.0));
  it('pigmentWeight = 0', () => close(r.pigmentWeight, 0.0));
  it('cementType', () => assert.equal(r.cementType, 'grey'));
  it('useSand', () => assert.equal(r.useSand, true));
});

describe('calculateScratchMix — Portland only, X33 on', () => {
  const r = calculateScratchMix({
    totalAmount: 1000,
    useCSA: false,
    useX33: true,
    cementType: 'grey',
    useSand: true,
    pigmentPercent: 0,
  });

  it('useX33 flag', () => assert.equal(r.useX33, true));
  it('x33Amount = 0.05% × 500g cement = 0.25g', () => close(r.x33Amount, 0.25));
  it('formatDefoamer for 0.25g → 250mg (0.250g)', () =>
    assert.equal(formatDefoamer(r.x33Amount), '250mg (0.250g)'));
  it('water unchanged', () => close(r.water, 220.0));
  it('plasticizer unchanged', () => close(r.plasticizer, 3.75));
});

describe('calculateScratchMix — CSA blend (Portland+CSA 50/50), X33 on', () => {
  const r = calculateScratchMix({
    totalAmount: 1000,
    useCSA: true,
    useX33: true,
    cementType: 'grey',
    useSand: true,
    pigmentPercent: 0,
  });

  it('portlandCement = 50% of 500g = 250g', () => close(r.portlandCement, 250.0));
  it('csaCement = 50% of 500g = 250g', () => close(r.csaCement, 250.0));
  it('fineSand = 500g', () => close(r.fineSand, 500.0));
  it('totalCementWeight = 500g', () => close(r.totalCementWeight, 500.0));
  it('water = 220ml', () => close(r.water, 220.0));
  it('plasticizer = 3.75ml', () => close(r.plasticizer, 3.75));
  it('x33Amount = 0.25g', () => close(r.x33Amount, 0.25));
  it('useCSA flag', () => assert.equal(r.useCSA, true));
  it('useX33 flag', () => assert.equal(r.useX33, true));
});

describe('calculateScratchMix — 5000g large batch, CSA + X33', () => {
  const r = calculateScratchMix({
    totalAmount: 5000,
    useCSA: true,
    useX33: true,
    cementType: 'grey',
    useSand: true,
    pigmentPercent: 0,
  });

  it('portlandCement = 1250g', () => close(r.portlandCement, 1250.0));
  it('csaCement = 1250g', () => close(r.csaCement, 1250.0));
  it('fineSand = 2500g', () => close(r.fineSand, 2500.0));
  it('water = 1100ml', () => close(r.water, 1100.0));
  it('plasticizer = 18.75ml', () => close(r.plasticizer, 18.75));
  it('x33Amount = 1.25g → g format', () => {
    close(r.x33Amount, 1.25);
    assert.equal(formatDefoamer(r.x33Amount), '1.250g');
  });
});

describe('X33 dosage — within safe 0.01%–0.20% range', () => {
  const r = calculateScratchMix({
    totalAmount: 1000,
    useCSA: false,
    useX33: true,
    cementType: 'grey',
    useSand: true,
    pigmentPercent: 0,
  });

  it('x33Amount >= 0.01% of cement', () => assert.ok(r.x33Amount >= r.totalCementWeight * 0.0001));
  it('x33Amount <= 0.20% of cement', () => assert.ok(r.x33Amount <= r.totalCementWeight * 0.002));
});

describe('1:1 cement:sand ratio invariant', () => {
  for (const total of [200, 500, 1000, 2500]) {
    it(`holds at ${total}g total`, () => {
      const r = calculateScratchMix({
        totalAmount: total,
        useCSA: false,
        useX33: true,
        cementType: 'grey',
        useSand: true,
        pigmentPercent: 0,
      });
      close(r.portlandCement / r.fineSand, 1.0);
    });
  }
});

describe('calculateScratchMix — White Portland, no pigment', () => {
  const r = calculateScratchMix({
    totalAmount: 1000,
    useCSA: false,
    useX33: true,
    cementType: 'white',
    useSand: true,
    pigmentPercent: 0,
  });

  it('cementType', () => assert.equal(r.cementType, 'white'));
  it('portlandCement = 500g', () => close(r.portlandCement, 500.0));
  it('csaCement = 0', () => close(r.csaCement, 0.0));
  it('useCSA = false', () => assert.equal(r.useCSA, false));
  it('fineSand = 500g', () => close(r.fineSand, 500.0));
  it('water = 220ml', () => close(r.water, 220.0));
  it('plasticizer = 3.75ml', () => close(r.plasticizer, 3.75));
  it('pigmentWeight = 0', () => close(r.pigmentWeight, 0.0));
});

describe('calculateScratchMix — White Portland + CSA blend', () => {
  const r = calculateScratchMix({
    totalAmount: 1000,
    useCSA: true,
    useX33: false,
    cementType: 'white',
    useSand: true,
    pigmentPercent: 0,
  });

  it('useCSA = true', () => assert.equal(r.useCSA, true));
  it('portlandCement = 250g (50%)', () => close(r.portlandCement, 250.0));
  it('csaCement = 250g (50%)', () => close(r.csaCement, 250.0));
  it('totalCementWeight = 500g', () => close(r.totalCementWeight, 500.0));
});

describe('calculateScratchMix — White Portland, 5% pigment', () => {
  const r = calculateScratchMix({
    totalAmount: 1000,
    useCSA: false,
    useX33: true,
    cementType: 'white',
    useSand: true,
    pigmentPercent: 5,
    pigmentKey: 'red',
  });

  it('pigmentPercent = 5', () => assert.equal(r.pigmentPercent, 5));
  it('pigmentWeight = 5% of 500g = 25g', () => close(r.pigmentWeight, 25.0));
  it('pigmentKey = red', () => assert.equal(r.pigmentKey, 'red'));
  it('totalCementWeight unchanged = 500g', () => close(r.totalCementWeight, 500.0));
  it('water unchanged = 220ml', () => close(r.water, 220.0));
});

describe('Pigment boundary checks', () => {
  it('1% pigment of 500g cement = 5g', () => {
    const r = calculateScratchMix({
      totalAmount: 1000,
      useCSA: false,
      useX33: false,
      cementType: 'white',
      useSand: true,
      pigmentPercent: 1,
    });
    close(r.pigmentWeight, 5.0);
  });

  it('10% pigment of 500g cement = 50g', () => {
    const r = calculateScratchMix({
      totalAmount: 1000,
      useCSA: false,
      useX33: false,
      cementType: 'white',
      useSand: true,
      pigmentPercent: 10,
    });
    close(r.pigmentWeight, 50.0);
  });
});

describe('calculateScratchMix — cement-only, grey Portland', () => {
  const r = calculateScratchMix({
    totalAmount: 1000,
    useCSA: false,
    useX33: true,
    cementType: 'grey',
    useSand: false,
    pigmentPercent: 0,
  });

  it('useSand = false', () => assert.equal(r.useSand, false));
  it('fineSand = 0', () => close(r.fineSand, 0.0));
  it('portlandCement = entire totalAmount = 1000g', () => close(r.portlandCement, 1000.0));
  it('totalCementWeight = 1000g', () => close(r.totalCementWeight, 1000.0));
  it('water = W/C 0.44 of 1000g = 440ml', () => close(r.water, 440.0));
  it('plasticizer = 0.75% of 1000g = 7.5ml', () => close(r.plasticizer, 7.5));
  it('x33Amount = 0.05% of 1000g = 0.5g', () => close(r.x33Amount, 0.5));
});

// ---------------------------------------------------------------------------
// AR glass fibre tests (now part of the standard scratch mix)
// ---------------------------------------------------------------------------

describe('calculateScratchMix — AR fibers on, Portland only, with sand', () => {
  const r = calculateScratchMix({
    totalAmount: 1000,
    useCSA: false,
    useX33: false,
    useFibers: true,
    cementType: 'grey',
    useSand: true,
    pigmentPercent: 0,
  });

  it('useFibers = true', () => assert.equal(r.useFibers, true));
  it('fiberWeight = 3% of 500g cement = 15g', () => close(r.fiberWeight, 500 * MIX.FIBER_PERCENT));
  it('totalCementWeight unchanged = 500g', () => close(r.totalCementWeight, 500.0));
  it('water unchanged = 220ml', () => close(r.water, 220.0));
  it('plasticizer unchanged = 3.75ml', () => close(r.plasticizer, 3.75));
});

describe('calculateScratchMix — AR fibers off (default)', () => {
  const r = calculateScratchMix({
    totalAmount: 1000,
    useCSA: false,
    useX33: false,
    cementType: 'grey',
    useSand: true,
    pigmentPercent: 0,
  });

  it('useFibers = false by default', () => assert.equal(r.useFibers, false));
  it('fiberWeight = 0', () => close(r.fiberWeight, 0.0));
});

describe('calculateScratchMix — AR fibers scale with cement weight (CSA blend)', () => {
  for (const total of [500, 1000, 2000]) {
    it(`fiberWeight correct at ${total}g total mix`, () => {
      const r = calculateScratchMix({
        totalAmount: total,
        useCSA: true,
        useX33: false,
        useFibers: true,
        cementType: 'grey',
        useSand: true,
        pigmentPercent: 0,
      });
      // totalCementWeight = total / 2 (50% cement in 1:1 mix)
      close(r.fiberWeight, r.totalCementWeight * MIX.FIBER_PERCENT);
    });
  }
});

describe('calculateScratchMix — cement-only, white Portland + 5% pigment', () => {
  const r = calculateScratchMix({
    totalAmount: 1000,
    useCSA: false,
    useX33: true,
    cementType: 'white',
    useSand: false,
    pigmentPercent: 5,
    pigmentKey: 'brown',
  });

  it('cementType = white', () => assert.equal(r.cementType, 'white'));
  it('useSand = false', () => assert.equal(r.useSand, false));
  it('fineSand = 0', () => close(r.fineSand, 0.0));
  it('totalCementWeight = 1000g', () => close(r.totalCementWeight, 1000.0));
  it('pigmentWeight = 5% of 1000g = 50g', () => close(r.pigmentWeight, 50.0));
  it('water = 440ml', () => close(r.water, 440.0));
  it('plasticizer = 7.5ml', () => close(r.plasticizer, 7.5));
  it('pigmentKey = brown', () => assert.equal(r.pigmentKey, 'brown'));
});

// ---------------------------------------------------------------------------
// calculateRubberMold
// ---------------------------------------------------------------------------

describe('calculateRubberMold — single object, 10% waste', () => {
  // Box: 1,000,000 mm³ (= 1 L)
  // Object: 200,000 mm³ × 1
  // Cavity: 800,000 mm³
  // Rubber (10% waste): 880,000 mm³ = 880 ml = 0.880 L
  const r = calculateRubberMold({
    rubberType: 'silicone',
    boxVolumeMm3: 1_000_000,
    objects: [{ volumeMm3: 200_000, quantity: 1 }],
    wastePercent: 10,
  });

  it('rubberType', () => assert.equal(r.rubberType, 'silicone'));
  it('boxVolumeMm3', () => close(r.boxVolumeMm3, 1_000_000));
  it('totalObjectVolumeMm3 = 200,000', () =>
    close(r.totalObjectVolumeMm3, 200_000));
  it('cavityVolumeMm3 = 800,000', () => close(r.cavityVolumeMm3, 800_000));
  it('rubberVolumeMm3 = 880,000', () => close(r.rubberVolumeMm3, 880_000));
  it('rubberMl = 880', () => close(r.rubberMl, 880));
  it('rubberL = 0.88', () => close(r.rubberL, 0.88));
});

describe('calculateRubberMold — multiple object types, 0% waste', () => {
  // Box: 500,000 mm³
  // Objects: 4 × 50,000 mm³ = 200,000 mm³ + 1 × 50,000 mm³ = 50,000 mm³
  // Total objects: 250,000 mm³
  // Cavity: 250,000 mm³
  // Rubber (0% waste): 250,000 mm³ = 250 ml
  const r = calculateRubberMold({
    rubberType: 'polyurethane',
    boxVolumeMm3: 500_000,
    objects: [
      { volumeMm3: 50_000, quantity: 4 },
      { volumeMm3: 50_000, quantity: 1 },
    ],
    wastePercent: 0,
  });

  it('totalObjectVolumeMm3 = 250,000', () =>
    close(r.totalObjectVolumeMm3, 250_000));
  it('cavityVolumeMm3 = 250,000', () => close(r.cavityVolumeMm3, 250_000));
  it('rubberMl = 250', () => close(r.rubberMl, 250));
  it('rubberL = 0.25', () => close(r.rubberL, 0.25));
});

describe('calculateRubberMold — no objects (empty box)', () => {
  // Box: 200,000 mm³, no objects, 15% waste
  // Rubber: 200,000 × 1.15 = 230,000 mm³ = 230 ml
  const r = calculateRubberMold({
    rubberType: 'silicone',
    boxVolumeMm3: 200_000,
    objects: [],
    wastePercent: 15,
  });

  it('totalObjectVolumeMm3 = 0', () => close(r.totalObjectVolumeMm3, 0));
  it('cavityVolumeMm3 = box volume', () => close(r.cavityVolumeMm3, 200_000));
  it('rubberMl = 230', () => close(r.rubberMl, 230));
});

describe('calculateRubberMold — throws when objects overflow box', () => {
  it('throws when total object volume equals box volume', () => {
    assert.throws(
      () =>
        calculateRubberMold({
          rubberType: 'silicone',
          boxVolumeMm3: 100_000,
          objects: [{ volumeMm3: 100_000, quantity: 1 }],
          wastePercent: 10,
        }),
      /equals or exceeds/,
    );
  });

  it('throws when total object volume exceeds box volume', () => {
    assert.throws(
      () =>
        calculateRubberMold({
          rubberType: 'silicone',
          boxVolumeMm3: 50_000,
          objects: [{ volumeMm3: 100_000, quantity: 1 }],
          wastePercent: 10,
        }),
      /equals or exceeds/,
    );
  });

  it('throws when box volume is zero', () => {
    assert.throws(
      () =>
        calculateRubberMold({
          rubberType: 'silicone',
          boxVolumeMm3: 0,
          objects: [],
          wastePercent: 10,
        }),
      /greater than zero/,
    );
  });
});

describe('calculateRubberMold — UNITS constants are used correctly', () => {
  const r = calculateRubberMold({
    rubberType: 'silicone',
    boxVolumeMm3: UNITS.MM3_PER_L,
    objects: [],
    wastePercent: 0,
  });

  it('1 L box with no objects and 0% waste → rubberL = 1', () =>
    close(r.rubberL, 1));
  it('1 L box with no objects and 0% waste → rubberMl = 1000', () =>
    close(r.rubberMl, 1000));
});
