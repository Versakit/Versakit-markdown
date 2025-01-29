import { defineConfig } from 'vitepress'
import { getGuideSidebar } from '../.vitepress/config/getGuideSidebar'
import { getNav } from '../.vitepress/config/nav'

export default defineConfig({
  title: 'Versakit Markdown',
  description: 'Versakit Markdown',
  themeConfig: {
    nav: getNav(),
    sidebar: {
      '/guide/': getGuideSidebar(),
    } as any,
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
