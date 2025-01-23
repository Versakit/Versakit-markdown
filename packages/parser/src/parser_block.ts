import { rules } from './rules'
import { ASTNode } from './types'
import { ParserInline } from './parser_inline'

export class ParserBlock {
  private inlineParser: ParserInline

  constructor() {
    this.inlineParser = new ParserInline()
  }

  parseBlocks(lines: string[]): ASTNode[] {
    const blocks: ASTNode[] = [] // 存储解析后的 AST 节点
    let currentParagraph: string[] = [] // 当前段落的内容
    let inCodeBlock = false // 是否在代码块内
    let codeBlockContent: string[] = [] // 代码块内容
    let codeBlockLang = '' // 代码块语言

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

      // 处理表格
      if (rules.markdown.table.test(line)) {
        processParagraph()
        const tableLines = lines.slice(i).join('\n')
        const tableMatch = tableLines.match(rules.markdown.table)
        if (tableMatch) {
          const [header, rows] = tableMatch.slice(1)
          const headers = header.split('|').map((h) => h.trim())
          const tableRows = rows
            .split('\n')
            .map((row) => row.split('|').map((cell) => cell.trim()))
          blocks.push({
            type: 'table',
            headers,
            rows: tableRows,
          })
          i += tableLines.split('\n').length - 1
          continue
        }
      }

      // 处理脚注引用
      if (rules.markdown.footnote.reference.test(line)) {
        processParagraph()
        const [, label] = line.match(rules.markdown.footnote.reference) || []
        blocks.push({
          type: 'footnoteReference',
          label,
        })
        continue
      }

      // 处理脚注定义
      if (rules.markdown.footnote.definition.test(line)) {
        processParagraph()
        const [, label, content] =
          line.match(rules.markdown.footnote.definition) || []
        blocks.push({
          type: 'footnoteDefinition',
          label,
          content: this.inlineParser.parseInline(content),
        })
        continue
      }

      // 处理任务列表
      if (rules.markdown.taskList.test(line)) {
        processParagraph()
        const [, marker, content] = line.match(rules.markdown.taskList) || []
        blocks.push({
          type: 'taskListItem',
          checked: marker.trim() === '[x]',
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
