import resolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import commonjs from '@rollup/plugin-commonjs'
import postcss from 'rollup-plugin-postcss'

export default {
  input: './index.js',
  output: [
    {
      dir: 'dist',
      format: 'esm',
      entryFileNames: '[name].esm.js',
      sourcemap: true,
      plugins: [terser()],
    },
    {
      dir: 'dist',
      format: 'umd',
      entryFileNames: '[name].umd.js',
      name: 'VersaMarkdown',
      sourcemap: true,
      plugins: [terser()],
    },
  ],
  plugins: [
    postcss({
      extract: false,
      modules: false,
      inject: false,
    }),
    resolve(),
    commonjs(),
  ],
}
