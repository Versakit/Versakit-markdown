/**
 * ParserStateCore 是一个用于解析 markdown 文本的状态机对象。
 */
import type { InlineToken } from '../types'

export class ParserStateCore {
  src: string
  tokens: InlineToken[]
  inlineMode: boolean
  constructor(src: string) {
    this.src = src
    this.tokens = []
    this.inlineMode = false
  }
}
