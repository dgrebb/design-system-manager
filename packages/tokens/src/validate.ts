/**
 * Token Validator
 *
 * Validates tokens.json against the JSON schema and performs
 * additional semantic validation.
 */

import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import Ajv from 'ajv';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');

const tokens = await Bun.file(join(rootDir, 'tokens.json')).json();
const schema = await Bun.file(join(rootDir, 'token-schema.json')).json();

interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Validate tokens against JSON schema
 */
function validateSchema(tokens: unknown, schema: object): ValidationResult {
  const ajv = new Ajv({ allErrors: true, strict: false });
  const validate = ajv.compile(schema);
  const valid = validate(tokens);

  const errors: string[] = [];
  if (!valid && validate.errors) {
    for (const error of validate.errors) {
      const path = error.instancePath || '/';
      errors.push(`${path}: ${error.message}`);
    }
  }

  return { valid: !!valid, errors, warnings: [] };
}

/**
 * Perform semantic validation beyond schema
 */
function validateSemantics(tokens: Record<string, unknown>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check color contrast (basic check - foreground should differ from base)
  const colorCategories = ['primary', 'secondary', 'success', 'warning', 'error'];
  for (const category of colorCategories) {
    const colors = (tokens.color as Record<string, Record<string, string>>)?.[category];
    if (colors?.base === colors?.foreground) {
      warnings.push(`color.${category}: base and foreground are identical - may have contrast issues`);
    }
  }

  // Check that spacing scale is consistent
  const spacing = tokens.spacing as Record<string, string>;
  if (spacing) {
    const numericKeys = Object.keys(spacing)
      .filter((k) => /^[0-9]+$/.test(k))
      .map(Number)
      .sort((a, b) => a - b);

    for (let i = 1; i < numericKeys.length; i++) {
      const prev = numericKeys[i - 1];
      const curr = numericKeys[i];
      if (curr - prev > 4 && curr < 20) {
        warnings.push(`spacing: gap between ${prev} and ${curr} - consider adding intermediate values`);
      }
    }
  }

  // Check typography has required sizes
  const requiredFontSizes = ['sm', 'base', 'lg'];
  const fontSize = (tokens.typography as Record<string, Record<string, string>>)?.fontSize;
  if (fontSize) {
    for (const size of requiredFontSizes) {
      if (!fontSize[size]) {
        errors.push(`typography.fontSize: missing required size "${size}"`);
      }
    }
  }

  return { valid: errors.length === 0, errors, warnings };
}

/**
 * Check for duplicate CSS variable names
 */
function checkDuplicateVariables(tokens: Record<string, unknown>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const seen = new Set<string>();

  function walk(obj: Record<string, unknown>, path: string[] = []) {
    for (const [key, value] of Object.entries(obj)) {
      if (key === '$schema') continue;

      const currentPath = [...path, key];

      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        walk(value as Record<string, unknown>, currentPath);
      } else {
        const varName = `--tl-${currentPath.join('-')}`;
        if (seen.has(varName)) {
          errors.push(`Duplicate CSS variable: ${varName}`);
        }
        seen.add(varName);
      }
    }
  }

  walk(tokens);

  return { valid: errors.length === 0, errors, warnings };
}

/**
 * Main validation function
 */
async function validate(): Promise<void> {
  console.log('🔍 Validating tokens...\n');

  let hasErrors = false;

  // Schema validation
  console.log('  Checking JSON schema...');
  const schemaResult = validateSchema(tokens, schema);
  if (!schemaResult.valid) {
    console.log('  ❌ Schema validation failed:');
    for (const error of schemaResult.errors) {
      console.log(`     ${error}`);
    }
    hasErrors = true;
  } else {
    console.log('  ✓ Schema valid');
  }

  // Semantic validation
  console.log('  Checking semantics...');
  const semanticResult = validateSemantics(tokens);
  if (!semanticResult.valid) {
    console.log('  ❌ Semantic validation failed:');
    for (const error of semanticResult.errors) {
      console.log(`     ${error}`);
    }
    hasErrors = true;
  } else {
    console.log('  ✓ Semantics valid');
  }

  for (const warning of semanticResult.warnings) {
    console.log(`  ⚠️  ${warning}`);
  }

  // Duplicate check
  console.log('  Checking for duplicates...');
  const duplicateResult = checkDuplicateVariables(tokens);
  if (!duplicateResult.valid) {
    console.log('  ❌ Duplicate check failed:');
    for (const error of duplicateResult.errors) {
      console.log(`     ${error}`);
    }
    hasErrors = true;
  } else {
    console.log('  ✓ No duplicates');
  }

  console.log('');

  if (hasErrors) {
    console.log('❌ Validation failed\n');
    process.exit(1);
  } else {
    console.log('✅ All validations passed!\n');
    process.exit(0);
  }
}

validate().catch((error) => {
  console.error('Validation error:', error);
  process.exit(1);
});
