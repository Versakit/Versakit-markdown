import Token from '../token'

// 标题规则
export function heading(
  str: string,
  tokens: Token[],
  md: any,
  env: any,
): boolean {
  const match = str.match(/^(#{1,6})\s+(.+)$/)
  if (match) {
    const level = match[1].length
    const content = match[2]
    const token = new Token('heading', `h${level}`, 0)
    token.content = content
    token.level = level - 1
    tokens.push(token)
    return true
  }
  return false
}

// 段落规则
export function paragraph(
  str: string,
  tokens: Token[],
  md: any,
  env: any,
): boolean {
  if (str.trim()) {
    const token = new Token('paragraph', 'p', 0)
    token.content = str.trim()
    tokens.push(token)
    return true
  }
  return false
}

// 引用规则
export function blockquote(
  str: string,
  tokens: Token[],
  md: any,
  env: any,
): boolean {
  const match = str.match(/^>\s+(.+)$/)
  if (match) {
    const token = new Token('blockquote', 'blockquote', 0)
    token.content = match[1]
    tokens.push(token)
    return true
  }
  return false
}
