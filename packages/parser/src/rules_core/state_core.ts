/**
 * ParserStateCore 是一个用于解析 markdown 文本的状态机对象。
 */
import Token from '../token'

class StateCore {
  src: string
  env: any
  tokens: Token[]
  inlineMode: boolean
  md: any
  Token: typeof Token
  constructor(src: string, md: any, env: any) {
    this.src = src
    this.env = env
    this.tokens = []
    this.inlineMode = false
    this.md = md
    this.Token = Token
  }
}

export default StateCore
