import path from 'path'
import typescript from '@rollup/plugin-typescript'

export default {
  input: path.resolve(__dirname, 'src/index.ts'),
  output: [
    {
      file: path.resolve(__dirname, 'dist/index.cjs.js'),
      format: 'cjs',
      exports: 'named',
    },
    {
      file: path.resolve(__dirname, 'dist/index.esm.js'),
      format: 'esm',
    },
  ],
  plugins: [typescript()],
  external: ['vue'], // 如果使用Vue，可以将其作为外部依赖
}
