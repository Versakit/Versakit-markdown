import { renderNode } from '../renderer_node'
import type { MarkdownNode, Change } from '../types'

const sameNode = (
  oldNode: MarkdownNode | undefined,
  newNode: MarkdownNode | undefined,
): boolean => {
  if (!oldNode || !newNode) return false
  if (oldNode.type !== newNode.type) return false

  switch (oldNode.type) {
    case 'heading':
      return oldNode.depth === newNode.depth
    case 'list':
      return oldNode.ordered === newNode.ordered
    case 'text':
      return oldNode.value === newNode.value
    case 'code':
      return oldNode.value === newNode.value && oldNode.lang === newNode.lang
    default:
      return true
  }
}

const findIdxInOld = (
  node: MarkdownNode,
  oldCh: (MarkdownNode | undefined)[],
  start: number,
  end: number,
): number | null => {
  for (let i = start; i <= end; i++) {
    if (oldCh[i] && sameNode(oldCh[i], node)) {
      return i
    }
  }
  return null
}

const updateAttrs = (oldNode: MarkdownNode, newNode: MarkdownNode): void => {
  if (!oldNode.el) return

  if (oldNode.type === 'heading' && oldNode.depth !== newNode.depth) {
    const newEl = document.createElement(`h${newNode.depth}`)
    oldNode.el.parentNode?.replaceChild(newEl, oldNode.el)
    oldNode.el = newEl
    return
  }

  if (oldNode.type === 'list' && oldNode.ordered !== newNode.ordered) {
    const newEl = document.createElement(newNode.ordered ? 'ol' : 'ul')
    oldNode.el.parentNode?.replaceChild(newEl, oldNode.el)
    oldNode.el = newEl
    return
  }

  if (oldNode.type === 'link') {
    const linkEl = oldNode.el as HTMLAnchorElement
    linkEl.href = newNode.url || ''
    linkEl.title = newNode.title || ''
  }

  if (oldNode.type === 'image') {
    const imgEl = oldNode.el as HTMLImageElement
    imgEl.src = newNode.url || ''
    imgEl.alt = newNode.alt || ''
  }
}

const patchVnode = (oldNode: MarkdownNode, newNode: MarkdownNode): void => {
  if (oldNode === newNode) return

  // 处理文本节点的特殊情况
  if (oldNode.type === 'text' && newNode.type === 'text') {
    if (oldNode.value !== newNode.value) {
      const oldEl = oldNode.el as unknown as Text
      if (oldEl && oldEl.nodeType === Node.TEXT_NODE) {
        oldEl.nodeValue = newNode.value || ''
      }
    }
    newNode.el = oldNode.el
    return
  }

  newNode.el = oldNode.el

  updateAttrs(oldNode, newNode)

  if (oldNode.children || newNode.children) {
    if (oldNode.el instanceof HTMLElement) {
      updateChildren(oldNode.el, oldNode.children || [], newNode.children || [])
    }
  }
}

export const updateChildren = (
  parent: HTMLElement,
  oldCh: (MarkdownNode | undefined)[],
  newCh: MarkdownNode[],
): void => {
  if (!parent) return

  let oldStartIdx = 0
  let newStartIdx = 0
  let oldEndIdx = oldCh.length - 1
  let newEndIdx = newCh.length - 1
  let oldStartNode = oldCh[0]
  let oldEndNode = oldCh[oldEndIdx]
  let newStartNode = newCh[0]
  let newEndNode = newCh[newEndIdx]

  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    if (!oldStartNode || !oldStartNode.el) {
      oldStartNode = oldCh[++oldStartIdx]
    } else if (!oldEndNode || !oldEndNode.el) {
      oldEndNode = oldCh[--oldEndIdx]
    } else if (sameNode(oldStartNode, newStartNode)) {
      patchVnode(oldStartNode, newStartNode)
      oldStartNode = oldCh[++oldStartIdx]
      newStartNode = newCh[++newStartIdx]
    } else if (sameNode(oldEndNode, newEndNode)) {
      patchVnode(oldEndNode, newEndNode)
      oldEndNode = oldCh[--oldEndIdx]
      newEndNode = newCh[--newEndIdx]
    } else {
      // 处理节点移动和创建
      const idxInOld = findIdxInOld(newStartNode, oldCh, oldStartIdx, oldEndIdx)
      if (idxInOld === null) {
        const el = renderNode(newStartNode)
        //处理type为theme的情况：无返回结点
        if (el != null) {
          // 新建节点
          if (oldStartNode && oldStartNode.el) {
            parent.insertBefore(el, oldStartNode.el)
          } else {
            parent.appendChild(el)
          }
          newStartNode.el = el as HTMLElement
        }
      } else {
        // 移动节点
        const nodeToMove = oldCh[idxInOld]
        if (nodeToMove && nodeToMove.el && oldStartNode && oldStartNode.el) {
          patchVnode(nodeToMove, newStartNode)
          parent.insertBefore(nodeToMove.el, oldStartNode.el)
          oldCh[idxInOld] = undefined
        }
      }
      newStartNode = newCh[++newStartIdx]
    }
  }

  // 处理新增节点
  if (oldStartIdx > oldEndIdx) {
    const fragment = document.createDocumentFragment()
    for (let i = newStartIdx; i <= newEndIdx; i++) {
      console.log(newCh[i], newCh[i].type)
      const el = renderNode(newCh[i])
      if (el) {
        fragment.appendChild(el)
        if (el instanceof Text) {
          newCh[i].el = el as unknown as HTMLElement
        } else {
          newCh[i].el = el as HTMLElement
        }
      }
    }
    parent.appendChild(fragment)
  } else if (newStartIdx > newEndIdx) {
    // 删除多余节点
    for (let i = oldStartIdx; i <= oldEndIdx; i++) {
      const node = oldCh[i]
      if (node?.el && node.el instanceof Node) {
        parent.removeChild(node.el)
      }
    }
  }
}

export class Diff {
  static compare(oldText: string, newText: string): Change[] {
    const oldLines = oldText.split('\n')
    const newLines = newText.split('\n')
    const changes: Change[] = []
    let i = 0,
      j = 0

    // 处理空文本的特殊情况
    if (oldText === '') {
      return newLines.map((line, index) => ({
        type: 'add',
        content: line,
        index,
      }))
    }

    while (i < oldLines.length || j < newLines.length) {
      if (i >= oldLines.length) {
        changes.push({ type: 'add', content: newLines[j], index: j })
        j++
      } else if (j >= newLines.length) {
        changes.push({ type: 'remove', content: oldLines[i], index: i })
        i++
      } else if (oldLines[i] !== newLines[j]) {
        if (newLines[j + 1] === oldLines[i]) {
          changes.push({ type: 'add', content: newLines[j], index: j })
          j++
        } else if (oldLines[i + 1] === newLines[j]) {
          changes.push({ type: 'remove', content: oldLines[i], index: i })
          i++
        } else {
          changes.push({ type: 'remove', content: oldLines[i], index: i })
          changes.push({ type: 'add', content: newLines[j], index: j })
          i++
          j++
        }
      } else {
        i++
        j++
      }
    }
    return changes
  }
}
