import inquirer from 'inquirer';
import { MIX, RUBBER, UNITS } from './constants.js';
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

/**
 * Prompt the user through the rubber mold setup:
 * rubber type, mold box size, objects to subtract, and waste tolerance.
 *
 * @returns {{
 *   rubberType: string,
 *   boxVolumeMm3: number,
 *   objects: Array<{ volumeMl: number, quantity: number }>,
 *   wastePercent: number,
 * }}
 */
export async function promptRubberMold() {
  // --- Rubber type (label only, volume is material-independent) ---
  const { rubberType } = await inquirer.prompt([
    {
      type: 'list',
      name: 'rubberType',
      message: 'Which rubber compound?',
      choices: Object.entries(RUBBER.TYPES).map(([value, name]) => ({
        name,
        value,
      })),
    },
  ]);

  // --- Mold box interior volume ---
  // Important: we need the POURABLE SPACE inside the box, not the STL mesh
  // volume of the box walls. For a printed frame, use the interior dimensions.
  console.log(
    '  ℹ️  Enter the INTERIOR of the mold box — the space rubber will fill.\n' +
      '     If your box is a printed frame, use its inner L × W × H, not the\n' +
      '     STL volume shown by your slicer (that is the wall material only).\n',
  );

  const { boxInputMethod } = await inquirer.prompt([
    {
      type: 'list',
      name: 'boxInputMethod',
      message: 'How do you want to enter the mold box interior?',
      choices: [
        {
          name: 'Enter interior dimensions (L × W × H in mm)',
          value: 'dimensions',
        },
        {
          name: 'Enter interior volume directly (mm³)',
          value: 'volume',
        },
      ],
    },
  ]);

  let boxVolumeMm3;

  if (boxInputMethod === 'dimensions') {
    const { length } = await inquirer.prompt([
      {
        type: 'number',
        name: 'length',
        message: 'Interior length (mm):',
        validate: (v) => v > 0 || 'Please enter a positive number',
      },
    ]);
    const { width } = await inquirer.prompt([
      {
        type: 'number',
        name: 'width',
        message: 'Interior width (mm):',
        validate: (v) => v > 0 || 'Please enter a positive number',
      },
    ]);
    const { height } = await inquirer.prompt([
      {
        type: 'number',
        name: 'height',
        message: 'Interior height (mm):',
        validate: (v) => v > 0 || 'Please enter a positive number',
      },
    ]);
    boxVolumeMm3 = length * width * height;
    console.log(
      `\n  Interior: ${length} × ${width} × ${height} mm = ${boxVolumeMm3.toFixed(1)} mm³ (${(boxVolumeMm3 / UNITS.MM3_PER_ML).toFixed(1)} ml)\n`,
    );
  } else {
    const { boxVolume } = await inquirer.prompt([
      {
        type: 'number',
        name: 'boxVolume',
        message: 'Interior volume (mm³):',
        validate: (v) => v > 0 || 'Please enter a positive number',
      },
    ]);
    boxVolumeMm3 = boxVolume;
  }

  // --- Objects inside the box to subtract ---
  // For master objects, the STL mesh volume shown by your slicer IS correct
  // to use here — it represents the solid volume that displaces rubber.
  const { hasObjects } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'hasObjects',
      message: 'Are there master objects inside the box (use their STL mesh volume)?',
      default: true,
    },
  ]);

  const objects = [];

  if (hasObjects) {
    let addMore = true;
    while (addMore) {
      const { objectVolumeMm3 } = await inquirer.prompt([
        {
          type: 'number',
          name: 'objectVolumeMm3',
          message: 'Object volume (mm³):',
          validate: (v) => v > 0 || 'Please enter a positive number',
        },
      ]);
      const { objectQty } = await inquirer.prompt([
        {
          type: 'number',
          name: 'objectQty',
          message: 'How many of this object are in the box?',
          default: 1,
          validate: (v) =>
            (Number.isInteger(v) && v > 0) || 'Please enter a positive integer',
        },
      ]);
      objects.push({ volumeMm3: objectVolumeMm3, quantity: objectQty });

      const runningTotal = objects.reduce(
        (sum, o) => sum + o.volumeMm3 * o.quantity,
        0,
      );
      const remaining = boxVolumeMm3 - runningTotal;

      if (remaining <= 0) {
        console.log(
          `\n  ⚠️  Objects total ${runningTotal.toFixed(1)} mm³ — already at or over the box (${boxVolumeMm3.toFixed(1)} mm³). No rubber to pour.\n`,
        );
        addMore = false;
      } else {
        console.log(
          `\n  Objects so far: ${runningTotal.toFixed(1)} mm³  |  Remaining cavity: ${remaining.toFixed(1)} mm³\n`,
        );
        const { another } = await inquirer.prompt([
          {
            type: 'confirm',
            name: 'another',
            message: 'Add another object type?',
            default: false,
          },
        ]);
        addMore = another;
      }
    }
  }

  // --- Waste tolerance ---
  const { wastePercent } = await inquirer.prompt([
    {
      type: 'number',
      name: 'wastePercent',
      message: 'Waste / overflow tolerance (%):',
      default: RUBBER.DEFAULT_WASTE_PERCENT,
      validate: (v) =>
        (v >= 0 && v <= 50) || 'Please enter a percentage between 0 and 50',
    },
  ]);

  return { rubberType, boxVolumeMm3, objects, wastePercent };
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
