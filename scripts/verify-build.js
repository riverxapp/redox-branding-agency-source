import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const root = resolve('dist');
const missing = new Set();
let checked = 0;

function check(reference, source) {
  if (/^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(reference)) return;
  const path = decodeURIComponent(reference.split(/[?#]/)[0]);
  if (!path) return;
  const target = path.startsWith('/')
    ? resolve(root, `.${path}`)
    : resolve(dirname(source), path);
  checked += 1;
  if (!existsSync(target)) missing.add(`${reference} (from ${source})`);
}

function inspect(directory) {
  for (const entry of readdirSync(directory)) {
    const file = resolve(directory, entry);
    if (statSync(file).isDirectory()) {
      inspect(file);
    } else if (file.endsWith('.html')) {
      const html = readFileSync(file, 'utf8');
      for (const match of html.matchAll(/\b(?:src|href|data-img)=["']([^"']+)["']/g)) {
        check(match[1], file);
      }
    } else if (file.endsWith('.css')) {
      const css = readFileSync(file, 'utf8');
      for (const match of css.matchAll(/url\(\s*["']?([^"')\s]+)["']?\s*\)/g)) {
        check(match[1], file);
      }
    }
  }
}

inspect(root);
if (missing.size) {
  console.error(`Build contains missing assets:\n${[...missing].join('\n')}`);
  process.exit(1);
}
console.log(`Verified ${checked} local asset references in dist.`);
