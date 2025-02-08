import type { MarkdownNode } from './types'

export const renderNode = (node: MarkdownNode): HTMLElement | Text => {
  const { type } = node

  switch (type) {
    case 'root':
      const root = document.createElement('div')
      root.className = 'markdown-content'
      createChildren(root, node.children)
      return root
    case 'heading':
      return createHeading(node)
    case 'paragraph':
      return createParagraph(node)
    case 'text':
      return createText(node)
    case 'list':
      return createList(node)
    case 'listItem':
      return createListItem(node)
    case 'italic': // 添加 italic 类型的处理
    case 'emphasis': // 保留 emphasis 以保持兼容性
      return createEmphasis(node)
    case 'bold': // 添加 bold 类型的处理
    case 'strong': // 保留 strong 以保持兼容性
      return createStrong(node)
    case 'link':
      return createLink(node)
    case 'image':
      return createImage(node)
    case 'blockquote':
      return createBlockquote(node)
    case 'code':
      return createCode(node)
    case 'inlineCode':
      return createInlineCode(node)
    case 'underline':
      return createUnderline(node)
    case 'highlight':
      return createHighlight(node)
    case 'strikethrough':
      return createStrikethrough(node)
    case 'subscript':
      return createSubscript(node)
    case 'superscript':
      return createSuperscript(node)
    case 'math':
      return createMath(node)
    case 'hr':
      return createHorizontalRule()
    case 'audio':
      return createAudio(node)
    default:
      return createText(node)
  }
}

function createHeading(node: MarkdownNode): HTMLHeadingElement {
  const el = document.createElement(`h${node.depth}`) as HTMLHeadingElement
  createChildren(el, node.children)
  return el
}

function createParagraph(node: MarkdownNode): HTMLParagraphElement {
  const el = document.createElement('p')
  createChildren(el, node.children)
  return el
}

function createText(node: MarkdownNode): Text {
  const textNode = document.createTextNode(node.value || '')
  node.el = textNode as unknown as HTMLElement // 确保 el 属性存在
  return textNode
}

function createList(node: MarkdownNode): HTMLUListElement | HTMLOListElement {
  const el = document.createElement(node.ordered ? 'ol' : 'ul')
  createChildren(el, node.children)
  return el
}

function createListItem(node: MarkdownNode): HTMLLIElement {
  const el = document.createElement('li')
  createChildren(el, node.children)
  return el
}

function createEmphasis(node: MarkdownNode): HTMLElement {
  const el = document.createElement('em')
  createChildren(el, node.children)
  return el
}

function createStrong(node: MarkdownNode): HTMLElement {
  const el = document.createElement('strong')
  createChildren(el, node.children)
  return el
}

function createLink(node: MarkdownNode): HTMLAnchorElement {
  const el = document.createElement('a')
  el.href = node.url || ''
  el.title = node.title || ''
  createChildren(el, node.children)
  return el
}

function createImage(node: MarkdownNode): HTMLImageElement {
  const el = document.createElement('img')
  el.src = node.url || ''
  el.alt = node.alt || ''
  return el
}

function createCode(node: MarkdownNode): HTMLPreElement {
  const pre = document.createElement('pre')
  const code = document.createElement('code')
  code.textContent = node.value || ''
  pre.appendChild(code)
  return pre
}

function createInlineCode(node: MarkdownNode): HTMLElement {
  const el = document.createElement('code')
  el.textContent = node.value || ''
  return el
}

// 添加 blockquote 的创建函数
function createBlockquote(node: MarkdownNode): HTMLQuoteElement {
  const el = document.createElement('blockquote')
  // 如果有子节点，递归创建子节点
  if (node.children && node.children.length > 0) {
    createChildren(el, node.children)
  } else if (node.value) {
    // 如果只有文本内容，直接创建文本节点
    const p = document.createElement('p')
    p.textContent = node.value
    el.appendChild(p)
  }
  return el
}

// 添加下划线元素的创建函数
function createUnderline(node: MarkdownNode): HTMLElement {
  const el = document.createElement('u')
  createChildren(el, node.children)
  return el
}

// 添加高亮元素的创建函数
function createHighlight(node: MarkdownNode): HTMLElement {
  const el = document.createElement('mark')
  createChildren(el, node.children)
  return el
}

// 添加删除线元素的创建函数
function createStrikethrough(node: MarkdownNode): HTMLElement {
  const el = document.createElement('del')
  createChildren(el, node.children)
  return el
}

// 添加下标元素的创建函数
function createSubscript(node: MarkdownNode): HTMLElement {
  const el = document.createElement('sub')
  createChildren(el, node.children)
  return el
}

// 添加上标元素的创建函数
function createSuperscript(node: MarkdownNode): HTMLElement {
  const el = document.createElement('sup')
  createChildren(el, node.children)
  return el
}

// 添加数学公式元素的创建函数
function createMath(node: MarkdownNode): HTMLElement {
  const el = document.createElement('div')
  el.className = 'math'
  el.textContent = node.value || ''
  return el
}

// 添加分割线元素的创建函数
function createHorizontalRule(): HTMLElement {
  return document.createElement('hr')
}

// 添加音频元素的创建函数
function createAudio(node: MarkdownNode): HTMLElement {
  const el = document.createElement('audio')
  el.controls = true
  if (node.url) {
    el.src = node.url
  }
  if (node.alt) {
    el.title = node.alt
  }
  return el
}

function createChildren(
  parent: HTMLElement,
  children: MarkdownNode[] = [],
): void {
  children.forEach((child) => {
    const el = renderNode(child)
    if (el) {
      if (el instanceof Text) {
        child.el = el as unknown as HTMLElement
      } else {
        child.el = el as HTMLElement
      }
      parent.appendChild(el)
    }
  })
}
