import inquirer from 'inquirer';
import { MIX } from './constants.js';
import { CEMENT_TYPES, PIGMENTS } from './data.js';

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
          ? 'Use CSA cement? (2-hour max hardening — ⚠️  grey CSA will visibly shift white color)'
          : 'Use CSA cement? (2-hour max hardening)',
      default: false,
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
  const { pigmentPercent, pigmentKey } = await promptPigment();

  return { totalAmount, cementType, useSand, useCSA, useX33, pigmentPercent, pigmentKey };
}

export async function promptMoldVolume() {
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
        (input >= 0 && input <= 50) || 'Please enter a percentage between 0 and 50',
    },
  ]);
  return { volume: inputs.volume, tolerance: inputs.tolerance };
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
