#!/usr/bin/env node

import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { PIGMENTS, CEMENT_TYPES, PIGMENT_GROUPS } from '../lib/data.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = join(__dirname, '../lib/data.browser.js');

const out = `// AUTO-GENERATED — do not edit by hand.
// Source of truth: lib/data.js
// Regenerate: node scripts/build-simulator.js
/* eslint-disable */
window.SIMULATOR_DATA = ${JSON.stringify({ PIGMENTS, CEMENT_TYPES, PIGMENT_GROUPS }, null, 2)};
`;

writeFileSync(outPath, out, 'utf-8');
console.log('Generated lib/data.browser.js');
