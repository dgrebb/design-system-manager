/**
 * Token Generator
 *
 * Generates CSS outputs from tokens.json:
 * - tokens.css (CSS custom properties)
 * - tokens.dark.css (dark theme overrides)
 * - tailwind.theme.css (Tailwind v4 theme)
 */

import { mkdir, writeFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');
const distDir = join(rootDir, 'dist');

// Import tokens
const tokens = await Bun.file(join(rootDir, 'tokens.json')).json();

/**
 * Flatten nested token object into CSS variable format
 */
function flattenTokens(
  obj: Record<string, unknown>,
  prefix = '--tl'
): Array<{ name: string; value: string }> {
  const result: Array<{ name: string; value: string }> = [];

  function walk(current: Record<string, unknown>, path: string[]) {
    for (const [key, value] of Object.entries(current)) {
      const newPath = [...path, key];

      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        walk(value as Record<string, unknown>, newPath);
      } else {
        const name = `${prefix}-${newPath.join('-')}`;
        result.push({ name, value: String(value) });
      }
    }
  }

  walk(obj, []);
  return result;
}

/**
 * Generate tokens.css with all CSS custom properties
 */
function generateTokensCSS(tokenList: Array<{ name: string; value: string }>): string {
  const lines = [
    '/**',
    ' * Theme Lab Design Tokens',
    ' * Generated file - do not edit directly',
    ' * Edit tokens.json and run `bun run tokens:build`',
    ' */',
    '',
    ':root {',
  ];

  for (const { name, value } of tokenList) {
    lines.push(`  ${name}: ${value};`);
  }

  lines.push('}', '');

  return lines.join('\n');
}

/**
 * Generate dark theme overrides
 */
function generateDarkCSS(): string {
  const darkTokens = {
    // Color overrides for dark theme
    '--tl-color-background-base': tokens.color.neutral['900'],
    '--tl-color-background-muted': tokens.color.neutral['800'],
    '--tl-color-background-subtle': tokens.color.neutral['700'],
    '--tl-color-foreground-base': tokens.color.neutral['50'],
    '--tl-color-foreground-muted': tokens.color.neutral['400'],
    '--tl-color-foreground-subtle': tokens.color.neutral['500'],
    '--tl-color-border-base': tokens.color.neutral['700'],
    '--tl-color-border-muted': tokens.color.neutral['800'],
    '--tl-color-border-strong': tokens.color.neutral['600'],
  };

  const lines = [
    '/**',
    ' * Theme Lab Dark Theme',
    ' * Generated file - do not edit directly',
    ' */',
    '',
    ':root.dark,',
    '[data-theme="dark"] {',
  ];

  for (const [name, value] of Object.entries(darkTokens)) {
    lines.push(`  ${name}: ${value};`);
  }

  lines.push('}', '');

  // Also support prefers-color-scheme
  lines.push('@media (prefers-color-scheme: dark) {', '  :root:not(.light):not([data-theme="light"]) {');

  for (const [name, value] of Object.entries(darkTokens)) {
    lines.push(`    ${name}: ${value};`);
  }

  lines.push('  }', '}', '');

  return lines.join('\n');
}

/**
 * Generate Tailwind v4 CSS-first theme
 */
function generateTailwindTheme(): string {
  const lines = [
    '/**',
    ' * Theme Lab Tailwind v4 Theme',
    ' * Generated file - do not edit directly',
    ' * Import this file in your Tailwind CSS entry point',
    ' */',
    '',
    '@theme {',
    '  /* Colors */',
    `  --color-primary: var(--tl-color-primary-base);`,
    `  --color-primary-hover: var(--tl-color-primary-hover);`,
    `  --color-primary-active: var(--tl-color-primary-active);`,
    `  --color-primary-foreground: var(--tl-color-primary-foreground);`,
    '',
    `  --color-secondary: var(--tl-color-secondary-base);`,
    `  --color-secondary-hover: var(--tl-color-secondary-hover);`,
    `  --color-secondary-foreground: var(--tl-color-secondary-foreground);`,
    '',
    `  --color-success: var(--tl-color-success-base);`,
    `  --color-warning: var(--tl-color-warning-base);`,
    `  --color-error: var(--tl-color-error-base);`,
    '',
    `  --color-background: var(--tl-color-background-base);`,
    `  --color-foreground: var(--tl-color-foreground-base);`,
    `  --color-muted: var(--tl-color-foreground-muted);`,
    `  --color-border: var(--tl-color-border-base);`,
    '',
    '  /* Border Radius */',
    `  --radius-sm: var(--tl-borderRadius-sm);`,
    `  --radius-md: var(--tl-borderRadius-md);`,
    `  --radius-lg: var(--tl-borderRadius-lg);`,
    `  --radius-xl: var(--tl-borderRadius-xl);`,
    '',
    '  /* Shadows */',
    `  --shadow-sm: var(--tl-shadow-sm);`,
    `  --shadow-md: var(--tl-shadow-md);`,
    `  --shadow-lg: var(--tl-shadow-lg);`,
    '',
    '  /* Typography */',
    `  --font-sans: var(--tl-typography-fontFamily-sans);`,
    `  --font-mono: var(--tl-typography-fontFamily-mono);`,
    '}',
    '',
  ];

  return lines.join('\n');
}

/**
 * Main generation function
 */
async function generate() {
  console.log('🎨 Generating tokens...\n');

  // Ensure dist directory exists
  await mkdir(distDir, { recursive: true });

  // Skip $schema key when flattening
  const { $schema: _, ...tokenData } = tokens;

  // Flatten tokens
  const tokenList = flattenTokens(tokenData);
  console.log(`  Found ${tokenList.length} tokens`);

  // Generate files
  const tokensCss = generateTokensCSS(tokenList);
  const darkCss = generateDarkCSS();
  const tailwindCss = generateTailwindTheme();

  // Write files
  await writeFile(join(distDir, 'tokens.css'), tokensCss);
  console.log('  ✓ Generated tokens.css');

  await writeFile(join(distDir, 'tokens.dark.css'), darkCss);
  console.log('  ✓ Generated tokens.dark.css');

  await writeFile(join(distDir, 'tailwind.theme.css'), tailwindCss);
  console.log('  ✓ Generated tailwind.theme.css');

  console.log('\n✨ Token generation complete!');
}

generate().catch(console.error);
