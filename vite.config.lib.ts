/****************************
 ** Vite Config - Library Mode **
 * This is the Vite Config for @adam-sv/arc to publish with Vite library mode.
 *
 * There is only one noteworthy piece of configuration here:
 * 1. `base: './'`
 *    - We need downstream consumers rendering the <EdgeRouter /> component - which is also done via Graph or Gantt or maybe even more -
 *      to have a zero-config experience. Accordingly, the import in the production ARC code looks like
 *      `new Worker(new URL('assets/worker.js', import.meta.url).href)`
 *    - When the downstream bundler consuming this sees import.meta.url, hopefully it will re-bundle the worker appropriately!
 *    - The default for this option is '/', which would just result in `new Worker("/assets/worker.js")`, which would
 *      require someone to ensure manually that file has made it to such a relative location instead of having the bundler handle it.
 ****************************/

// @ts-nocheck
// Why use this directive? TypeScript is raging at the use of the rollup-plugin-typescript2. Try it out if you want!

import { resolve } from 'path';

import { defineConfig } from 'vite';
import typescript from 'rollup-plugin-typescript2';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { libInjectCss } from 'vite-plugin-lib-inject-css';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    // typescript-disable
    {
      ...typescript({ tsconfig: './tsconfig.json' }),
      enforce: 'pre',
    },
    // typescript-enable
    react(),
    libInjectCss(),
    tsconfigPaths(),
  ],
  build: {
    outDir: 'dist-lib',
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/lib/index.ts'),
      name: 'ARC',
      // the proper extensions will be added
      fileName: 'adam-sv-arc',
      formats: ['es', 'umd'], // ['es', 'umd'] is the default
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['react', 'react-dom'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});
