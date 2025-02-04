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
    audio: RegExp
    footnoteDefinition: RegExp
  }
}

export interface ASTNode {
  type: string
  children?: ASTNode[]
  depth?: number
  lang?: string
  value?: string
  ordered?: boolean // 添加有序列表标识
  checked?: boolean
  label?: string
  align?: string[]
  rows?: string[][]
  headers?: string[]
  valign?: string[]
  admonitionType?: string
  title?: string
  year?: string
}

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
  | 'footnoteReference'
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
    audio: RegExp
    footnoteDefinition: RegExp
  }
}
