export class Renderer {
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
        return `<h${node.depth}>${this.renderInline(node.content)}</h${node.depth}>`
      case 'paragraph':
        return `<p>${this.renderInline(node.content)}</p>`
      case 'blockquote':
        return `<blockquote>${this.renderInline(node.content)}</blockquote>`
      case 'list':
        const tag = node.ordered ? 'ol' : 'ul'
        return `<${tag}><li>${this.renderInline(node.content)}</li></${tag}>`
      case 'code':
        return `<pre><code${node.lang ? ` class="language-${node.lang}"` : ''}>${this.escapeHtml(node.content)}</code></pre>`
      case 'hr':
        return '<hr>'
      default:
        return ''
    }
  }

  renderInline(tokens: any): string {
    if (typeof tokens === 'string') {
      return this.escapeHtml(tokens)
    }
    return tokens
      .map((token: any) => {
        if (typeof token === 'string') {
          return this.escapeHtml(token)
        }
        switch (token.type) {
          case 'bold':
            return `<strong>${this.escapeHtml(token.content)}</strong>`
          case 'italic':
            return `<em>${this.escapeHtml(token.content)}</em>`
          case 'link':
            return `<a href="${this.escapeHtml(token.url)}">${this.escapeHtml(token.text)}</a>`
          case 'image':
            return `<img src="${this.escapeHtml(token.src)}" alt="${this.escapeHtml(token.alt)}">`
          case 'inlineCode':
            return `<code>${this.escapeHtml(token.content)}</code>`
          default:
            return ''
        }
      })
      .join('')
  }

  escapeHtml(text: string): string {
    const escapeMap: { [key: string]: string } = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    }
    return text.replace(/[&<>"']/g, (char: string) => escapeMap[char])
  }
}
