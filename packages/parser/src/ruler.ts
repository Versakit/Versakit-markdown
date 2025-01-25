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
    strikethrough: /~~(.+?)~~/,
    // 匹配下划线
    underline: /_(.+?)_/,
    // 匹配下标
    subscript: /~(.+?)~/,
    // 匹配上标
    superscript: /\^(.+?)\^/,
    // 匹配音频：![音频](url)，url 必须非空
    audio: /!\[音频\]\((.+?)\)/,
    // 匹配未选中的复选框
    checkboxUnchecked: /^\s*[-*]\s*\[\s*\]\s+(.+)$/,
    // 匹配选中的复选框
    checkboxChecked: /^\s*[-*]\s*\[\s*[xX]\s*\]\s+(.+)$/,
    // 匹配高亮
    highlight: /==(.+?)==/,
    // 匹配数学公式
    math: /^\$\$([\s\S]+?)\$\$$/,

    // 匹配链接
    link: /\[(.+?)\]\((.+?)\)/,
    // 匹配图片
    image: /!\[(.+?)\]\((.+?)\)/,
    // 匹配引用
    blockquote: /^>\s+(.+)$/,
    // 匹配列表项
    list: /^(-|\*|\d+\.)\s+(.+)$/,
    // 匹配代码块：```语言\n多行内容\n```
    codeBlock: /^```(\w*)\n([\s\S]+?)\n```$/,
    // 匹配行内代码
    inlineCode: /`(.+?)`/,
    // 匹配分割线：--- 或 *** 或 ___
    hr: /^([-*_]){3,}$/,
  },
}
