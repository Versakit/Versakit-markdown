import { rules } from './ruler'
import { InlineToken } from './types'

export class ParserInline {
  parseInline(text: string): InlineToken[] {
    const processText = (str: string): InlineToken[] => {
      // 检查所有可能的匹配
      const matches = [
        { rule: rules.markdown.image, type: 'image' },
        { rule: rules.markdown.link, type: 'link' },
        { rule: rules.markdown.bold, type: 'bold' },
        { rule: rules.markdown.italic, type: 'italic' },
        { rule: rules.markdown.inlineCode, type: 'inlineCode' },
        { rule: rules.markdown.strikethrough, type: 'strikethrough' },
        { rule: rules.markdown.underline, type: 'underline' },
        { rule: rules.markdown.subscript, type: 'subscript' },
        { rule: rules.markdown.superscript, type: 'superscript' },
        { rule: rules.markdown.audio, type: 'audio' },
        { rule: rules.markdown.checkboxUnchecked, type: 'checkboxUnchecked' },
        { rule: rules.markdown.checkboxChecked, type: 'checkboxChecked' },
        { rule: rules.markdown.highlight, type: 'highlight' },
      ]
        .map(({ rule, type }) => {
          const match = str.match(rule)
          return match ? { match, type, index: match.index! } : null
        })
        .filter((m): m is NonNullable<typeof m> => m !== null)

      // 如果没有匹配，返回原文本
      if (matches.length === 0) {
        return str ? [{ type: 'text', content: str }] : []
      }

      // 找到最早的匹配
      matches.sort((a, b) => a.index - b.index)
      const firstMatch = matches[0]

      const before = str.slice(0, firstMatch.index)
      const after = str.slice(firstMatch.index + firstMatch.match[0].length)

      const result: InlineToken[] = []
      if (before) {
        result.push({ type: 'text', content: before })
      }

      // 根据类型创建节点
      switch (firstMatch.type) {
        case 'link':
          result.push({
            type: 'link',
            text: firstMatch.match[1],
            url: firstMatch.match[2],
          })
          break
        case 'image':
          result.push({
            type: 'image',
            alt: firstMatch.match[1],
            src: firstMatch.match[2],
          })
          break
        case 'audio':
          result.push({
            type: 'audio',
            src: firstMatch.match[1],
          })
          break
        default:
          result.push({
            type: firstMatch.type,
            content: firstMatch.match[1],
          })
      }

      // 递归处理剩余文本
      return result.concat(processText(after))
    }

    return processText(text)
  }
}
