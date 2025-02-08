import { rules } from './ruler'
import type { InlineToken, InlineTokenType } from './types'

// 定义内联规则
const INLINE_RULES: { type: InlineTokenType; regex: RegExp }[] = [
  { type: 'audio', regex: rules.markdown.audio },
  { type: 'image', regex: rules.markdown.image },
  { type: 'italic', regex: rules.markdown.italic },
  { type: 'bold', regex: rules.markdown.bold },
  { type: 'highlight', regex: rules.markdown.highlight },
  { type: 'inlineCode', regex: rules.markdown.inlineCode },
  { type: 'strikethrough', regex: rules.markdown.strikethrough },
  { type: 'superscript', regex: rules.markdown.superscript },
  { type: 'subscript', regex: rules.markdown.subscript },
  { type: 'link', regex: rules.markdown.link },
  { type: 'underline', regex: rules.markdown.underline },
  { type: 'inlineCode', regex: rules.markdown.inlineCode },
]

export class ParserInline {
  parseInline(text: string): InlineToken[] {
    const tokens: InlineToken[] = []
    let remainingText = text

    while (remainingText) {
      let earliestMatch: {
        type: InlineTokenType
        index: number
        match: RegExpExecArray
      } | null = null

      // 优先处理加粗标记
      const boldRegex = rules.markdown.bold
      boldRegex.lastIndex = 0
      const boldMatch = boldRegex.exec(remainingText)

      if (boldMatch) {
        earliestMatch = {
          type: 'bold',
          index: boldMatch.index,
          match: boldMatch,
        }
      }

      // 如果没有找到加粗，再检查其他标记
      if (!earliestMatch) {
        for (const { type, regex } of INLINE_RULES.filter(
          (r) => r.type !== 'bold',
        )) {
          regex.lastIndex = 0
          const match = regex.exec(remainingText)
          if (match && (!earliestMatch || match.index < earliestMatch.index)) {
            earliestMatch = { type, index: match.index, match }
          }
        }
      }

      if (!earliestMatch) {
        // 没有找到任何匹配,将剩余文本作为普通文本
        tokens.push({ type: 'text', value: remainingText })
        break
      }

      // 处理匹配前的文本
      if (earliestMatch.index > 0) {
        tokens.push({
          type: 'text',
          value: remainingText.slice(0, earliestMatch.index),
        })
      }

      // 处理匹配的标记
      const matchedContent = earliestMatch.match[1] // 匹配的内容
      const fullMatch = earliestMatch.match[0] // 完整的匹配字符串

      // 根据类型创建相应的token
      switch (earliestMatch.type) {
        case 'bold':
          tokens.push({
            type: 'bold',
            children: this.parseInline(matchedContent), // 递归解析加粗内容中的其他标记
          })
          break

        // ...处理其他类型...

        default:
          tokens.push(this.processToken(earliestMatch.type, [matchedContent]))
      }

      // 更新剩余文本
      remainingText = remainingText.slice(
        earliestMatch.index + fullMatch.length,
      )
    }

    return tokens
  }

  private processToken(type: InlineTokenType, groups: string[]): InlineToken {
    switch (type) {
      case 'image':
        return {
          type: 'image',
          alt: groups[0] || '',
          url: groups[1] || '',
        }

      case 'link':
        return {
          type: 'link',
          url: groups[1] || '',
          children: this.parseInline(groups[0] || ''),
        }

      case 'inlineCode':
        return {
          type: 'inlineCode',
          value: groups[0] || '',
        }

      case 'bold':
      case 'italic':
      case 'strikethrough':
        return {
          type,
          children: this.parseInline(groups[0]),
        }
      case 'underline':
      case 'highlight':
        return {
          type: 'highlight',
          children: this.parseInline(groups[0]),
        }
      case 'superscript':
      case 'subscript':
        return {
          type,
          children: this.parseInline(groups[0] || ''),
        }
      case 'inlineMath':
        return {
          type: 'inlineMath',
          value: groups[0],
        }
      case 'audio':
        return {
          type: 'audio',
          alt: groups[0],
          url: groups[1],
        }
      default:
        return { type: 'text', value: groups[0] || '' }
    }
  }
}
