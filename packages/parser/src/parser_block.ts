import { rules } from './rules'
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
    let inCodeBlock = false
    let codeBlockContent: string[] = []
    let codeBlockLang = ''

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

      // 处理代码块
      if (rules.markdown.codeBlock.test(line) && !inCodeBlock) {
        const [, lang] = line.match(rules.markdown.codeBlock) || []
        inCodeBlock = true
        codeBlockLang = lang
        continue
      }
      if (inCodeBlock) {
        if (line === '```') {
          blocks.push({
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
      if (rules.markdown.list.test(line)) {
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
