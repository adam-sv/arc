/****************************
 ** Vite Config - Demo App **
 * ARC is documented by a mostly-bootstrapped ARC app, plus some code viewing features.
 * This Vite Config is only for the Demo App, NOT the @adam-sv/arc library!
 ****************************/

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.VITE_PUBLIC_URL || '',
  build: { outDir: 'dist-demo-app' },
  plugins: [react(), tsconfigPaths()],
});
