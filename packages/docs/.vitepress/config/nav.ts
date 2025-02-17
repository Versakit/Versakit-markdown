import { DefaultTheme } from 'vitepress'

export const getNav = (): DefaultTheme.NavItem[] => {
  return [
    { text: '指南', link: '/guide/installation/' },
    { text: '解释器', link: '/parser/' },
    { text: '渲染器', link: '/renderer/' },
    { text: '组件', link: '/examples' },
    { text: '团队', link: '/team/' },
  ]
}
