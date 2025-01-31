import { Rules } from './types'

export const rules: Rules = {
  markdown: {
    heading: /^(#{1,6})\s+(.+)$/,
    bold: /\*\*(.+?)\*\*/, // 粗体: **text**
    italic: /_(.+?)_/, // 斜体: _text_
    strikethrough: /~~(.+?)~~/, // 删除线: ~~text~~
    superscript: /\^(.+?)\^/,
    subscript: /\~(.+?)\~/,
    link: /\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/, // 链接： [text](url)
    image: /!\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/, // 图片： ![alt](url)
    blockquote: /^>\s+(.+)$/,
    list: /^(-|\*|\d+\.)\s+(.+)$/,
    codeBlock: /^```(\w*)\n([\s\S]*?)\n```$/,
    inlineCode: /`([^`]+)`/, // 行内代码: `code`
    hr: /^([-*_]){3,}$/,
    table: /^\|(.+)\|\n\|[-]+\|\n((?:\|.+?\|?\n?)*)/,
    taskList: /^\s*\[([ x])\]\s+(.+)$/,
    footnote: {
      reference: /\[\^([^\]]+)\]/,
      definition: /\[\^([^\]]+)\]:\s*(.+)$/,
    },
    underline: /__([^_]+)__/, // 下划线: __text__
    footnoteReference: /\[\^([^\]]+)\]/, // 脚注: [^text]
    highlight: /==(.+?)==/, // 高亮: ==text==
    mathBlock: /^\$\$(.+?)\$\$/,
    inlineMath: /\$(.+?)\$/,
    toc: /^\[TOC\]$/,
    admonition: /^:::\s*(\w+)\s*(.*?)\s*:::$/,
    timeline: /^- (\d{4}):\s*(.+)$/,
  },
}
