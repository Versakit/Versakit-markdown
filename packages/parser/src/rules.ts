import { Rules } from './types'

export const rules: Rules = {
  markdown: {
    heading: /^(#{1,6})\s+(.+)$/,
    bold: /\*\*((?:\\\*|[^*])+)\*\*/g, // 粗体: **text**
    italic: /_([^_]+)_/g, // 斜体: _text_
    link: /\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/, // 链接： [text](url)
    image: /!\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/, // 图片： ![alt](url)
    blockquote: /^>\s+(.+)$/,
    list: /^(-|\*|\d+\.)\s+(.+)$/,
    codeBlock: /^```(\w*)\n([\s\S]*?)\n```$/,
    inlineCode: /`([^`]+)`/g, // 行内代码: `code`
    hr: /^([-*_]){3,}$/,
    table: /^ *(\|.+\|)\n *(\|? *[-:]+ *[-|: ]*)\n((?: *\|.*\|? *\n?)*)/g,
    footnote: {
      reference: /\[\^([^\]]+)\]/,
      definition: /\[\^([^\]]+)\]:\s*(.+)$/,
    },
    strikethrough: /~~([^~]+?)~~/g,
    subscript: /~([^~\n]+?)~/g,
    superscript: /\^([^^\n]+?)\^/g,
    taskList: /^-\s+\[([ x])\]\s+(.+)$/, // 任务列表
    underline: /__([^_]+)__/g, // 下划线
    footnoteReference: /\[\^([^\]]+)\]/g, // 脚注引用
    highlight: /==([^=]+)==/g, // 高亮
    inlineMath: /\$(.+?)\$/g, // 行内数学公式
    mathBlock: /^\$\$(.*?)\$\$/, // 数学公式块
    toc: /^\[TOC\]$/gm, // 目录
    admonition: /^:::\s+(\w+)(?:\s+(.*))?/, // 警告框
    timeline: /^-\s+(\d{4}):\s+(.+)$/g, // 时间线
    audio: /!\[(.*?)\]\((.*?\.mp3)\)/g,
    footnoteDefinition: /^\[\^([^\]]+)\]:\s+(.*)/,
  },
}
