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
    image: RegExp
    underline: RegExp
    footnoteReference: RegExp // 添加脚注引用
    highlight: RegExp
    mathBlock: RegExp
    inlineMath: RegExp
    toc: RegExp
    admonition: RegExp
    timeline: RegExp
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
// types.ts

export type InlineTokenType =
  | 'bold'
  | 'italic'
  | 'strikethrough'
  | 'inlineCode'
  | 'underline'
  | 'highlight'
  | 'superscript'
  | 'subscript'
  | 'text'
  | 'link'
  | 'image'
  | 'footnoteReference'

export interface InlineToken {
  type: InlineTokenType
  content?: string | InlineToken[] // 用于嵌套解析的标记
  text?: string // 对于链接、图片、脚注引用类型
  url?: string // 对于链接、图片、脚注引用类型
  alt?: string // 对于图片类型
  src?: string // 对于图片类型
}

export interface Rules {
  markdown: {
    heading: RegExp
    bold: RegExp
    italic: RegExp
    strikethrough: RegExp
    superscript: RegExp
    subscript: RegExp
    link: RegExp
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
    image: RegExp
    underline: RegExp
    footnoteReference: RegExp
    highlight: RegExp
    mathBlock: RegExp
    inlineMath: RegExp
    toc: RegExp
    admonition: RegExp
    timeline: RegExp
  }
}
