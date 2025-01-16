import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()], // 打包配置
  build: {
    sourcemap: true,
    rollupOptions: {
      external: ['vue'],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue',
        },
        preserveModules: false,
      },
    },
    lib: {
      entry: 'index.ts',
      formats: ['es', 'umd'],
      name: 'index',
    },
    terserOptions: {
      compress: {
        // 防止 Infinity 被压缩成 1/0，这可能会导致 Chrome 上的性能问题
        keep_infinity: true,
        // 生产环境去除 console
        drop_console: true,
        // 生产环境去除 debugger
        drop_debugger: true,
      },
      format: {
        comments: false, // 删除注释
      },
    },
  },
})
