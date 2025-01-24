// Renderer.ts
import { renderDocument } from './inlineRenderer'

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
        return `<h${node.depth}>${renderDocument(node.content)}</h${node.depth}>`

      case 'paragraph':
        return `<p>${renderDocument(node.content)}</p>`

      case 'blockquote':
        return `<blockquote>${this.renderNode(node.content)}</blockquote>`

      case 'text':
        return renderDocument(node.content)

      case 'inlineCode':
        return `<code>${renderDocument(node.content)}</code>`

      case 'strikethrough':
        return `<del>${renderDocument(node.content)}</del>`

      case 'underline':
        return `<u>${renderDocument(node.content)}</u>`

      case 'subscript':
        return `<sub>${renderDocument(node.content)}</sub>`

      case 'superscript':
        return `<sup>${renderDocument(node.content)}</sup>`

      case 'checkboxUnchecked':
        return `<input type="checkbox" disabled> ${renderDocument(node.content)}`

      case 'checkboxChecked':
        return `<input type="checkbox" checked disabled> ${renderDocument(node.content)}`

      case 'highlight':
        return `<mark>${renderDocument(node.content)}</mark>`

      case 'hr':
        return `<hr>`

      case 'image':
        return `<img src="${node.src}" alt="${node.alt}">`

      case 'link':
        return `<a href="${node.url}">${node.text}</a>`

      default:
        console.warn(`Unknown node type: ${node.type}`)
        return ''
    }
  }
}

export default MarkDownRenderer
