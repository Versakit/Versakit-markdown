/**
 * inline.ts
 *
 * 这是一个用于处理行内元素的工具函数。
 */
export default function inline(state: {
  tokens: any[]
  md: {
    inline: {
      parse: (content: string, md: any, env: any, children: any[]) => void
    }
  }
  env: any
}): void {
  const tokens = state.tokens

  for (let i = 0, l = tokens.length; i < l; i++) {
    const tok = tokens[i]
    if (tok.type === 'inline') {
      state.md.inline.parse(tok.content, state.md, state.env, tok.children)
    }
  }
}
