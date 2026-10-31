import { cpSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [{
    name: 'copy-template-assets',
    apply: 'build',
    // Classic scripts and data-img URLs are not part of Vite's module graph.
    // Keep their original paths and script execution order in production.
    writeBundle(options) {
      cpSync(resolve('assets'), resolve(options.dir, 'assets'), { recursive: true });
    }
  }]
});
