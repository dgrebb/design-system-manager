import { describe, expect, test, beforeAll } from 'bun:test';
import { readFile, mkdir, writeFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');
const distDir = join(rootDir, 'dist');
const snapshotsDir = join(rootDir, 'src', '__snapshots__');

// Ensure snapshots directory exists
await mkdir(snapshotsDir, { recursive: true });

describe('Token Generation', () => {
  beforeAll(async () => {
    // Run the generator
    const proc = Bun.spawn(['bun', 'run', 'src/generate.ts'], {
      cwd: rootDir,
      stdout: 'pipe',
      stderr: 'pipe',
    });
    await proc.exited;
  });

  test('generates tokens.css with all required sections', async () => {
    const content = await readFile(join(distDir, 'tokens.css'), 'utf-8');

    // Check structure
    expect(content).toContain(':root {');
    expect(content).toContain('Generated file - do not edit directly');

    // Check color tokens
    expect(content).toContain('--tl-color-primary-base');
    expect(content).toContain('--tl-color-secondary-base');
    expect(content).toContain('--tl-color-neutral-500');
    expect(content).toContain('--tl-color-success-base');
    expect(content).toContain('--tl-color-error-base');

    // Check spacing tokens
    expect(content).toContain('--tl-spacing-0');
    expect(content).toContain('--tl-spacing-4');
    expect(content).toContain('--tl-spacing-8');

    // Check typography tokens
    expect(content).toContain('--tl-typography-fontFamily-sans');
    expect(content).toContain('--tl-typography-fontSize-base');
    expect(content).toContain('--tl-typography-fontWeight-medium');

    // Check other tokens
    expect(content).toContain('--tl-borderRadius-md');
    expect(content).toContain('--tl-shadow-md');
    expect(content).toContain('--tl-transition-fast');
  });

  test('generates tokens.dark.css with dark theme overrides', async () => {
    const content = await readFile(join(distDir, 'tokens.dark.css'), 'utf-8');

    // Check dark theme selectors
    expect(content).toContain(':root.dark');
    expect(content).toContain('[data-theme="dark"]');
    expect(content).toContain('@media (prefers-color-scheme: dark)');

    // Check dark overrides exist
    expect(content).toContain('--tl-color-background-base');
    expect(content).toContain('--tl-color-foreground-base');
  });

  test('generates tailwind.theme.css with Tailwind v4 theme', async () => {
    const content = await readFile(join(distDir, 'tailwind.theme.css'), 'utf-8');

    // Check Tailwind theme structure
    expect(content).toContain('@theme {');

    // Check color mappings
    expect(content).toContain('--color-primary:');
    expect(content).toContain('--color-secondary:');

    // Check radius mappings
    expect(content).toContain('--radius-md:');

    // Check shadow mappings
    expect(content).toContain('--shadow-md:');

    // Check font mappings
    expect(content).toContain('--font-sans:');
  });

  test('CSS output is deterministic', async () => {
    // Read first generation
    const firstRun = await readFile(join(distDir, 'tokens.css'), 'utf-8');

    // Run generator again
    const proc = Bun.spawn(['bun', 'run', 'src/generate.ts'], {
      cwd: rootDir,
      stdout: 'pipe',
      stderr: 'pipe',
    });
    await proc.exited;

    // Read second generation
    const secondRun = await readFile(join(distDir, 'tokens.css'), 'utf-8');

    // Should be identical
    expect(firstRun).toBe(secondRun);
  });

  test('token count matches expected', async () => {
    const content = await readFile(join(distDir, 'tokens.css'), 'utf-8');

    // Count CSS variables (lines containing --)
    const varLines = content.split('\n').filter((line) => line.trim().startsWith('--tl-'));

    // Should have ~111 tokens based on our token definition
    expect(varLines.length).toBeGreaterThanOrEqual(100);
    expect(varLines.length).toBeLessThanOrEqual(150);
  });
});

describe('Token Snapshots', () => {
  const snapshotFile = (name: string) => join(snapshotsDir, `${name}.snap.css`);

  test('tokens.css matches snapshot', async () => {
    const content = await readFile(join(distDir, 'tokens.css'), 'utf-8');
    const snapshotPath = snapshotFile('tokens');

    if (existsSync(snapshotPath)) {
      const snapshot = await readFile(snapshotPath, 'utf-8');
      expect(content).toBe(snapshot);
    } else {
      // Create snapshot on first run
      await writeFile(snapshotPath, content);
      console.log('  📸 Created snapshot: tokens.snap.css');
    }
  });

  test('tokens.dark.css matches snapshot', async () => {
    const content = await readFile(join(distDir, 'tokens.dark.css'), 'utf-8');
    const snapshotPath = snapshotFile('tokens.dark');

    if (existsSync(snapshotPath)) {
      const snapshot = await readFile(snapshotPath, 'utf-8');
      expect(content).toBe(snapshot);
    } else {
      await writeFile(snapshotPath, content);
      console.log('  📸 Created snapshot: tokens.dark.snap.css');
    }
  });

  test('tailwind.theme.css matches snapshot', async () => {
    const content = await readFile(join(distDir, 'tailwind.theme.css'), 'utf-8');
    const snapshotPath = snapshotFile('tailwind.theme');

    if (existsSync(snapshotPath)) {
      const snapshot = await readFile(snapshotPath, 'utf-8');
      expect(content).toBe(snapshot);
    } else {
      await writeFile(snapshotPath, content);
      console.log('  📸 Created snapshot: tailwind.theme.snap.css');
    }
  });
});

describe('Token Validation', () => {
  test('tokens.json is valid against schema', async () => {
    const proc = Bun.spawn(['bun', 'run', 'src/validate.ts'], {
      cwd: rootDir,
      stdout: 'pipe',
      stderr: 'pipe',
    });

    const exitCode = await proc.exited;
    expect(exitCode).toBe(0);
  });
});
