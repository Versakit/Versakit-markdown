import { rules } from './rules'
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
    // 处理删除线
    currentText = currentText.replace(
      rules.markdown.strikethrough,
      (_, content) => {
        tokens.push({ type: 'strikethrough', content })
        return ''
      },
    )
    // 处理下划线
    currentText = currentText.replace(
      rules.markdown.underline,
      (_, content) => {
        tokens.push({ type: 'underline', content })
        return ''
      },
    )
    // 处理高亮
    currentText = currentText.replace(
      rules.markdown.highlight,
      (_, content) => {
        tokens.push({ type: 'highlight', content })
        return ''
      },
    )
    // 处理上标
    currentText = currentText.replace(
      rules.markdown.superscript,
      (_, content) => {
        tokens.push({ type: 'superscript', content })
        return ''
      },
    )
    // 处理下标
    currentText = currentText.replace(
      rules.markdown.subscript,
      (_, content) => {
        tokens.push({ type: 'subscript', content })
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
