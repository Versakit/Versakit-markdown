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

export interface ASTNode {
  type: string
  children?: ASTNode[]
  depth?: number
  content?: string | InlineToken[]
  lang?: string
  ordered?: boolean
}

export interface InlineToken {
  type: string
  content?: string
  text?: string
  url?: string
  alt?: string
  src?: string
}
