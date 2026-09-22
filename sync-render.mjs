import { copyFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = dirname(fileURLToPath(import.meta.url));
const source = join(root, 'site', 'dist');
const files = [
  'index.html',
  'styles.css',
  'app.js',
  'assets/josephine-facade.webp',
  'assets/josephine-facade-small.webp',
];

for (const relativePath of files) {
  const destination = join(root, relativePath);
  await mkdir(dirname(destination), { recursive: true });
  await copyFile(join(source, relativePath), destination);
}

console.log('Render files synced to the repository root.');
