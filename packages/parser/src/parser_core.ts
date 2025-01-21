/**
 * ParserCore 是一个将markdown文本进行解析前的预处理类
 *
 */
import Ruler from './ruler'
import StateCore from './rules_core/state_core'

import r_normalize from './rules_core/normalize'
import r_block from './rules_core/block'
import r_inline from './rules_core/inline'

const _rules: [string, Function][] = [
  ['normalize', r_normalize],
  ['block', r_block],
  ['inline', r_inline],
]

class Core {
  ruler: Ruler

  constructor() {
    this.ruler = new Ruler()
    for (let i = 0; i < _rules.length; i++) {
      this.ruler.push(_rules[i][0], _rules[i][1])
    }
  }

  process(state: any): void {
    const rules = this.ruler.getRules('')

    for (let i = 0, l = rules.length; i < l; i++) {
      rules[i](state)
    }
  }

  State = StateCore
}

export default Core
