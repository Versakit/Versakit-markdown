// types.ts
export interface Rules {
  markdown: {
    heading: RegExp
    bold: RegExp
    italic: RegExp
    strikethrough: RegExp
    superscript: RegExp
    subscript: RegExp
    link: RegExp
    image: RegExp
    blockquote: RegExp
    list: RegExp
    codeBlock: RegExp
    inlineCode: RegExp
    hr: RegExp
    table: RegExp
    taskList: RegExp
    footnote: {
      reference: RegExp
      definition: RegExp
    }
    highlight: RegExp
    checkbox: RegExp
    mathBlock: RegExp
    inlineMath: RegExp
    toc: RegExp
    admonition: RegExp
    timeline: RegExp
    underline: RegExp // 添加 underline 属性
  }
}

export interface ASTNode {
  type: string
  children?: ASTNode[]
  depth?: number
  content?: string | InlineToken[]
  lang?: string
  ordered?: boolean
  start?: number
  checked?: boolean
  label?: string
  align?: string[]
  rows?: string[][]
  headers?: string[]
  valign?: string[]
}

export interface InlineToken {
  type: string
  content?: string
  text?: string
  url?: string
  alt?: string
  src?: string
}
