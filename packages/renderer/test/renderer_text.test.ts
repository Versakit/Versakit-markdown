import { describe, it, expect } from 'vitest'
import { RendererText, renderDocument } from '../src/renderer_text'

describe('RendererText', () => {
  const renderer = new RendererText()

  it('应该正确渲染段落', () => {
    const ast = {
      type: 'paragraph',
      children: [{ type: 'text', value: 'Hello World' }],
    }
    expect(renderer.render(ast)).toBe('<p>Hello World</p>')
  })

  it('应该正确渲染标题', () => {
    const ast = {
      type: 'heading',
      depth: 1,
      children: [{ type: 'text', value: 'Title' }],
    }
    expect(renderer.render(ast)).toBe('<h1>Title</h1>')
  })

  it('应该正确渲染代码块', () => {
    const ast = {
      type: 'code',
      lang: 'javascript',
      value: 'console.log("test")',
    }
    expect(renderer.render(ast)).toBe(
      '<pre><code class="language-javascript">console.log("test")</code></pre>',
    )
  })
})

describe('renderDocument', () => {
  it('应该正确渲染内联样式', () => {
    const doc = [
      { type: 'bold', content: 'Bold text' },
      { type: 'italic', content: 'Italic text' },
    ]
    expect(renderDocument(doc)).toBe(
      '<strong>Bold text</strong><em>Italic text</em>',
    )
  })

  it('应该正确转义文本内容', () => {
    expect(renderDocument('<script>')).toBe('&lt;script&gt;')
  })
})
