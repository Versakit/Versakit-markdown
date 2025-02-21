import type { MarkdownNode } from './types'

export const renderNode = (node: MarkdownNode): HTMLElement | Text | void => {
  const { type } = node

  switch (type) {
    case 'root':
      const root = document.createElement('div')
      root.className = 'markdown-content'
      createChildren(root, node.children)
      return root
    case 'theme':
      return createTheme(node)
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
    case 'emphasis':
      return createEmphasis(node)
    case 'strong':
      return createStrong(node)
    case 'link':
      return createLink(node)
    case 'image':
      return createImage(node)
    case 'code':
      return createCode(node)
    case 'inlineCode':
      return createInlineCode(node)
    default:
      return createText(node)
  }
}
// TODO
function createTheme(node: MarkdownNode): void {
  console.log('进入主题渲染', node)
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
  return document.createTextNode(node.value || '')
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

function createChildren(
  parent: HTMLElement,
  children: MarkdownNode[] = [],
): void {
  children.forEach((child) => {
    const el = renderNode(child)
    if (el) {
      child.el = el as HTMLElement
      parent.appendChild(el)
    }
  })
}
