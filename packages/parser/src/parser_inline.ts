import Ruler from './ruler'
import Token from './token'
import { bold, italic } from './rules_inline'

export class ParserInline {
  ruler: Ruler

  constructor() {
    this.ruler = new Ruler()

    // 注册内联规则
    this.ruler.push('bold', bold)
    this.ruler.push('italic', italic)
  }

  parse(str: string, md: any, env: any, outTokens: Token[]): void {
    const rules = this.ruler.getRules('')

    for (let i = 0; i < rules.length; i++) {
      rules[i](str, outTokens, md, env)
    }
  }
}
