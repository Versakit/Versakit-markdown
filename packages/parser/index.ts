import ParserCore from './src/parser_core'
import { ParserBlock } from './src/parser_block'
import { ParserInline } from './src/parser_inline'
import { ASTNode } from './src/types'
import Token from './src/token'

/**
 * Parser 是一个用于解析 Markdown 文本的类型库。
 * 它将原始的 Markdown 文本解析为一个抽象语法树（AST）。
 *
 * @class Parser
 * @example
 * const parser = new Parser()
 * const ast = parser.parseMarkdown(markdownText)
 * console.log(ast)
 */

class Parser {
  core: ParserCore
  block: ParserBlock
  inline: ParserInline

  constructor() {
    this.core = new ParserCore()
    this.block = new ParserBlock()
    this.inline = new ParserInline()
  }

  parseMarkdown(text: string): ASTNode[] {
    // 修改方法名从 parserMarkdown 到 parseMarkdown
    const env = {}
    const tokens: Token[] = []

    // 初始化state
    const state = new this.core.State(text, this, env)

    // 使用core处理器处理文本
    this.core.process(state)

    // 将tokens转换为AST
    return this.tokensToAST(state.tokens)
  }

  private tokensToAST(tokens: Token[]): ASTNode[] {
    return tokens.map((token) => ({
      type: token.type,
      tag: token.tag,
      content: token.content,
      children: token.children ? this.tokensToAST(token.children) : undefined,
      attrs: token.attrs
        ? Object.fromEntries(token.attrs.map(([k, v]) => [k, v]))
        : undefined,
    }))
  }
}

// 创建默认导出
export default Parser
