import { rules } from './ruler'
import { ASTNode } from './types'
import { ParserInline } from './parser_inline'

export class ParserBlock {
  private inlineParser: ParserInline

  constructor() {
    this.inlineParser = new ParserInline()
  }

  parseBlocks(lines: string[]): ASTNode[] {
    const blocks: ASTNode[] = []
    let currentParagraph: string[] = []

    const processParagraph = () => {
      if (currentParagraph.length > 0) {
        blocks.push({
          type: 'paragraph',
          content: this.inlineParser.parseInline(
            currentParagraph.join(' ').trim(),
          ),
        })
        currentParagraph = []
      }
    }

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()

      //处理代码块
      if (line.trim().startsWith('```')) {
        const lang = line.trim().slice(3)
        const codeContent = []
        i++

        // 收集代码块内容直到遇到结束标记
        while (i < lines.length && !lines[i].trim().startsWith('```')) {
          codeContent.push(lines[i])
          i++
        }

        blocks.push({
          type: 'code',
          lang: lang,
          content: codeContent.join('\n'),
        })

        continue
      }

      // 处理标题
      if (rules.markdown.heading.test(line)) {
        processParagraph()
        const [, level, content] = line.match(rules.markdown.heading) || []
        blocks.push({
          type: 'heading',
          depth: level.length,
          content: this.inlineParser.parseInline(content),
        })
        continue
      }

      // 处理引用
      if (rules.markdown.blockquote.test(line)) {
        processParagraph()
        const [, content] = line.match(rules.markdown.blockquote) || []
        blocks.push({
          type: 'blockquote',
          content: this.inlineParser.parseInline(content),
        })
        continue
      }

      // 处理列表
      if (
        rules.markdown.checkboxUnchecked.exec(line) &&
        rules.markdown.checkboxChecked.exec(line) &&
        rules.markdown.list.test(line)
      ) {
        processParagraph()
        const [, marker, content] = line.match(rules.markdown.list) || []
        blocks.push({
          type: 'listItem',
          ordered: /^\d+\./.test(marker),
          content: this.inlineParser.parseInline(content),
        })
        continue
      }

      // 处理分割线
      if (rules.markdown.hr.test(line)) {
        processParagraph()
        blocks.push({ type: 'hr' })
        continue
      }

      // 处理块级数学公式
      if (rules.markdown.math.test(line)) {
        processParagraph()
        const [, content] = line.match(rules.markdown.math) || []
        blocks.push({
          type: 'math',
          content: this.inlineParser.parseInline(content),
        })
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

    return blocks
  }
}
