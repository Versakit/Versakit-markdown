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
  alignments?: ('left' | 'center' | 'right')[]
  isHeader?: boolean
}

// 移除不再需要的接口
export type Node = ASTNode

export type InlineTokenType =
  | 'text'
  | 'bold'
  | 'italic'
  | 'strikethrough'
  | 'inlineCode'
  | 'link'
  | 'image'
  | 'underline'
  | 'highlight'
  | 'superscript'
  | 'subscript'
  | 'inlineMath'
  | 'audio'

export type InlineToken =
  | { type: 'text'; value: string }
  | { type: 'inlineCode'; value: string }
  | { type: 'image'; alt: string; url: string }
  | { type: 'link'; url: string; children: InlineToken[] }
  | {
      type: Exclude<InlineTokenType, 'text' | 'inlineCode' | 'image' | 'link'>
      children: InlineToken[]
    }
  | { type: 'footnoteReference'; label: string }
  | { type: 'document'; children: ASTNode[] }
  | { type: 'paragraph'; children: InlineToken[] }
  | { type: 'heading'; depth: 1 | 2 | 3 | 4 | 5 | 6; children: InlineToken[] }
  | { type: 'codeBlock'; lang?: string; value: string }
  | { type: 'list'; ordered: boolean; children: ASTNode[] }
  | { type: 'listItem'; children: ASTNode[] }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'hr' }
  | { type: 'blockquote'; children: InlineToken[] }
  | { type: 'parseError'; raw: string; error: string }
  | { type: 'footnoteDefinition'; label: string; children: InlineToken[] }
  | { type: 'admonition'; label: string; children: InlineToken[] }
  | { type: 'timeline'; children: InlineToken[] }
  | { type: 'inlineMath'; value: string }
  | { type: 'audio'; alt: string; url: string }
