/**
 * Build component styles into a single CSS file
 */

import { readdir, readFile, writeFile, mkdir } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const srcDir = __dirname;
const distDir = join(__dirname, '..', 'dist');

async function findCssFiles(dir: string): Promise<string[]> {
  const cssFiles: string[] = [];

  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);

    if (entry.isDirectory()) {
      const nestedFiles = await findCssFiles(fullPath);
      cssFiles.push(...nestedFiles);
    } else if (entry.name.endsWith('.styles.css')) {
      cssFiles.push(fullPath);
    }
  }

  return cssFiles;
}

async function buildStyles() {
  console.log('🎨 Building component styles...\n');

  await mkdir(distDir, { recursive: true });

  const cssFiles = await findCssFiles(srcDir);
  console.log(`  Found ${cssFiles.length} style files`);

  const contents = await Promise.all(
    cssFiles.map(async (file) => {
      const content = await readFile(file, 'utf-8');
      const relativePath = file.replace(srcDir, '').slice(1);
      return `/* ${relativePath} */\n${content}`;
    })
  );

  const combined = [
    '/**',
    ' * Theme Lab Component Styles',
    ' * Generated file - do not edit directly',
    ' */',
    '',
    ...contents,
  ].join('\n\n');

  await writeFile(join(distDir, 'styles.css'), combined);
  console.log('  ✓ Generated styles.css');

  console.log('\n✨ Style build complete!');
}

buildStyles().catch(console.error);
