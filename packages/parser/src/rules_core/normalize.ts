/**
 * normalize.ts
 *
 * 这是一个用于对文本进行标准化处理的工具函数。
 * 识别换行符并将其标准化为 '\n'。
 * 识别空字符并将其删除。
 */

const NEWLINE_RE = /\r\n?|\n/g
const NULL_RE = /\0/g

export default function normalize(text: string): string {
  return text.replace(NEWLINE_RE, '\n').replace(NULL_RE, '')
}
