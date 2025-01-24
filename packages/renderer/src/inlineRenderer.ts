// inlineRenderer.ts
import { escapeHtml } from './utils/index'

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
