import { rules } from './ruler'
import { ASTNode } from './types'
import { ParserInline } from './parser_inline'

interface InlineElement {
  type: 'bold' | 'italic' | 'link' | 'image' | 'inlineCode'
  content?: string
  text?: string
  url?: string
  alt?: string
  src?: string
}

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
        const content = currentParagraph.join(' ').trim()
        blocks.push({
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: content,
            },
          ],
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

      // 添加表格解析
      if (rules.markdown.table.header.test(line)) {
        const tableData = this.parseTable(lines, i)
        if (tableData) {
          blocks.push(tableData)
          i += tableData.rows.length + 1 // 跳过已处理的行
          continue
        }
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

  // 添加表格解析方法
  parseTable(lines: string[], startIndex: number) {
    // 检查参数有效性
    if (!lines || !lines[startIndex]) return null

    const headerLine = lines[startIndex].trim()
    const headerMatch = headerLine.match(rules.markdown.table.header)
    if (!headerMatch || !lines[startIndex + 1]) return null

    const separatorLine = lines[startIndex + 1].trim()
    const separatorMatch = separatorLine.match(rules.markdown.table.separator)
    if (!separatorMatch) return null

    // 处理表头
    const headers = headerLine
      .slice(1, -1) // 移除首尾的 |
      .split('|')
      .map((cell) => cell.trim())

    // 处理对齐信息
    const alignments = separatorLine
      .slice(1, -1) // 移除首尾的 |
      .split('|')
      .map((cell) => {
        cell = cell.trim()
        if (cell.startsWith(':') && cell.endsWith(':')) return 'center'
        if (cell.endsWith(':')) return 'right'
        return 'left'
      })

    // 确保表头和对齐信息数量匹配
    if (headers.length === 0 || headers.length !== alignments.length)
      return null

    // 处理数据行
    const rows = []
    let currentIndex = startIndex + 2

    while (
      currentIndex < lines.length &&
      lines[currentIndex].trim().startsWith('|') &&
      lines[currentIndex].trim().endsWith('|')
    ) {
      const rowLine = lines[currentIndex].trim()
      const cells = rowLine
        .slice(1, -1) // 移除首尾的 |
        .split('|')
        .map((cell) => cell.trim())

      if (cells.length === headers.length) {
        rows.push(cells.map((cell) => this.parseInline(cell)))
      }
      currentIndex++
    }

    return {
      type: 'table',
      headers: headers.map((header) => this.parseInline(header)),
      alignments,
      rows,
    }
  }

  // 解析行内元素
  parseInline(text: string): Array<string | InlineElement> {
    const currentText = text

    // 处理字符串中的所有标记
    const processText = (str: string): Array<string | InlineElement> => {
      // 检查所有可能的匹配
      const matches = [
        { match: str.match(rules.markdown.bold), type: 'bold' },
        { match: str.match(rules.markdown.italic), type: 'italic' },
        { match: str.match(rules.markdown.link), type: 'link' },
        { match: str.match(rules.markdown.image), type: 'image' },
        { match: str.match(rules.markdown.inlineCode), type: 'inlineCode' },
      ].filter((m) => m.match)

      // 如果没有匹配，返回原文本
      if (matches.length === 0) {
        return str ? [str] : []
      }

      // 找到最早的匹配
      const firstMatch = matches.reduce((earliest, current) => {
        return current.match!.index! < earliest.match!.index!
          ? current
          : earliest
      })

      const { match, type } = firstMatch
      const before = str.slice(0, match!.index)
      const after = str.slice(match!.index! + match![0].length)

      const result: Array<string | InlineElement> = []
      if (before) result.push(before)

      // 根据类型创建节点
      if (type === 'link') {
        result.push({
          type: 'link',
          text: match![1],
          url: match![2],
        })
      } else if (type === 'image') {
        result.push({
          type: 'image',
          alt: match![1],
          src: match![2],
        })
      } else {
        result.push({
          type: type as 'bold' | 'italic' | 'link' | 'image' | 'inlineCode',
          content: match![1],
        })
      }

      // 递归处理剩余文本
      result.push(...processText(after))

      return result
    }

    return processText(currentText)
  }
}
