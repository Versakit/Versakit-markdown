import { rules } from './rules'
import { InlineToken, InlineTokenType } from './types'

// 定义匹配优先级
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
  { type: 'inlineMath', regex: rules.markdown.inlineMath },
  { type: 'underline', regex: rules.markdown.underline },
  { type: 'inlineCode', regex: rules.markdown.inlineCode },
  { type: 'footnoteReference', regex: rules.markdown.footnoteReference },
]

export class ParserInline {
  parseInline(text: string): InlineToken[] {
    const tokens: InlineToken[] = []
    let index = 0
    const length = text.length

    // 主扫描循环
    while (index < length) {
      let bestMatch: {
        type: InlineTokenType
        start: number
        end: number
        groups: string[]
      } | null = null

      // 寻找优先级最高的匹配
      for (const { type, regex } of INLINE_RULES) {
        regex.lastIndex = index
        const match = regex.exec(text)
        if (match && match.index >= index) {
          const start = match.index
          const end = start + match[0].length
          if (!bestMatch || start < bestMatch.start) {
            bestMatch = {
              type,
              start,
              end,
              groups: match.slice(1),
            }
          }
        }
      }

      if (bestMatch) {
        // 处理前面的普通文本
        if (bestMatch.start > index) {
          tokens.push({
            type: 'text',
            value: text.slice(index, bestMatch.start),
          })
        }

        // 处理匹配到的语法
        tokens.push(this.processToken(bestMatch.type, bestMatch.groups))

        // 更新索引
        index = bestMatch.end
      } else {
        // 处理剩余文本
        tokens.push({
          type: 'text',
          value: text.slice(index),
        })
        break
      }
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
      case 'footnoteReference':
        return {
          type: 'footnoteReference',
          label: groups[0] || '',
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
