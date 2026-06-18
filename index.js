#!/usr/bin/env node

import { fileURLToPath } from 'node:url';
import inquirer from 'inquirer';
import { MIX } from './lib/constants.js';
import { calculateScratchMix, calculateRubberMold } from './lib/calculations.js';
import {
  promptScratchOptions,
  promptMoldVolume,
  promptRubberMold,
  promptAgain,
} from './lib/prompts.js';
import { displayScratchResults, displayRubberMoldResults } from './lib/display.js';

console.log('\n🏗️  Concrete Calculator for Detailed Statues & Decorative Pieces\n');

async function handleScratchMix() {
  console.log('\n🔨 From Scratch Mix Calculator\n');
  const options = await promptScratchOptions();
  const results = calculateScratchMix(options);
  displayScratchResults(results);
}

async function handleMoldCalculation() {
  console.log('\n📐 Mold Volume Calculator');
  const { volume, tolerance, stlInfo } = await promptMoldVolume();
  const toleranceDec = tolerance / 100;
  const safeVolume = volume * (1 + toleranceDec);
  const concreteWeight = safeVolume * MIX.CONCRETE_DENSITY_G_PER_MM3;

  console.log(`\nWith ${tolerance}% safety tolerance: ${safeVolume.toFixed(1)} mm³`);
  console.log(`Estimated concrete needed: ${concreteWeight.toFixed(0)}g`);
  console.log('\nNow configure your mix:\n');

  const options = await promptScratchOptions(concreteWeight);
  const results = calculateScratchMix(options);
  displayScratchResults(results);

  console.log('\n📊 Mold Volume Summary:');
  if (stlInfo) {
    const { x, y, z } = stlInfo.boundingBox;
    console.log(`STL file:  ${stlInfo.filePath}`);
    console.log(
      `Mesh:      ${stlInfo.triangleCount.toLocaleString()} triangles  |  ` +
        `${x.toFixed(1)} × ${y.toFixed(1)} × ${z.toFixed(1)} mm`,
    );
  }
  console.log(`Original volume: ${volume.toFixed(1)} mm³`);
  console.log(`With ${tolerance}% tolerance: ${safeVolume.toFixed(1)} mm³`);
  console.log(`Concrete density: ${MIX.CONCRETE_DENSITY_G_PER_MM3} g/mm³`);
}

async function handleRubberMold() {
  console.log('\n🧪 Rubber Mold Calculator\n');
  const params = await promptRubberMold();
  try {
    const results = calculateRubberMold(params);
    displayRubberMoldResults(results);
  } catch (err) {
    console.error(`\n  ✖ ${err.message}\n`);
  }
}

async function main() {
  try {
    let again = true;
    while (again) {
      const { mixType } = await inquirer.prompt([
        {
          type: 'list',
          name: 'mixType',
          message: 'What type of concrete work are you doing?',
          choices: [
            { name: 'From scratch (custom mix)', value: 'scratch' },
            { name: 'Calculate for mold volume', value: 'mold' },
            { name: 'Calculate mold rubber (silicone / PU)', value: 'rubber' },
          ],
        },
      ]);

      if (mixType === 'scratch') {
        await handleScratchMix();
      } else if (mixType === 'mold') {
        await handleMoldCalculation();
      } else {
        await handleRubberMold();
      }

      console.log('\n' + '─'.repeat(55));
      again = await promptAgain();
      if (again) console.log('');
    }
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

const isEntryPoint = fileURLToPath(import.meta.url) === process.argv[1];

if (isEntryPoint) {
  main();
}
