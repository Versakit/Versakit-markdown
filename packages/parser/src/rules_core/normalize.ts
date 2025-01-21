/**
 * normalize.ts
 *
 * 这是一个用于对文本进行标准化处理的工具函数。
 * 识别换行符并将其标准化为 '\n'。
 * 识别空字符并将其删除。
 */

const NEWLINES_RE = /\r\n?|\n/g
const NULL_RE = /\0/g

export default function normalize(state: { src: string }): void {
  let str: string
  str = state.src.replace(NEWLINES_RE, '\n')
  str = str.replace(NULL_RE, '\uFFFD')
  state.src = str
}
