/**
 * block.ts
 *
 * 这是一个用于处理块级元素的工具函数。
 */
export default function block(state: {
  inlineMode: boolean
  src: string
  Token: { new (type: string, tag: string, nesting: number): any }
  md: {
    block: { parse: (src: string, md: any, env: any, tokens: any[]) => void }
  }
  env: any
  tokens: any[]
}): void {
  let token

  if (state.inlineMode) {
    token = new state.Token('inline', '', 0)
    token.content = state.src
    token.map = [0, 1]
    token.children = []
    state.tokens.push(token)
  } else {
    state.md.block.parse(state.src, state.md, state.env, state.tokens)
  }
}
