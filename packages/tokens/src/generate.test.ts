import { describe, expect, test, beforeAll } from 'bun:test';
import { readFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, '..', 'dist');

describe('Token Generation', () => {
  beforeAll(async () => {
    // Run the generator
    const proc = Bun.spawn(['bun', 'run', 'src/generate.ts'], {
      cwd: join(__dirname, '..'),
    });
    await proc.exited;
  });

  test('generates tokens.css', async () => {
    const content = await readFile(join(distDir, 'tokens.css'), 'utf-8');

    expect(content).toContain(':root {');
    expect(content).toContain('--tl-color-primary-base');
    expect(content).toContain('--tl-spacing-4');
    expect(content).toContain('--tl-typography-fontFamily-sans');
  });

  test('generates tokens.dark.css', async () => {
    const content = await readFile(join(distDir, 'tokens.dark.css'), 'utf-8');

    expect(content).toContain(':root.dark');
    expect(content).toContain('[data-theme="dark"]');
    expect(content).toContain('@media (prefers-color-scheme: dark)');
  });

  test('generates tailwind.theme.css', async () => {
    const content = await readFile(join(distDir, 'tailwind.theme.css'), 'utf-8');

    expect(content).toContain('@theme {');
    expect(content).toContain('--color-primary');
    expect(content).toContain('--radius-md');
  });

  test('CSS output is deterministic', async () => {
    // Run generator twice and compare
    const firstRun = await readFile(join(distDir, 'tokens.css'), 'utf-8');

    const proc = Bun.spawn(['bun', 'run', 'src/generate.ts'], {
      cwd: join(__dirname, '..'),
    });
    await proc.exited;

    const secondRun = await readFile(join(distDir, 'tokens.css'), 'utf-8');

    expect(firstRun).toBe(secondRun);
  });
});
