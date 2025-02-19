// inlineRenderer.ts
import { escapeHtml } from './utils/index'

export class RendererText {
  render(ast: any): string {
    if (Array.isArray(ast)) {
      return ast.map((node) => this.renderNode(node)).join('\n')
    }
    return this.renderNode(ast)
  }

  renderNode(node: any): string {
    if (!node) return ''

    switch (node.type) {
      case 'document':
      case 'paragraph':
        return `<p>${this.renderChildren(node.children)}</p>`

      case 'heading':
        return `<h${node.depth}>${this.renderChildren(node.children)}</h${node.depth}>`

      case 'text':
        return node.value || ''

      case 'blockquote':
        return `<blockquote>${this.renderChildren(node.children)}</blockquote>`

      case 'list':
        const tag = node.ordered ? 'ol' : 'ul'
        return `<${tag}>${this.renderChildren(node.children)}</${tag}>`

      case 'listItem':
        return `<li>${this.renderChildren(node.children)}</li>`

      case 'code':
        return `<pre><code${node.lang ? ` class="language-${node.lang}"` : ''}>${node.value}</code></pre>`

      case 'inlineCode':
        return `<code>${node.value}</code>`

      default:
        console.warn(`Unknown node type: ${node.type}`)
        return ''
    }
  }

  private renderChildren(children: any[]): string {
    if (!children) return ''
    return children.map((child) => this.renderNode(child)).join('')
  }
}

export function renderDocument(document: any): string {
  if (Array.isArray(document)) {
    return document.map(renderNode).join('')
  } else {
    return escapeHtml(document)
  }
}

function renderNode(node: any): string {
  switch (node.type) {
    case 'text':
      return escapeHtml(node.content)

    case 'bold':
      return `<strong>${renderDocument(node.content)}</strong>`

    case 'italic':
      return `<em>${renderDocument(node.content)}</em>`

    case 'strikethrough':
      return `<del>${renderDocument(node.content)}</del>`

    case 'underline':
      return `<u>${renderDocument(node.content)}</u>`

    case 'subscript':
      return `<sub>${renderDocument(node.content)}</sub>`

    case 'superscript':
      return `<sup>${renderDocument(node.content)}</sup>`

    case 'inlineCode':
      return `<code>${escapeHtml(node.content)}</code>`

    case 'highlight':
      return `<mark>${renderDocument(node.content)}</mark>`

    default:
      console.warn(`Unknown inline node type: ${node.type}`)
      return escapeHtml(node.content)
  }
}
