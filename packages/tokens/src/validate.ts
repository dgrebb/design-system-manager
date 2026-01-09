/**
 * Token Validator
 *
 * Validates tokens.json structure and values
 */

import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');

const tokens = await Bun.file(join(rootDir, 'tokens.json')).json();

interface ValidationError {
  path: string;
  message: string;
}

const errors: ValidationError[] = [];

/**
 * Validate color values
 */
function validateColor(value: string, path: string) {
  const hexPattern = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/;
  const rgbPattern = /^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/;
  const rgbaPattern = /^rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(,\s*[\d.]+\s*)?\)$/;

  if (!hexPattern.test(value) && !rgbPattern.test(value) && !rgbaPattern.test(value)) {
    errors.push({ path, message: `Invalid color value: ${value}` });
  }
}

/**
 * Validate spacing/size values
 */
function validateSize(value: string, path: string) {
  const validUnits = /^(\d+(\.\d+)?(rem|em|px|%)|0)$/;
  if (!validUnits.test(value)) {
    errors.push({ path, message: `Invalid size value: ${value}` });
  }
}

/**
 * Walk through tokens and validate
 */
function validateTokens(obj: Record<string, unknown>, path: string[] = []) {
  for (const [key, value] of Object.entries(obj)) {
    if (key === '$schema') continue;

    const currentPath = [...path, key];
    const pathString = currentPath.join('.');

    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      validateTokens(value as Record<string, unknown>, currentPath);
    } else if (typeof value === 'string') {
      // Validate based on token category
      if (currentPath[0] === 'color') {
        validateColor(value, pathString);
      } else if (currentPath[0] === 'spacing' && value !== '0') {
        validateSize(value, pathString);
      }
    }
  }
}

// Run validation
console.log('🔍 Validating tokens...\n');

validateTokens(tokens);

if (errors.length > 0) {
  console.log('❌ Validation failed:\n');
  for (const error of errors) {
    console.log(`  ${error.path}: ${error.message}`);
  }
  process.exit(1);
} else {
  console.log('✅ All tokens are valid!');
  process.exit(0);
}
