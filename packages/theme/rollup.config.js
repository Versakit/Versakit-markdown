import resolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import commonjs from '@rollup/plugin-commonjs'

export default {
  input: './index.js',
  output: [
    // 输出 ESM 格式
    {
      dir: 'dist',
      format: 'esm',
      entryFileNames: '[name].esm.js',
      sourcemap: true, // 输出 sourcemap 以便于调试
      // 对 esm 格式的代码进行压缩
      plugins: [terser()],
    },
    // 输出 UMD 格式
    {
      dir: 'dist',
      format: 'umd',
      entryFileNames: '[name].umd.js',
      name: 'FE_utils', // UMD 模块的全局名称，会挂载到 window 对象下
      sourcemap: true,
      // 对 UMD 格式的代码进行压缩
      plugins: [terser()],
    },
  ],
  plugins: [
    resolve(), // 帮助 Rollup 解析模块依赖
    commonjs(), // 将 CommonJS 模块转换为 ES 模块
  ],
}
