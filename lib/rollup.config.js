import path from 'path';
import eslint from '@rollup/plugin-eslint';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import packageJson from './package.json';
import sass from 'rollup-plugin-sass';

const production = !process.env.ROLLUP_WATCH;

export default [
  {
    input: path.resolve('./src/index.ts'),
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      // eslint(),
      sass({ output: './dist/arc.css' }),
      // resolve({ preferBuiltins: true }),
      commonjs(),
      typescript({
        tsconfig: path.resolve('./tsconfig.json'),
        sourceMap: true,
        inlineSources: true,
      }),
    ],
  },
];
