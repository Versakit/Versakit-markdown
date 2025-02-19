export interface Rules {
  markdown: {
    heading: RegExp
    bold: RegExp
    italic: RegExp

    strikethrough: RegExp
    underline: RegExp
    subscript: RegExp
    superscript: RegExp
    audio: RegExp
    checkboxUnchecked: RegExp
    checkboxChecked: RegExp
    highlight: RegExp
    math: RegExp
    table: {
      header: RegExp
      separator: RegExp
      row: RegExp
    }

    link: RegExp
    image: RegExp
    blockquote: RegExp
    list: RegExp
    codeBlock: RegExp
    inlineCode: RegExp
    hr: RegExp
  }
}

// 修改 ASTNode 接口以匹配 renderer 需求
export interface ASTNode {
  type: string
  children?: ASTNode[]
  depth?: number
  value?: string
  ordered?: boolean
  url?: string
  title?: string
  alt?: string
  lang?: string
}

// 移除不再需要的接口
export type Node = ASTNode
