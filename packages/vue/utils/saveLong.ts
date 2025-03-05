const saveLong = (editableDiv) => {
  // saveLong.ts

  // 保存 DOM 元素内容到 localStorage
  function saveDomContent(element: HTMLElement, key: string): void {
    // 获取元素的 HTML 内容
    const htmlContent = element.innerHTML
    // 保存到 localStorage
    localStorage.setItem(key, htmlContent)
  }

  // 恢复 DOM 元素内容从 localStorage
  function restoreDomContent(element: HTMLElement, key: string): void {
    // 从 localStorage 获取保存的 HTML 内容
    const savedHtmlContent = localStorage.getItem(key)
    if (savedHtmlContent) {
      // 将内容设置回元素
      element.innerHTML = savedHtmlContent
    }
  }

  // 在页面加载时恢复内容
  window.onload = () => {
    restoreDomContent(editableDiv, 'editorContent')
  }

  // 在页面卸载时保存内容
  window.onbeforeunload = () => {
    saveDomContent(editableDiv, 'editorContent')
  }

  // 实时保存内容
  editableDiv.addEventListener('input', () => {
    console.log('editoejl')
    saveDomContent(editableDiv, 'editorContent')
  })
}

export default saveLong
