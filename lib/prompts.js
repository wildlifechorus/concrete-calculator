import inquirer from 'inquirer';
import { MIX } from './constants.js';
import { CEMENT_TYPES, PIGMENTS } from './data.js';
import { parseStl } from './stl-parser.js';

export async function promptCementType() {
  const { cementType } = await inquirer.prompt([
    {
      type: 'list',
      name: 'cementType',
      message: 'Which cement type?',
      choices: CEMENT_TYPES,
    },
  ]);
  return cementType;
}

export async function promptUseSand() {
  const { useSand } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'useSand',
      message: 'Include fine sand? (1:1 cement:sand — uncheck for cement-only paste)',
      default: true,
    },
  ]);
  return useSand;
}

export async function promptCsa(cementType) {
  const { useCSA } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'useCSA',
      message:
        cementType === 'white'
          ? 'Use CSA cement? (~1hr demold — ⚠️  grey CSA will visibly shift white color)'
          : 'Use CSA cement? (~1hr demold)',
      default: true,
    },
  ]);
  return useCSA;
}

export async function promptX33() {
  const { useX33 } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'useX33',
      message: 'Add X33 defoamer? (reduces surface bubbles & pinholes)',
      default: true,
    },
  ]);
  return useX33;
}

export async function promptPigment() {
  const { usePigment } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'usePigment',
      message: 'Add pigment?',
      default: false,
    },
  ]);

  if (!usePigment) return { pigmentPercent: 0, pigmentKey: null };

  const pigmentChoices = Object.entries(PIGMENTS).map(([key, { label }]) => ({
    name: label,
    value: key,
  }));

  const { pigmentKey } = await inquirer.prompt([
    {
      type: 'list',
      name: 'pigmentKey',
      message: 'Which pigment?',
      choices: pigmentChoices,
    },
  ]);

  const { pigmentPct } = await inquirer.prompt([
    {
      type: 'number',
      name: 'pigmentPct',
      message: `Amount (${MIX.PIGMENT_MIN_PCT}–${MIX.PIGMENT_MAX_PCT}% of cement weight):`,
      default: 5,
      validate: (input) =>
        (input >= MIX.PIGMENT_MIN_PCT && input <= MIX.PIGMENT_MAX_PCT) ||
        `Please enter a percentage between ${MIX.PIGMENT_MIN_PCT} and ${MIX.PIGMENT_MAX_PCT}`,
    },
  ]);

  return { pigmentPercent: pigmentPct, pigmentKey };
}

export async function promptScratchOptions(presetAmount = null) {
  let totalAmount = presetAmount;

  if (totalAmount === null) {
    const { amount } = await inquirer.prompt([
      {
        type: 'number',
        name: 'amount',
        message: 'How much dry mix do you want to make? (in grams)',
        validate: (input) => input > 0 || 'Please enter a positive number',
      },
    ]);
    totalAmount = amount;
  }

  const cementType = await promptCementType();
  const useSand = await promptUseSand();
  const useCSA = await promptCsa(cementType);
  const useX33 = await promptX33();
  const useFibers = await promptUseFibers();
  const { pigmentPercent, pigmentKey } = await promptPigment();

  return { totalAmount, cementType, useSand, useCSA, useX33, useFibers, pigmentPercent, pigmentKey };
}

export async function promptMoldVolume() {
  const { volumeSource } = await inquirer.prompt([
    {
      type: 'list',
      name: 'volumeSource',
      message: 'How do you want to specify the mold volume?',
      choices: [
        { name: 'Import from STL file', value: 'stl' },
        { name: 'Enter volume manually (mm³)', value: 'manual' },
      ],
      default: 'stl',
    },
  ]);

  let volume;
  let stlInfo = null;

  if (volumeSource === 'stl') {
    const { filePath } = await inquirer.prompt([
      {
        type: 'input',
        name: 'filePath',
        message: 'Path to STL file (drag file here or type path):',
        validate: (input) => {
          if (!input.trim()) { return 'Please enter a file path'; }
          return true;
        },
      },
    ]);

    console.log('\n  Parsing mesh...');
    try {
      const parsed = parseStl(filePath);
      stlInfo = { filePath: filePath.trim(), ...parsed };
      volume = parsed.volume;
      const { x, y, z } = parsed.boundingBox;
      console.log(
        `  ✓ ${parsed.triangleCount.toLocaleString()} triangles  |  ` +
          `${x.toFixed(1)} × ${y.toFixed(1)} × ${z.toFixed(1)} mm  |  ` +
          `${volume.toFixed(0)} mm³\n`,
      );
    } catch (err) {
      console.error(`\n  ✖ Could not read STL: ${err.message}\n`);
      process.exit(1);
    }
  } else {
    const { vol } = await inquirer.prompt([
      {
        type: 'number',
        name: 'vol',
        message: 'Model volume from 3D software (in mm³):',
        validate: (input) => input > 0 || 'Please enter a positive number',
      },
    ]);
    volume = vol;
  }

  const { tolerance } = await inquirer.prompt([
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

  return { volume, tolerance, stlInfo };
}

export async function promptUseFibers() {
  const { useFibers } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'useFibers',
      message: 'Add AR glass fibers? (3% of cement — prevents cracking in large pieces)',
      default: false,
    },
  ]);
  return useFibers;
}

export async function promptAgain() {
  const { again } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'again',
      message: 'Calculate another mix?',
      default: false,
    },
  ]);
  return again;
}
