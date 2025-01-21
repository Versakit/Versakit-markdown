export interface ASTNode {
  type: string
  tag?: string
  content?: string
  children?: ASTNode[]
  attrs?: { [key: string]: string }
  marks?: string[]
}
