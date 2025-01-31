import { rules } from './rules'
import { InlineToken, InlineTokenType } from './types'

export class ParserInline {
  parseInline(text: string): InlineToken[] {
    const tokens: InlineToken[] = []
    let currentText = text

    // 递归处理匹配和插入标记
    const matchAndPush = (regex: RegExp, type: InlineTokenType) => {
      let match
      while ((match = regex.exec(currentText))) {
        console.log(
          `Matched: ${match[0]}, Type: ${type}, match[1]: ${match[1]}`,
        )

        switch (type) {
          case 'strikethrough':
          case 'bold':
          case 'italic':
          case 'inlineCode':
          case 'underline':
          case 'highlight':
          case 'superscript':
          case 'subscript':
            // 处理标记内容
            const content = match[1] ? this.parseInline(match[1]) : match[0]
            tokens.push({
              type,
              content,
            })
            break
          case 'image':
            tokens.push({
              type: 'image',
              alt: match[1] ?? '',
              url: match[2] ?? '',
            })
            break
          case 'footnoteReference':
          case 'link':
            tokens.push({
              type,
              text: match[1] ?? '',
              url: match[2] ?? '',
            })
            break
        }

        // 更新当前文本，移除已经匹配的部分
        currentText =
          currentText.slice(0, match.index) +
          currentText.slice(match.index + match[0].length)
      }
    }

    // 先处理链接和图片
    const linkImageRegexs = [
      { regex: rules.markdown.link, type: 'link' as InlineTokenType },
      { regex: rules.markdown.image, type: 'image' as InlineTokenType },
    ]

    // 逐个匹配处理链接和图片
    for (const { regex, type } of linkImageRegexs) {
      matchAndPush(regex, type)
    }

    // 然后处理其他内联元素
    const regexs = [
      {
        regex: rules.markdown.strikethrough,
        type: 'strikethrough' as InlineTokenType,
      },
      { regex: rules.markdown.bold, type: 'bold' as InlineTokenType },
      { regex: rules.markdown.italic, type: 'italic' as InlineTokenType },
      {
        regex: rules.markdown.inlineCode,
        type: 'inlineCode' as InlineTokenType,
      },
      { regex: rules.markdown.underline, type: 'underline' as InlineTokenType },
      { regex: rules.markdown.highlight, type: 'highlight' as InlineTokenType },
      {
        regex: rules.markdown.superscript,
        type: 'superscript' as InlineTokenType,
      },
      { regex: rules.markdown.subscript, type: 'subscript' as InlineTokenType },
      {
        regex: rules.markdown.footnoteReference,
        type: 'footnoteReference' as InlineTokenType,
      },
    ]

    // 逐个匹配处理其他标记
    while (currentText.trim()) {
      let matched = false

      for (const { regex, type } of regexs) {
        const match = regex.exec(currentText)
        if (match) {
          matchAndPush(regex, type) // 递归处理匹配到的标记
          matched = true
          break // 处理完一个标记后，跳出当前循环
        }
      }

      // 如果没有匹配到任何标记，就处理普通文本
      if (!matched) {
        tokens.push({ type: 'text', content: currentText.trim() })
        break
      }
    }

    return tokens
  }
}
