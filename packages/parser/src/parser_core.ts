import { rules } from './ruler'
import { InlineToken } from './types'

export class ParserInline {
  parseInline(text: string): InlineToken[] {
    const tokens: InlineToken[] = []
    let currentText = text

    // 处理图片
    currentText = currentText.replace(rules.markdown.image, (_, alt, src) => {
      tokens.push({ type: 'image', alt, src })
      return ''
    })

    // 处理链接
    currentText = currentText.replace(rules.markdown.link, (_, text, url) => {
      tokens.push({ type: 'link', text, url })
      return ''
    })

    // 处理粗体
    currentText = currentText.replace(rules.markdown.bold, (_, content) => {
      tokens.push({ type: 'bold', content })
      return ''
    })

    // 处理斜体
    currentText = currentText.replace(rules.markdown.italic, (_, content) => {
      tokens.push({ type: 'italic', content })
      return ''
    })

    // 处理行内代码
    currentText = currentText.replace(
      rules.markdown.inlineCode,
      (_, content) => {
        tokens.push({ type: 'inlineCode', content })
        return ''
      },
    )

    // 处理剩余的普通文本
    if (currentText.trim()) {
      tokens.push({ type: 'text', content: currentText.trim() })
    }

    return tokens
  }
}
