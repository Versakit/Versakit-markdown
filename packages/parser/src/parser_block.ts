import { rules } from './ruler'
import { ASTNode } from './types'
import { ParserInline } from './parser_inline'

export class ParserBlock {
  private inlineParser: ParserInline
  private currentList: ASTNode | null = null
  private currentTimeline: ASTNode | null = null

  constructor() {
    this.inlineParser = new ParserInline()
  }

  parseBlocks(lines: string[]): ASTNode[] {
    const blocks: ASTNode[] = []
    let currentParagraph: string[] = []
    // 处理各种块级元素的关闭
    const finalizeContext = () => {
      if (currentParagraph.length > 0) {
        blocks.push(this.createParagraph(currentParagraph))
        currentParagraph = []
      }

      if (this.currentList) {
        blocks.push(this.currentList)
        this.currentList = null
      }

      if (this.currentTimeline) {
        blocks.push(this.currentTimeline)
        this.currentTimeline = null
      }
    }

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trimEnd()

      // 优先级1: 处理需要多行解析的块元素
      const blockquoteConsumed = this.handleBlockquote(
        lines[i],
        i,
        lines,
        blocks,
      )
      if (blockquoteConsumed > 0) {
        i += blockquoteConsumed - 1
        finalizeContext()
        continue
      }

      // 优先级2-5: 处理其他块级元素
      if (line.startsWith('```')) {
        finalizeContext()
        const lang = line.slice(3)
        const codeLines = []
        i++

        while (i < lines.length && !lines[i].trim().startsWith('```')) {
          codeLines.push(lines[i])
          i++
        }

        blocks.push({
          type: 'code',
          lang,
          value: codeLines.join('\n'),
        })

        continue
      }

      // 处理标题
      if (rules.markdown.heading.test(line)) {
        finalizeContext()
        const [, level, content] = line.match(rules.markdown.heading) || []
        blocks.push({
          type: 'heading',
          depth: level.length,
          children: [
            {
              type: 'text',
              value: content,
            },
          ],
        })
        continue
      }

      // 添加表格解析
      if (rules.markdown.table.header.test(line)) {
        const tableData = this.parseTable(lines, i)
        if (tableData && tableData.children) {
          blocks.push(tableData)
          i += tableData.children.length - 1 + 1 // 减1是去掉表头行，加1是分隔符行
          continue
        }
      }

      // 处理引用
      if (rules.markdown.blockquote.test(line)) {
        finalizeContext()
        const [, content] = line.match(rules.markdown.blockquote) || []
        blocks.push({
          type: 'blockquote',
          children: this.inlineParser.parseInline(content),
        })
        continue
      }

      // 处理列表
      if (rules.markdown.list.test(line)) {
        finalizeContext()
        const [, marker, content] = line.match(rules.markdown.list) || []
        blocks.push({
          type: 'listItem',
          ordered: /^\d+\./.test(marker),
          children: this.inlineParser.parseInline(content),
        })
        continue
      }

      // 处理分割线
      if (rules.markdown.hr.test(line)) {
        finalizeContext()
        blocks.push({ type: 'hr' })
        continue
      }

      // 处理块级数学公式
      if (rules.markdown.math.test(line)) {
        finalizeContext()
        const [, content] = line.match(rules.markdown.math) || []
        blocks.push({
          type: 'math',
          value: content,
        })
        continue
      }

      // 处理段落
      if (line === '') {
        finalizeContext()
      } else {
        currentParagraph.push(lines[i])
      }
    }

    finalizeContext()
    return blocks
  }

  // 添加表格解析方法
  parseTable(lines: string[], startIndex: number): ASTNode | null {
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
        rows.push(cells)
      }
      currentIndex++
    }

    // 转换表头为节点结构
    const headerCells = headers.map((header) => ({
      type: 'tableCell' as const,
      isHeader: true,
      children: this.inlineParser.parseInline(header),
    }))

    const headerRow = {
      type: 'tableRow' as const,
      children: headerCells,
    }

    // 转换数据行为节点结构
    const bodyRows = rows.map((row) => ({
      type: 'tableRow' as const,
      children: row.map((cell) => ({
        type: 'tableCell' as const,
        isHeader: false,
        children: this.inlineParser.parseInline(cell),
      })),
    }))

    return {
      type: 'table',
      alignments,
      children: [headerRow, ...bodyRows],
    }
  }

  // 解析行内元素
  parseInline(text: string): ASTNode[] {
    const currentText = text

    // 处理字符串中的所有标记
    const processText = (str: string): ASTNode[] => {
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
        return str ? [{ type: 'text', value: str }] : []
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

      const result: ASTNode[] = []
      if (before) result.push({ type: 'text', value: before })

      // 根据类型创建节点
      if (type === 'link') {
        result.push({
          type: 'link',
          url: match![2],
          children: [
            {
              type: 'text',
              value: match![1],
            },
          ],
        })
      } else if (type === 'image') {
        result.push({
          type: 'image',
          url: match![2],
          alt: match![1],
        })
      } else {
        result.push({
          type: type as 'bold' | 'italic' | 'inlineCode',
          value: match![1],
        })
      }

      // 递归处理剩余文本
      result.push(...processText(after))

      return result
    }

    return processText(currentText)
  }

  // 新增辅助方法
  private createParagraph(lines: string[]): ASTNode {
    const cleanedLines = lines
      .join('\n')
      .replace(/\n{3,}/g, '\n\n')
      .split('\n')
    return {
      type: 'paragraph',
      children: this.inlineParser.parseInline(
        cleanedLines.join('\n').replace(/(\S)\n(\S)/g, '$1 $2'),
      ),
    }
  }

  private handleBlockquote(
    line: string,
    index: number,
    lines: string[],
    blocks: ASTNode[],
  ): number {
    if (!rules.markdown.blockquote.test(line)) {
      return 0
    }

    const quotes: string[] = []
    let currentIndex = index

    while (
      currentIndex < lines.length &&
      rules.markdown.blockquote.test(lines[currentIndex])
    ) {
      const [, content] =
        lines[currentIndex].match(rules.markdown.blockquote) || []
      quotes.push(content)
      currentIndex++
    }

    blocks.push({
      type: 'blockquote',
      children: this.inlineParser.parseInline(quotes.join('\n')),
    })

    return currentIndex - index
  }

  // 添加新的处理方法
  // private handleTOC(line: string, blocks: ASTNode[]): boolean {
  //   if (rules.markdown.toc.test(line)) {
  //     blocks.push({ type: 'toc' })
  //     return true
  //   }
  //   return false
  // }

  // private handleFootnoteDefinition(line: string, blocks: ASTNode[]): boolean {
  //   const match = line.match(rules.markdown.footnoteDefinition)
  //   if (match) {
  //     const [, label, content] = match
  //     blocks.push({
  //       type: 'footnoteDefinition',
  //       label: label.trim(),
  //       children: this.inlineParser.parseInline(content.trim()),
  //     })
  //     return true
  //   }
  //   return false
  // }
}
