#!/usr/bin/env node

import inquirer from 'inquirer';

// Concrete Calculator for detailed statues and decorative pieces
console.log(
  '\n🏗️  Concrete Calculator for Detailed Statues & Decorative Pieces\n'
);

// 0.05% of cement weight — conservative start within the 0.01–0.20% safe range
const X33_DOSAGE_PERCENT = 0.0005;

export function formatDefoamer(grams) {
  if (grams < 1) {
    return `${(grams * 1000).toFixed(0)}mg (${grams.toFixed(3)}g)`;
  }
  return `${grams.toFixed(3)}g`;
}

async function main() {
  try {
    const { mixType } = await inquirer.prompt([
      {
        type: 'list',
        name: 'mixType',
        message: 'What type of concrete work are you doing?',
        choices: [
          {
            name: 'Already mixed concrete (need water & plasticizer)',
            value: 'premixed',
          },
          { name: 'Starting from scratch (custom mix)', value: 'scratch' },
          { name: 'Calculate concrete needed for mold', value: 'mold' },
        ],
      },
    ]);

    if (mixType === 'premixed') {
      await handlePremixedConcrete();
    } else if (mixType === 'scratch') {
      await handleScratchMix();
    } else {
      await handleMoldCalculation();
    }
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

async function handleMoldCalculation() {
  console.log('\n📐 Mold Volume Calculator');

  const inputs = await inquirer.prompt([
    {
      type: 'number',
      name: 'volume',
      message: 'Model volume from 3D software (in mm³):',
      validate: (input) => input > 0 || 'Please enter a positive number',
    },
    {
      type: 'number',
      name: 'tolerance',
      message: 'Safety tolerance percentage (recommended 15-25%):',
      default: 15,
      validate: (input) =>
        (input >= 0 && input <= 50) ||
        'Please enter a percentage between 0 and 50',
    },
  ]);

  const volume = inputs.volume;
  const tolerance = inputs.tolerance / 100; // Convert percentage to decimal
  const safeVolume = volume * (1 + tolerance);
  const concreteWeight = safeVolume * 0.0024; // Concrete density ~0.0024 g/mm³

  console.log(
    `\nWith ${inputs.tolerance}% safety tolerance: ${safeVolume.toFixed(1)} mm³`
  );
  console.log(`Estimated concrete needed: ${concreteWeight.toFixed(0)}g`);

  const { concreteType } = await inquirer.prompt([
    {
      type: 'list',
      name: 'concreteType',
      message: 'What type of concrete mix do you want?',
      choices: [
        {
          name: 'Already mixed concrete (need water & plasticizer)',
          value: 'premixed',
        },
        { name: 'Starting from scratch (custom mix)', value: 'scratch' },
      ],
    },
  ]);

  if (concreteType === 'premixed') {
    const waterRatio = await inquirer.prompt([
      {
        type: 'number',
        name: 'ratio',
        message: 'Water ratio from supplier (ml per 100g of concrete):',
        validate: (input) => input > 0 || 'Please enter a positive number',
      },
    ]);

    const { useX33 } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'useX33',
        message: 'Add X33 defoamer? (reduces surface bubbles & pinholes)',
        default: true,
      },
    ]);

    const results = calculatePremixedConcrete(
      concreteWeight,
      waterRatio.ratio,
      useX33
    );
    displayPremixedResults(results);
  } else {
    const csaInput = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'useCSA',
        message: 'Will you be using CSA cement?',
        default: false,
      },
    ]);

    const { useX33 } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'useX33',
        message: 'Add X33 defoamer? (reduces surface bubbles & pinholes)',
        default: true,
      },
    ]);

    const results = calculateScratchMix(
      concreteWeight,
      csaInput.useCSA,
      useX33
    );
    displayScratchResults(results);
  }

  console.log(`\n📊 Mold Volume Summary:`);
  console.log(`Original volume: ${volume.toFixed(1)} mm³`);
  console.log(
    `With ${inputs.tolerance}% tolerance: ${safeVolume.toFixed(1)} mm³`
  );
  console.log(`Concrete density: 0.0024 g/mm³`);
}

async function handlePremixedConcrete() {
  console.log('\n📋 Already Mixed Concrete Calculator\n');

  const answers = await inquirer.prompt([
    {
      type: 'number',
      name: 'concreteAmount',
      message: 'How much concrete do you want? (in grams)',
      validate: (input) => input > 0 || 'Please enter a positive number',
    },
    {
      type: 'number',
      name: 'waterRatio',
      message: 'Water ratio from supplier (ml per 100g of concrete):',
      validate: (input) => input > 0 || 'Please enter a positive number',
    },
  ]);

  const { useX33 } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'useX33',
      message: 'Add X33 defoamer? (reduces surface bubbles & pinholes)',
      default: true,
    },
  ]);

  const results = calculatePremixedConcrete(
    answers.concreteAmount,
    answers.waterRatio,
    useX33
  );
  displayPremixedResults(results);
}

async function handleScratchMix() {
  console.log('\n🔨 From Scratch Mix Calculator\n');

  const answers = await inquirer.prompt([
    {
      type: 'number',
      name: 'totalAmount',
      message: 'How much concrete do you want to make? (in grams)',
      validate: (input) => input > 0 || 'Please enter a positive number',
    },
    {
      type: 'confirm',
      name: 'useCSA',
      message: 'Will you be using CSA cement?',
      default: false,
    },
  ]);

  const { useX33 } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'useX33',
      message: 'Add X33 defoamer? (reduces surface bubbles & pinholes)',
      default: true,
    },
  ]);

  const results = calculateScratchMix(
    answers.totalAmount,
    answers.useCSA,
    useX33
  );
  displayScratchResults(results);
}

export function calculatePremixedConcrete(concreteAmount, waterRatio, useX33) {
  // Calculate base water amount from supplier's ratio
  const baseWaterAmount = (concreteAmount * waterRatio) / 100;

  // Estimate cement content (approximately 50% of concrete weight for fine work)
  const estimatedCement = concreteAmount * 0.5;

  // Level+ Plasticizer: 0.75% of cement weight
  const plasticizerAmount = estimatedCement * 0.0075;

  // With plasticizer, you can reduce water by approximately 10-15%
  // Using 10% reduction as optimal for Level+ plasticizer in detailed mold work (2025 research)
  const waterReduction = 0.1;
  const reducedWaterAmount = baseWaterAmount * (1 - waterReduction);

  // X33 defoamer: 0.05% of estimated cement weight — add to dry mix before water
  const x33Amount = useX33 ? estimatedCement * X33_DOSAGE_PERCENT : 0;

  return {
    concreteAmount,
    baseWaterAmount,
    waterAmount: reducedWaterAmount,
    waterSaved: baseWaterAmount - reducedWaterAmount,
    plasticizerAmount,
    estimatedCement,
    waterRatio,
    waterReduction: waterReduction * 100,
    useX33,
    x33Amount,
  };
}

export function calculateScratchMix(totalAmount, useCSA, useX33) {
  // Using 1:1 cement:sand ratio for fine detailed work (no aggregate)
  // Perfect for statues and decorative pieces requiring smooth finish

  // Total parts: 1 cement + 1 sand = 2 parts
  const totalParts = 2;

  // Calculate individual components
  let portlandCement, csaCement, fineSand;

  if (useCSA) {
    // When using CSA: 65% Portland + 35% CSA for 2-hour maximum hardening
    const totalCement = totalAmount * (1 / totalParts);
    portlandCement = totalCement * 0.65;
    csaCement = totalCement * 0.35;
  } else {
    // Pure Portland cement
    portlandCement = totalAmount * (1 / totalParts);
    csaCement = 0;
  }

  fineSand = totalAmount * (1 / totalParts);

  // No coarse aggregate for fine detailed work
  const coarseAggregate = 0;

  // Water calculation: 0.44 water-cement ratio optimized for detailed mold flow (2025 research)
  // Higher ratio provides better flow for intricate molds while maintaining strength
  const totalCementWeight = portlandCement + csaCement;
  const water = totalCementWeight * 0.44;

  // Level+ Plasticizer: 0.75% of total cement weight (your specific product)
  const plasticizer = totalCementWeight * 0.0075;

  // X33 defoamer: 0.05% of total cement weight — add to dry mix before water
  const x33Amount = useX33 ? totalCementWeight * X33_DOSAGE_PERCENT : 0;

  return {
    totalAmount,
    portlandCement,
    fineSand,
    coarseAggregate,
    csaCement,
    water,
    plasticizer,
    useCSA,
    totalCementWeight,
    useX33,
    x33Amount,
  };
}

function displayPremixedResults(results) {
  console.log('\n✅ Results (Already Mixed Concrete)');
  console.log(`Concrete: ${results.concreteAmount.toFixed(0)}g`);
  console.log(`Water: ${results.waterAmount.toFixed(1)}ml`);
  console.log(`Level+ Plasticizer: ${results.plasticizerAmount.toFixed(1)}ml`);
  console.log(
    `Water saved: ${results.waterSaved.toFixed(
      1
    )}ml (${results.waterReduction.toFixed(0)}% reduction)`
  );
  console.log(`Estimated cement: ${results.estimatedCement.toFixed(0)}g`);

  if (results.useX33) {
    console.log(
      `X33 Defoamer: ${formatDefoamer(results.x33Amount)} — weigh on a mg scale`
    );
    console.log('\n📋 Mixing Order (X33 active):');
    console.log(
      '  1. Weigh out concrete powder into mixing vessel'
    );
    console.log(
      '  2. Add X33 powder — mix dry for 30 seconds until evenly distributed'
    );
    console.log('  3. Mix plasticizer into water in a separate cup');
    console.log('  4. Add water+plasticizer to dry mix gradually');
    console.log('  5. Mix thoroughly for 2–3 minutes');
  } else {
    console.log('\n📝 Mix plasticizer with water before adding to concrete');
  }
}

function displayScratchResults(results) {
  console.log('\n✅ Results (From Scratch Mix)');
  console.log(`Concrete: ${results.totalAmount.toFixed(0)}g`);
  console.log(`Portland: ${results.portlandCement.toFixed(1)}g`);
  if (results.useCSA) {
    console.log(`CSA: ${results.csaCement.toFixed(1)}g`);
  }
  console.log(`Sand: ${results.fineSand.toFixed(1)}g`);
  console.log(`Water: ${results.water.toFixed(1)}ml`);
  console.log(`Level+ Plasticizer: ${results.plasticizer.toFixed(1)}ml`);

  if (results.useX33) {
    console.log(
      `X33 Defoamer: ${formatDefoamer(results.x33Amount)} — weigh on a mg scale`
    );
    console.log('\n📋 Mixing Order (X33 active):');
    console.log('  1. Combine Portland cement + CSA cement (if using) in vessel');
    console.log('  2. Add fine sand — stir to combine');
    console.log(
      '  3. Add X33 powder — mix dry for 30 seconds until evenly distributed'
    );
    console.log('  4. Mix plasticizer into water in a separate cup');
    console.log('  5. Add water+plasticizer to dry mix gradually');
    console.log('  6. Mix thoroughly for 2–3 minutes');
    console.log(
      '  ⚠️  Do not exceed X33 dosage — overdosing weakens surface quality'
    );
  } else {
    console.log(
      `📝 1:1 ratio | W/C: 0.44${
        results.useCSA ? ' | CSA blend: 2hr max hardening' : ''
      }`
    );
  }

  if (results.useX33) {
    console.log(
      `\n📝 1:1 ratio | W/C: 0.44${
        results.useCSA ? ' | CSA blend: 2hr max hardening' : ''
      }`
    );
  }
}

const isEntryPoint =
  process.argv[1] === new URL(import.meta.url).pathname;

if (isEntryPoint) {
  main();
}
