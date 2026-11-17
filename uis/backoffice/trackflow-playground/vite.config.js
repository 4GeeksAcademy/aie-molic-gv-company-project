import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';

const appRoot = fileURLToPath(new URL('.', import.meta.url));
const utilsRoot = fileURLToPath(new URL('../../../packages/trackflow-utils', import.meta.url));
const logoRoot = fileURLToPath(new URL('../../website/assets/logos', import.meta.url));

export default defineConfig({
  root: appRoot,
  server: { fs: { allow: [appRoot, utilsRoot, logoRoot] } },
  preview: { host: '0.0.0.0' },
  build: { outDir: 'dist', emptyOutDir: true },
});
