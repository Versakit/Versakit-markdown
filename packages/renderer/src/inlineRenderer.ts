// inlineRenderer.ts
import { escapeHtml } from './utils/index'

export function renderInline(tokens: any): string {
  if (typeof tokens === 'string') {
    return escapeHtml(tokens)
  }
  return tokens
    .map((token: any) => {
      if (typeof token === 'string') {
        return escapeHtml(token)
      }
      switch (token.type) {
        case 'bold':
          return `<strong>${escapeHtml(token.content)}</strong>`
        case 'italic':
          return `<em>${escapeHtml(token.content)}</em>`
        default:
          return escapeHtml(token.content)
      }
    })
    .join('')
}
