import { Parser } from './src/parser_core'
import { rules } from './src/ruler'

// 导出 Parser 类
export { Parser }
export { rules }

// 为了兼容 UMD 格式，添加默认导出
export default Parser
