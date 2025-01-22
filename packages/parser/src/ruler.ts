import { Rules } from './types'

export const rules: Rules = {
  markdown: {
    heading: /^(#{1,6})\s+(.+)$/,
    bold: /\*\*(.+?)\*\*/,
    italic: /\*(.+?)\*/,
    link: /\[(.+?)\]\((.+?)\)/,
    image: /!\[(.+?)\]\((.+?)\)/,
    blockquote: /^>\s+(.+)$/,
    list: /^(-|\*|\d+\.)\s+(.+)$/,
    codeBlock: /^```(\w*)\n([\s\S]*?)\n```$/,
    inlineCode: /`(.+?)`/,
    hr: /^([-*_]){3,}$/,
  },
}
