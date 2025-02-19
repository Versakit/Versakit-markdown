// 添加类型定义
export interface MarkdownNode {
  type: string
  children?: MarkdownNode[]
  depth?: number
  value?: string
  ordered?: boolean
  url?: string
  title?: string
  alt?: string
  el?: HTMLElement
  lang?: string // 添加代码块语言类型
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
