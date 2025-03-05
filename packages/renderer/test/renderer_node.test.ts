import { describe, it, expect, beforeEach } from 'vitest'
import { renderNode } from '../src/renderer_node'

describe('renderNode', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  it('应该正确渲染根节点', () => {
    const node = {
      type: 'root' as const,
      children: [{ type: 'text' as const, value: 'Hello' }],
    }
    const el = renderNode(node) as HTMLElement
    expect(el.className).toBe('markdown-content')
    expect(el.textContent).toBe('Hello')
  })

  it('应该正确渲染标题节点', () => {
    const node = {
      type: 'heading' as const,
      depth: 2,
      children: [{ type: 'text' as const, value: 'Title' }],
    }
    const el = renderNode(node) as HTMLElement
    expect(el.tagName.toLowerCase()).toBe('h2')
    expect(el.textContent).toBe('Title')
  })

  it('应该正确渲染链接', () => {
    const node = {
      type: 'link' as const,
      url: 'https://example.com',
      title: 'Example',
      children: [{ type: 'text' as const, value: 'Link Text' }],
    }
    const el = renderNode(node) as HTMLAnchorElement
    expect(el.tagName.toLowerCase()).toBe('a')
    expect(el.href).toContain('example.com')
    expect(el.title).toBe('Example')
    expect(el.textContent).toBe('Link Text')
  })

  it('应该正确渲染图片', () => {
    const node = {
      type: 'image' as const,
      url: 'test.jpg',
      alt: 'Test Image',
    }
    const el = renderNode(node) as HTMLImageElement
    expect(el.tagName.toLowerCase()).toBe('img')
    expect(el.src).toContain('test.jpg')
    expect(el.alt).toBe('Test Image')
  })
})
