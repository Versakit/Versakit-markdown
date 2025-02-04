import { rules } from './rules'
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
    const codeBlockState = { active: false, lang: '', content: [] as string[] }

    // 处理各种块级元素的关闭
    const finalizeContext = () => {
      // 关闭段落
      if (currentParagraph.length > 0) {
        blocks.push(this.createParagraph(currentParagraph))
        currentParagraph = []
      }

      // 关闭列表
      if (this.currentList) {
        blocks.push(this.currentList)
        this.currentList = null
      }

      // 关闭时间线
      if (this.currentTimeline) {
        blocks.push(this.currentTimeline)
        this.currentTimeline = null
      }
    }

    // 主循环

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

      // 优先级2: 处理代码块
      if (this.handleCodeBlock(lines[i], codeBlockState, blocks)) {
        finalizeContext()
        continue
      }

      // 优先级3: 处理表格
      const tableConsumed = this.handleTable(lines[i], i, lines, blocks)
      if (tableConsumed > 0) {
        i += tableConsumed - 1
        finalizeContext()
        continue
      }
      // 优先级4: 处理其他单行块元素
      if (
        this.handleFootnoteDefinition(lines[i], blocks) ||
        this.handleHeading(lines[i], blocks) ||
        this.handleHr(lines[i], blocks) ||
        this.handleTOC(lines[i], blocks)
      ) {
        finalizeContext()
        continue
      }

      // 优先级5: 处理多行块元素
      const multiLineHandlers = [
        this.handleList(line, i, lines, blocks),
        this.handleMathBlock(line, i, lines, blocks),
        this.handleAdmonition(line, i, lines, blocks),
        this.handleTimeline(line, i, lines, blocks),
      ]

      for (const consumed of multiLineHandlers) {
        if (consumed > 0) {
          i += consumed - 1
          finalizeContext()
          continue
        }
      }

      // 最后处理段落内容
      if (line === '') {
        finalizeContext()
      } else {
        currentParagraph.push(lines[i]) // 保留原始行内容
      }
    }

    finalizeContext()
    return blocks
  }

  // 辅助方法：创建标准段落节点
  private createParagraph(lines: string[]): ASTNode {
    // 合并连续空行处理
    const cleanedLines = lines
      .join('\n')
      .replace(/\n{3,}/g, '\n\n') // 合并多个空行
      .split('\n')
    return {
      type: 'paragraph',
      children: this.inlineParser.parseInline(
        cleanedLines.join('\n').replace(/(\S)\n(\S)/g, '$1 $2'),
      ), // 智能空格处理
    }
  }

  // 代码块处理逻辑
  private handleCodeBlock(
    line: string,
    state: { active: boolean; lang: string; content: string[] },
    blocks: ASTNode[],
  ): boolean {
    // 处理代码块结束
    if (state.active) {
      if (/^```\s*$/.test(line)) {
        // 修正结束标记检测
        blocks.push({
          type: 'codeBlock',
          lang: state.lang,
          value: state.content.join('\n'),
        })
        state.active = false
        state.content = []
      } else {
        state.content.push(line) // 保留原始缩进和格式
      }
      return true // 阻止其他解析
    }

    // 处理代码块开始
    const startMatch = line.match(/^```(\w*)\s*$/) // 修正正则表达式
    if (startMatch) {
      state.active = true
      state.lang = startMatch[1] || ''
      return true
    }

    return false
  }
  // 标题处理逻辑
  private handleHeading(line: string, blocks: ASTNode[]): boolean {
    const match = line.match(rules.markdown.heading)
    if (match) {
      const [, level, content] = match
      blocks.push({
        type: 'heading',
        depth: level.length,
        children: this.inlineParser.parseInline(content),
      })
      return true
    }
    return false
  }

  // 列表处理逻辑
  private handleList(
    line: string,
    index: number,
    lines: string[],
    blocks: ASTNode[],
  ): number {
    const taskMatch = line.match(rules.markdown.taskList)
    if (taskMatch) {
      const items = []
      let i = index
      while (i < lines.length) {
        const currentLine = lines[i]
        const taskItem = currentLine.match(rules.markdown.taskList)
        if (!taskItem) break

        items.push({
          type: 'taskListItem',
          checked: taskItem[1] === 'x',
          children: this.inlineParser.parseInline(taskItem[2]),
        })
        i++
      }

      blocks.push({
        type: 'list',
        ordered: false,
        children: items,
      })
      return i - index
    }
    const match = line.match(rules.markdown.list)
    if (!match) return 0

    const isTaskList = /^-\s+\[[ x]\]/.test(line) // 新增任务列表检测
    const isOrdered = /^\d+\./.test(match[1])

    // 收集连续列表项
    const listItems = []
    let i = index

    while (i < lines.length) {
      const currentLine = lines[i]
      const itemMatch = currentLine.match(rules.markdown.list)
      if (!itemMatch) break

      // 提取任务列表状态
      let checked: boolean | undefined
      if (isTaskList) {
        checked = itemMatch[0].includes('[x]')
      }

      listItems.push({
        type: 'listItem',
        checked,
        children: this.inlineParser.parseInline(itemMatch[2]),
      })
      i++
    }

    // 创建列表节点
    const listNode: ASTNode = {
      type: 'list',
      ordered: isOrdered,
      children: listItems,
    }

    blocks.push(listNode)
    return i - index // 返回消耗行数
  }

  // 表格处理逻辑
  // 修改后的表格处理逻辑
  private handleTable(
    line: string,
    index: number,
    lines: string[],
    blocks: ASTNode[],
  ): number {
    // 增强表格检测正则（允许空列）
    const tableRegExp = /^\|([^|\n]*\|)+[\s\S]*?^\|([-:| ]+\|)+/m

    // 检测并收集完整表格内容
    const tableContent: string[] = []
    let i = index

    // 收集连续表格行（最多20行）
    while (i < lines.length && i < index + 20) {
      const currentLine = lines[i].trim()
      if (currentLine === '' && tableContent.length === 0) {
        i++
        continue // 跳过表格前的空行
      }

      if (currentLine.startsWith('|') || currentLine === '') {
        tableContent.push(lines[i])
        // 遇到连续两个空行则终止
        if (currentLine === '' && tableContent[tableContent.length - 2] === '')
          break
      } else {
        break
      }
      i++
    }

    // 清理末尾空行
    while (
      tableContent.length > 0 &&
      tableContent[tableContent.length - 1].trim() === ''
    ) {
      tableContent.pop()
    }

    // 验证表格结构
    const tableText = tableContent.join('\n')
    if (!tableRegExp.test(tableText)) return 0

    // 分割表格结构
    const rows = tableContent
      .filter((line) => line.trim() !== '') // 过滤空行
      .map((line) =>
        line
          .split('|')
          .slice(1, -1) // 去除首尾空元素
          .map((cell) => cell.trim().replace(/\\\|/g, '|')),
      )

    // 解析表头和对齐方式
    const [headerRow, dividerRow, ...dataRows] = rows
    if (!headerRow || !dividerRow) return 0

    // 解析对齐方式
    const align = dividerRow.map((cell) => {
      if (cell === '') return 'left' // 空分隔符默认左对齐
      const left = /^:-+/.test(cell)
      const right = /-+:$/.test(cell)
      return left && right ? 'center' : right ? 'right' : 'left'
    })

    // 创建AST节点
    blocks.push({
      type: 'table',
      headers: headerRow.map((h) => h || ' '),
      align: align.slice(0, headerRow.length),
      rows: dataRows.map((row) => row.map((cell) => cell || ' ')),
    })

    return tableContent.length // 返回实际处理的行数
  }

  private handleHr(line: string, blocks: ASTNode[]): boolean {
    if (rules.markdown.hr.test(line)) {
      blocks.push({ type: 'hr' })
      return true
    }
    return false
  }

  private handleBlockquote(
    line: string,
    index: number,
    lines: string[],
    blocks: ASTNode[],
  ): number {
    if (!line.startsWith('>')) return 0

    const quoteContent: string[] = []
    let i = index

    while (i < lines.length && lines[i].startsWith('>')) {
      quoteContent.push(lines[i].replace(/^>+\s*/, ''))
      i++
    }

    if (quoteContent.length > 0) {
      const children = quoteContent.map((content) => ({
        type: 'paragraph',
        children: this.inlineParser.parseInline(content.trim()),
      }))

      blocks.push({
        type: 'blockquote',
        children,
      })
    }

    return i - index // 返回实际处理的行数
  }

  private handleMathBlock(
    line: string,
    index: number,
    lines: string[],
    blocks: ASTNode[],
  ): number {
    const mathBlockStart = /^\$\$(\s*\S+)?\s*$/
    if (!mathBlockStart.test(line)) return 0

    const content = []
    let i = index + 1

    while (i < lines.length && !/^\$\$$/.test(lines[i])) {
      content.push(lines[i])
      i++
    }

    blocks.push({
      type: 'mathBlock',
      value: content.join('\n'),
      lang: line.match(mathBlockStart)?.[1]?.trim() || '',
    })

    return i - index // 返回消耗的行数
  }

  private handleAdmonition(
    line: string,
    index: number,
    lines: string[],
    blocks: ASTNode[],
  ): number {
    const match = line.match(rules.markdown.admonition)
    if (!match) return 0

    const [, type, title] = match
    const content = []
    let i = index + 1

    // 收集直到 ::: 的所有行
    while (i < lines.length && !/^:::\s*$/.test(lines[i])) {
      content.push(lines[i])
      i++
    }

    // 解析内部内容时重置状态
    const admonitionBlocks = this.parseBlocks(content)

    blocks.push({
      type: 'admonition',
      admonitionType: type,
      title: title || '',
      children: admonitionBlocks,
    })

    return i - index + 1
  }

  private handleTimeline(
    line: string,
    index: number,
    lines: string[],
    blocks: ASTNode[],
  ): number {
    const match = line.match(rules.markdown.timeline)
    if (!match) return 0

    // // 关闭前一个段落/列表
    // this.finalizeContext()

    const [, year, content] = match

    // 如果不存在
    if (!this.currentTimeline) {
      this.currentTimeline = {
        type: 'timeline',
        children: [],
      }
      blocks.push(this.currentTimeline)
    }

    // 添加时间线项
    if (this.currentTimeline.children) {
      this.currentTimeline.children.push({
        type: 'timelineItem',
        year,
        children: this.inlineParser.parseInline(content),
      })
    }

    return 1
  }

  private handleTOC(line: string, blocks: ASTNode[]): boolean {
    if (rules.markdown.toc.test(line)) {
      blocks.push({ type: 'toc' })
      return true
    }
    return false
  }
  // 新增块级处理方法
  private handleFootnoteDefinition(line: string, blocks: ASTNode[]): boolean {
    const match = line.match(rules.markdown.footnoteDefinition)
    if (match) {
      const [, label, content] = match
      blocks.push({
        type: 'footnoteDefinition',
        label: label.trim(),
        children: this.inlineParser.parseInline(content.trim()),
      })
      return true
    }
    return false
  }
}
