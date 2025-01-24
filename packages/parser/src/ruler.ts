import { Rules } from './types'

export const rules: Rules = {
  markdown: {
    // 匹配标题
    heading: /^(#{1,6})\s+(.+)$/,
    // 匹配加粗
    bold: /\*\*(.+?)\*\*/,
    // 匹配斜体
    italic: /\*(.+?)\*/,

    // 匹配删除线
    strikethrough: /~~(.*?)~~/g,
    // 匹配下划线
    underline: /_(.*?)_/g,
    // 匹配下标
    subscript: /~(.*?)~/g,
    // 匹配上标
    superscript: /\^(.*?)\^/g,
    // 匹配音频
    audio: /!\[音频\]\((.*?)\)/g,
    // 匹配未选
    checkboxUnchecked: /^\s*[-*]\s*\[\s*\]\s*(.*)/g,
    // 匹配已选
    checkboxChecked: /^\s*[-*]\s*\[\s*[xX]\s*\]\s*(.*)/g,
    // 匹配高亮
    highlight: /==(.*?)==/g,

    // 匹配链接
    link: /\[(.+?)\]\((.+?)\)/,
    // 匹配图片
    image: /!\[(.+?)\]\((.+?)\)/,
    // 匹配引用
    blockquote: /^>\s+(.+)$/,
    // 匹配列表项(- 列表项、* 列表项 或 1. 列表项)
    list: /^(-|\*|\d+\.)\s+(.+)$/,
    // 匹配代码块
    codeBlock: /^```(\w*)\n([\s\S]*?)\n```$/,
    // 匹配行内代码
    inlineCode: /`(.+?)`/,
    // 匹配分割线(---、*** 或 ___)
    hr: /^([-*_]){3,}$/,
  },
}
