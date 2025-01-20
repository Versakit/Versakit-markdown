import Ruler from './ruler'
import Token from './token'
import { heading, paragraph, blockquote } from './rules_block'

export class ParserBlock {
  ruler: Ruler

  constructor() {
    this.ruler = new Ruler()

    // 注册块级规则
    this.ruler.push('heading', heading)
    this.ruler.push('blockquote', blockquote)
    this.ruler.push('paragraph', paragraph) // 段落规则放最后
  }

  parse(src: string, md: any, env: any, outTokens: Token[]): void {
    const rules = this.ruler.getRules('')
    let line = 0
    let len = src.length

    while (line < len) {
      // 获取当前行
      let pos = src.indexOf('\n', line)
      if (pos === -1) pos = len

      const lineText = src.slice(line, pos)

      // 应用所有规则
      for (let i = 0; i < rules.length; i++) {
        if (rules[i](lineText, outTokens, md, env)) {
          break
        }
      }

      line = pos + 1
    }
  }
}
