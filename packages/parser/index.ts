import { ParserCore } from './src/parser_core'
import { ParserBlock } from './src/parser_block'
import { ParserInline } from './src/parser_inline'
import { rules } from './src/rules'
// 导入 ASTNode 类型
import { ASTNode } from './src/types'

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
  parserMarkdown(text: string): ASTNode {
    // 初始化ParserCore实例
    const parserCore = new ParserCore()
    // 将原始的text交给ParserCore进行预处理
    const tokens = parserCore.preprocess(text)
  }
}

// 创建默认导出
export default {
  Parser,
  rules,
}
