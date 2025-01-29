import { Parser } from './src/parser_core'
import { rules } from './src/ruler'

// 同时提供具名导出和默认导出
export { Parser, rules }

// 默认导出
export default {
  Parser,
  rules,
}
