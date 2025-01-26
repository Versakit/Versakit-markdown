import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Versakit Markdown',
  description: 'Versakit Markdown',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '例子', link: '/examples' },
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Simonmie/Versakit-markdown' },
    ],
  },
  vite: {
    server: {
      port: 8080,
    },
  },
})
