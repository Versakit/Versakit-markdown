import Token from '../token'

// 粗体规则
export function bold(str: string, tokens: Token[], md: any, env: any): boolean {
  const regex = /\*\*(.*?)\*\*/g
  let match
  let lastIndex = 0
  const result: Token[] = []

  while ((match = regex.exec(str)) !== null) {
    if (match.index > lastIndex) {
      const textToken = new Token('text', '', 0)
      textToken.content = str.slice(lastIndex, match.index)
      result.push(textToken)
    }

    const boldToken = new Token('bold', 'strong', 0)
    boldToken.content = match[1]
    result.push(boldToken)
    lastIndex = regex.lastIndex
  }

  if (result.length > 0) {
    tokens.push(...result)
    return true
  }
  return false
}

// 斜体规则
export function italic(
  str: string,
  tokens: Token[],
  md: any,
  env: any,
): boolean {
  const regex = /\*(.*?)\*/g
  let match
  let lastIndex = 0
  const result: Token[] = []

  while ((match = regex.exec(str)) !== null) {
    if (match.index > lastIndex) {
      const textToken = new Token('text', '', 0)
      textToken.content = str.slice(lastIndex, match.index)
      result.push(textToken)
    }

    const italicToken = new Token('italic', 'em', 0)
    italicToken.content = match[1]
    result.push(italicToken)
    lastIndex = regex.lastIndex
  }

  if (result.length > 0) {
    tokens.push(...result)
    return true
  }
  return false
}
