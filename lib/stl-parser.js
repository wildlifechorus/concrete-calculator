/**
 * STL file parser for concrete volume estimation.
 *
 * Supports both binary and ASCII STL formats. Computes mesh volume using the
 * signed-tetrahedra method (divergence theorem), which is exact for any closed,
 * watertight mesh. Also returns the bounding box for display purposes.
 *
 * Units: STL files produced by most slicers (PrusaSlicer, Bambu, Orca, etc.)
 * store coordinates in millimetres, so the returned volume is in mm³.
 */

import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { homedir } from 'node:os';

/**
 * Expand a leading ~ and resolve to an absolute path.
 * Also strips surrounding quotes that some terminals add on drag-and-drop.
 * @param {string} filePath
 * @returns {string}
 */
function normalisePath(filePath) {
  let p = filePath.trim().replace(/^['"]|['"]$/g, '');
  if (p.startsWith('~')) {
    p = homedir() + p.slice(1);
  }
  return resolve(p);
}

/**
 * Determine whether a buffer contains a binary STL.
 *
 * Binary STL layout: 80-byte header + 4-byte uint32 triangle count +
 * (triangleCount × 50) bytes of triangle data.
 * If the file size matches that formula exactly it is binary; otherwise ASCII.
 *
 * @param {Buffer} buffer
 * @returns {boolean}
 */
function isBinary(buffer) {
  if (buffer.length < 84) return false;
  const triCount = buffer.readUInt32LE(80);
  return buffer.length === 84 + triCount * 50;
}

/**
 * Parse binary STL into an array of triangles.
 * Each triangle is [[x,y,z], [x,y,z], [x,y,z]].
 * @param {Buffer} buffer
 * @returns {number[][][]}
 */
function parseBinary(buffer) {
  const triCount = buffer.readUInt32LE(80);
  const triangles = [];
  let offset = 84;

  for (let i = 0; i < triCount; i++) {
    offset += 12; // skip face normal
    const v1 = [
      buffer.readFloatLE(offset),
      buffer.readFloatLE(offset + 4),
      buffer.readFloatLE(offset + 8),
    ];
    offset += 12;
    const v2 = [
      buffer.readFloatLE(offset),
      buffer.readFloatLE(offset + 4),
      buffer.readFloatLE(offset + 8),
    ];
    offset += 12;
    const v3 = [
      buffer.readFloatLE(offset),
      buffer.readFloatLE(offset + 4),
      buffer.readFloatLE(offset + 8),
    ];
    offset += 12;
    offset += 2; // skip attribute byte count
    triangles.push([v1, v2, v3]);
  }

  return triangles;
}

/**
 * Parse ASCII STL into an array of triangles.
 * @param {string} text
 * @returns {number[][][]}
 */
function parseAscii(text) {
  const triangles = [];
  const pattern =
    /vertex\s+([\d.eE+\-]+)\s+([\d.eE+\-]+)\s+([\d.eE+\-]+)/g;
  const vertices = [];
  let m;

  while ((m = pattern.exec(text)) !== null) {
    vertices.push([parseFloat(m[1]), parseFloat(m[2]), parseFloat(m[3])]);
  }

  for (let i = 0; i + 2 < vertices.length; i += 3) {
    triangles.push([vertices[i], vertices[i + 1], vertices[i + 2]]);
  }

  return triangles;
}

/**
 * Signed tetrahedron volume contribution for one triangle.
 * Summing across all triangles and taking the absolute value gives mesh volume.
 * @param {number[][]} tri
 * @returns {number}
 */
function signedTetVolume([v1, v2, v3]) {
  return (
    (v1[0] * (v2[1] * v3[2] - v2[2] * v3[1]) +
      v1[1] * (v2[2] * v3[0] - v2[0] * v3[2]) +
      v1[2] * (v2[0] * v3[1] - v2[1] * v3[0])) /
    6
  );
}

/**
 * Parse an STL file and return volume and mesh metadata.
 *
 * @param {string} filePath - Path to the .stl file. ~ is expanded.
 * @returns {{
 *   volume: number,        // mesh volume in mm³
 *   triangleCount: number,
 *   boundingBox: { x: number, y: number, z: number }, // dimensions in mm
 * }}
 * @throws {Error} if the file does not exist or cannot be parsed.
 */
export function parseStl(filePath) {
  const fullPath = normalisePath(filePath);

  if (!existsSync(fullPath)) {
    throw new Error(`STL file not found: ${fullPath}`);
  }

  const buffer = readFileSync(fullPath);
  const triangles = isBinary(buffer)
    ? parseBinary(buffer)
    : parseAscii(buffer.toString('utf8'));

  if (triangles.length === 0) {
    throw new Error('No triangles found in STL file — file may be corrupt.');
  }

  let volumeSum = 0;
  const min = [Infinity, Infinity, Infinity];
  const max = [-Infinity, -Infinity, -Infinity];

  for (const tri of triangles) {
    volumeSum += signedTetVolume(tri);
    for (const v of tri) {
      for (let i = 0; i < 3; i++) {
        if (v[i] < min[i]) { min[i] = v[i]; }
        if (v[i] > max[i]) { max[i] = v[i]; }
      }
    }
  }

  return {
    volume: Math.abs(volumeSum),
    triangleCount: triangles.length,
    boundingBox: {
      x: max[0] - min[0],
      y: max[1] - min[1],
      z: max[2] - min[2],
    },
  };
}
