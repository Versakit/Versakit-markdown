import { rules } from './rules'
import { ASTNode, InlineToken } from './types'

export class Parser {
  parseMarkdown(text: string): ASTNode {
    const lines = text.split('\n')
    const ast: ASTNode = {
      type: 'document',
      children: [],
    }

    let currentParagraph: string[] = []
    let inCodeBlock = false
    let codeBlockContent: string[] = []
    let codeBlockLang = ''

    const processParagraph = () => {
      if (currentParagraph.length > 0) {
        ast.children?.push({
          type: 'paragraph',
          content: this.parseInline(currentParagraph.join(' ').trim()),
        })
        currentParagraph = []
      }
    }

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()

      // 处理代码块
      if (rules.markdown.codeBlock.test(line) && !inCodeBlock) {
        const [, lang] = line.match(rules.markdown.codeBlock) || []
        inCodeBlock = true
        codeBlockLang = lang
        continue
      }
      if (inCodeBlock) {
        if (line === '```') {
          ast.children?.push({
            type: 'codeBlock',
            content: codeBlockContent.join('\n'),
            lang: codeBlockLang,
          })
          inCodeBlock = false
          codeBlockContent = []
          continue
        }
        codeBlockContent.push(line)
        continue
      }

      // 处理标题
      if (rules.markdown.heading.test(line)) {
        processParagraph()
        const [, level, content] = line.match(rules.markdown.heading) || []
        ast.children?.push({
          type: 'heading',
          depth: level.length,
          content: this.parseInline(content),
        })
        continue
      }

      // 处理引用
      if (rules.markdown.blockquote.test(line)) {
        processParagraph()
        const [, content] = line.match(rules.markdown.blockquote) || []
        ast.children?.push({
          type: 'blockquote',
          content: this.parseInline(content),
        })
        continue
      }

      // 处理列表
      if (rules.markdown.list.test(line)) {
        processParagraph()
        const [, marker, content] = line.match(rules.markdown.list) || []
        ast.children?.push({
          type: 'listItem',
          ordered: /^\d+\./.test(marker),
          content: this.parseInline(content),
        })
        continue
      }

      // 处理分割线
      if (rules.markdown.hr.test(line)) {
        processParagraph()
        ast.children?.push({ type: 'hr' })
        continue
      }

      // 处理段落
      if (line === '') {
        processParagraph()
      } else {
        currentParagraph.push(line)
      }
    }

    // 处理最后的段落
    processParagraph()

    return ast
  }

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
