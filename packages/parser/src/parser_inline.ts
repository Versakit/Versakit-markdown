import { rules } from './ruler'
import { InlineToken } from './types'

export class ParserInline {
  parseInline(text: string): InlineToken[] {
    const result: InlineToken[] = []
    let remainingText = text

    while (remainingText) {
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
        { rule: rules.markdown.table.header, type: 'table' },
      ]
        .map(({ rule, type }) => {
          const match = remainingText.match(rule)
          return match ? { match, type, index: match.index! } : null
        })
        .filter((m): m is NonNullable<typeof m> => m !== null)

      // 如果没有匹配，保存剩余文本并退出
      if (matches.length === 0) {
        result.push({ type: 'text', content: remainingText })
        break
      }

      // 找到最早的匹配
      matches.sort((a, b) => a.index - b.index)
      const firstMatch = matches[0]

      const before = remainingText.slice(0, firstMatch.index)
      const after = remainingText.slice(
        firstMatch.index + firstMatch.match[0].length,
      )

      // 保存前面的普通文本
      if (before) {
        result.push({ type: 'text', content: before })
      }

      // 根据匹配类型生成节点
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

      // 更新剩余文本
      remainingText = after
    }

    return result
  }
}
