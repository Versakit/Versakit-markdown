import { rules } from './ruler'
import type { InlineToken, InlineTokenType } from './types'

// 定义内联规则
const INLINE_RULES: { type: InlineTokenType; regex: RegExp }[] = [
  { type: 'audio', regex: rules.markdown.audio },
  { type: 'image', regex: rules.markdown.image },
  { type: 'bold', regex: rules.markdown.bold },
  { type: 'italic', regex: rules.markdown.italic }, // 将斜体规则提前，确保优先级
  { type: 'highlight', regex: rules.markdown.highlight },
  { type: 'inlineCode', regex: rules.markdown.inlineCode },
  { type: 'strikethrough', regex: rules.markdown.strikethrough },
  { type: 'superscript', regex: rules.markdown.superscript },
  { type: 'subscript', regex: rules.markdown.subscript },
  { type: 'link', regex: rules.markdown.link },
  { type: 'underline', regex: rules.markdown.underline },
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

      // 检查所有标记
      for (const { type, regex } of INLINE_RULES) {
        regex.lastIndex = 0
        const match = regex.exec(remainingText)
        if (match && (!earliestMatch || match.index < earliestMatch.index)) {
          earliestMatch = { type, index: match.index, match }
        }
      }

      if (!earliestMatch) {
        tokens.push({ type: 'text', value: remainingText })
        break
      }

      if (earliestMatch.index > 0) {
        tokens.push({
          type: 'text',
          value: remainingText.slice(0, earliestMatch.index),
        })
      }

      const matchGroups = earliestMatch.match.slice(1)
      tokens.push(this.processToken(earliestMatch.type, matchGroups))

      remainingText = remainingText.slice(
        earliestMatch.index + earliestMatch.match[0].length,
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

      case 'italic':
        return {
          type: 'italic',
          children: this.parseInline(groups[0] || ''),
        }

      case 'bold':
      case 'strikethrough':
      case 'underline':
      case 'highlight':
        return {
          type,
          children: this.parseInline(groups[0] || ''),
        }

      case 'inlineCode':
        return {
          type: 'inlineCode',
          value: groups[0] || '',
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
