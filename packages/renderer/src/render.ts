// Renderer.ts
import { renderInline } from './inlineRenderer'

class MarkDownRenderer {
  render(ast: any): string {
    return this.renderNode(ast)
  }

  renderNode(node: any): string {
    switch (node.type) {
      case 'document':
        return node.children
          .map((child: any) => this.renderNode(child))
          .join('\n')

      case 'heading':
        if (node.depth > 3) {
          node.depth = 3
        }
        return `<h${node.depth}>${renderInline(node.content)}</h${node.depth}>`

      case 'paragraph':
        return `<p>${renderInline(node.content)}</p>`

      case 'text':
        return renderInline(node.content)

      default:
        return ''
    }
  }
}

export default MarkDownRenderer
