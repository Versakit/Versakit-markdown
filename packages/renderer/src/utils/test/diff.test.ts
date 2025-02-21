import { describe, it, expect, beforeEach } from 'vitest'
import { updateChildren, Diff } from '../diff'
import type { MarkdownNode } from '../../types'

describe('Diff 工具函数测试', () => {
  let container: HTMLDivElement

  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
  })

  describe('updateChildren', () => {
    it('应该正确处理文本节点更新', () => {
      const textNode = document.createTextNode('old text')
      container.appendChild(textNode)
      const oldNodes: MarkdownNode[] = [
        {
          type: 'text',
          value: 'old text',
          el: textNode,
        },
      ]

      const newNodes: MarkdownNode[] = [
        {
          type: 'text',
          value: 'new text',
        },
      ]

      updateChildren(container, oldNodes, newNodes)
      expect(container.textContent).toBe('new text')
    })

    it('应该正确处理节点添加', () => {
      const oldNodes: MarkdownNode[] = []
      const newNodes: MarkdownNode[] = [
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              value: 'new paragraph',
            },
          ],
        },
      ]

      updateChildren(container, oldNodes, newNodes)
      expect(container.innerHTML).toContain('new paragraph')
    })

    it('应该正确处理节点删除', () => {
      const p = document.createElement('p')
      container.appendChild(p)
      const oldNodes: MarkdownNode[] = [
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              value: 'old paragraph',
            },
          ],
          el: p,
        },
      ]
      const newNodes: MarkdownNode[] = []

      updateChildren(container, oldNodes, newNodes)
      expect(container.innerHTML).toBe('')
    })
  })

  describe('Diff.compare', () => {
    it('应该检测到文本添加', () => {
      const oldText = 'first line\nsecond line'
      const newText = 'first line\nnew line\nsecond line'
      const changes = Diff.compare(oldText, newText)

      expect(changes).toContainEqual({
        type: 'add',
        content: 'new line',
        index: 1,
      })
    })

    it('应该检测到文本删除', () => {
      const oldText = 'first line\nsecond line\nthird line'
      const newText = 'first line\nthird line'
      const changes = Diff.compare(oldText, newText)

      expect(changes).toContainEqual({
        type: 'remove',
        content: 'second line',
        index: 1,
      })
    })

    it('应该处理空文本输入', () => {
      const oldText = ''
      const newText = 'new content'
      const changes = Diff.compare(oldText, newText)

      expect(changes).toEqual([
        {
          type: 'add',
          content: 'new content',
          index: 0,
        },
      ])
    })

    it('应该处理完全不同的文本', () => {
      const oldText = 'old content'
      const newText = 'new content'
      const changes = Diff.compare(oldText, newText)

      expect(changes).toEqual([
        {
          type: 'remove',
          content: 'old content',
          index: 0,
        },
        {
          type: 'add',
          content: 'new content',
          index: 0,
        },
      ])
    })
  })

  describe('边缘情况处理', () => {
    it('应该处理undefined节点', () => {
      const oldNodes: (MarkdownNode | undefined)[] = [undefined]
      const newNodes: MarkdownNode[] = [
        {
          type: 'text',
          value: 'new text',
        },
      ]

      updateChildren(container, oldNodes, newNodes)
      expect(container.textContent).toBe('new text')
    })

    it('应该处理空children数组', () => {
      const oldNodes: MarkdownNode[] = []
      const newNodes: MarkdownNode[] = []

      updateChildren(container, oldNodes, newNodes)
      expect(container.innerHTML).toBe('')
    })

    it('应该正确处理同级节点的顺序变化', () => {
      const textA = document.createTextNode('A')
      const textB = document.createTextNode('B')
      container.appendChild(textA)
      container.appendChild(textB)
      const oldNodes: MarkdownNode[] = [
        {
          type: 'text',
          value: 'A',
          el: textA,
        },
        {
          type: 'text',
          value: 'B',
          el: textB,
        },
      ]

      const newNodes: MarkdownNode[] = [
        {
          type: 'text',
          value: 'B',
        },
        {
          type: 'text',
          value: 'A',
        },
      ]

      updateChildren(container, oldNodes, newNodes)
      expect(container.textContent).toBe('BA')
    })
  })
})
