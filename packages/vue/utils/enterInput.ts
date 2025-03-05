// enterInput.ts

function handleEnterInput(editor: HTMLElement): void {
  // 监听 keydown 事件
  editor.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault() // 阻止默认回车行为
      handleEnter(event.target as HTMLElement)
    }
  })
}

function handleEnter(element: HTMLElement): void {
  const selection = window.getSelection()
  if (selection) {
    const range = selection.getRangeAt(0)
    const textNode = range.startContainer
    const offset = range.startOffset

    if (textNode.nodeType === Node.TEXT_NODE) {
      const text = textNode.textContent || ''
      const currentLine = text.substring(0, offset).split('\n').pop() || ''
      const isNumberedList = /^\d+\.\s/.test(currentLine)
      const isBulletList = /^-\s/.test(currentLine)

      if (isNumberedList || isBulletList) {
        // 检查当前行是否为空
        const isListLineEmpty =
          (isNumberedList && /^\d+\.\s*$/.test(currentLine)) ||
          (isBulletList && /^-\s*$/.test(currentLine))
        if (isListLineEmpty) {
          // 如果当前行为空，结束列表
          textNode.splitText(offset)
          textNode.textContent = '\n\n '
          // 3. 创建新的光标位置
          const newRange = document.createRange()
          // 计算新光标位置（在第一个换行符之后）
          const newOffset = textNode.textContent?.length - 1 || 0
          newRange.setStart(textNode, newOffset)
          newRange.collapse(true)

          selection.removeAllRanges()
          selection.addRange(newRange)
        } else {
          // 如果当前行不为空，继续列表
          const newListLine = isNumberedList
            ? `${currentLine.match(/^\d+/)![0] * 1 + 1}. `
            : '- '
          const newTextNode = document.createTextNode(`\n${newListLine} `)
          textNode.splitText(offset)
          textNode.parentNode?.insertBefore(newTextNode, textNode.nextSibling)
          range.setStart(newTextNode, newListLine.length + 1)
          range.setEnd(newTextNode, newListLine.length + 1)
          selection.removeAllRanges()
          selection.addRange(range)
        }
      } else {
        // 普通文本行，插入换行符
        textNode.splitText(offset)
        const lineBreak = document.createTextNode('\n ')
        textNode.parentNode?.insertBefore(lineBreak, textNode.nextSibling)
        range.setStart(lineBreak, 1)
        range.setEnd(lineBreak, 1)
        selection.removeAllRanges()
        selection.addRange(range)
      }
    }
  }
}

// 示例用法
// const editor = document.getElementById('editor') as HTMLElement
// handleEnterInput(editor)
export default handleEnterInput
