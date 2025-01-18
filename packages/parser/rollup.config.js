import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'
import commonjs from '@rollup/plugin-commonjs'

export default {
  input: './index.ts',
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
    typescript({
      // 将 TypeScript 编译后的文件输出到 dist 下的子目录 types 中
      outDir: 'dist',
      // 声明文件的输出目录，保持和 outDir 一致，避免混淆
      declarationDir: 'dist/types',
      module: 'ESNext', // 使用最新的模块系统
    }),
  ],
}
