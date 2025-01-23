// rules.ts
import { Rules } from './types'

export const rules: Rules = {
  markdown: {
    heading: /^(#{1,6})\s+(.+)$/,
    bold: /\*\*(.+?)\*\*|__(.+?)__/,
    italic: /\*(.+?)\*|_(.+?)_/,
    strikethrough: /~~(.+?)~~/,
    superscript: /\^(.+?)\^/,
    subscript: /\~(.+?)\~/,
    link: /\[(.+?)\]\((.+?)\)/,
    image: /!\[(.+?)\]\((.+?)\)/,
    blockquote: /^>\s+(.+)$/,
    list: /^(-|\*|\d+\.)\s+(.+)$/,
    codeBlock: /^```(\w*)\n([\s\S]*?)\n```$/,
    inlineCode: /`(.+?)`/,
    hr: /^([-*_]){3,}$/,
    table: /^\|(.+)\|\n\|[-]+\|\n((?:\|.+?\|?\n?)*)/,
    taskList: /^\s*\[([ x])\]\s+(.+)$/,
    footnote: {
      reference: /\[\^([^\]]+)\]/,
      definition: /\[\^([^\]]+)\]:\s*(.+)$/,
    },
    highlight: /==(.+?)==/,
    checkbox: /^\s*\[\s*\]|\[x\]/,
    mathBlock: /^\$\$(.+?)\$\$/,
    inlineMath: /\$(.+?)\$/,
    toc: /^\[TOC\]$/,
    admonition: /^:::\s*(\w+)\s*(.*?)\s*:::$/,
    timeline: /^- (\d{4}):\s*(.+)$/,
    underline: /\_(.+?)\_/, // 添加 underline 的正则表达式
  },
}
