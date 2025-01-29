import { rules } from './ruler'
import type { ASTNode } from './types'

export class ParserInline {
  parseInline(text: string): ASTNode[] {
    const tokens: ASTNode[] = []
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
        tokens.push({ type: 'text', value: remainingText })
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
        tokens.push({ type: 'text', value: before })
      }

      // 根据匹配类型生成节点
      switch (firstMatch.type) {
        case 'link':
          tokens.push({
            type: 'link',
            url: firstMatch.match[2],
            title: firstMatch.match[1],
            children: [
              {
                type: 'text',
                value: firstMatch.match[1],
              },
            ],
          })
          break
        case 'image':
          tokens.push({
            type: 'image',
            url: firstMatch.match[2],
            alt: firstMatch.match[1],
          })
          break
        case 'audio':
          tokens.push({
            type: 'audio',
            url: firstMatch.match[1],
          })
          break
        default:
          tokens.push({
            type: firstMatch.type,
            value: firstMatch.match[1],
          })
      }

      // 更新剩余文本
      remainingText = after
    }

    return tokens
  }
}
