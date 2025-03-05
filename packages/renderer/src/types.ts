// 添加类型定义
export interface MarkdownNode {
  type:
    | 'root'
    | 'heading'
    | 'paragraph'
    | 'text'
    | 'list'
    | 'listItem'
    | 'emphasis'
    | 'strong'
    | 'bold' // 添加 bold 类型
    | 'link'
    | 'image'
    | 'code'
    | 'inlineCode'
    | 'blockquote' // 添加 blockquote 类型
    | 'italic' // 添加 italic 类型
    | 'underline' // 添加 underline 类型
    | 'highlight' // 添加 highlight 类型
    | 'strikethrough' // 确保这些类型都被包含在联合类型中
    | 'subscript'
    | 'superscript'
    | 'math'
    | 'hr'
    | 'audio'
    | 'table' // 添加表格相关类型
    | 'tableRow'
    | 'tableCell'
  children?: MarkdownNode[]
  depth?: number
  value?: string
  ordered?: boolean
  url?: string
  title?: string
  alt?: string
  el?: HTMLElement | Text
  lang?: string // 添加代码块语言类型
  headers?: string[] // 添加表格headers
  alignments?: ('left' | 'center' | 'right')[] // 添加对齐方式
  isHeader?: boolean // 表格单元格是否是表头
}

export interface RendererOptions {
  ast: MarkdownNode[]
  container?: string | HTMLElement
}

export interface Change {
  type: 'add' | 'remove'
  content: string
  index: number
}
