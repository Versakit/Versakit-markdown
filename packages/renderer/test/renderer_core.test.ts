import { describe, it, expect, beforeEach } from 'vitest'
import { Renderer } from '../src/renderer_core'

describe('Renderer', () => {
  let container: HTMLDivElement

  beforeEach(() => {
    container = document.createElement('div')
    container.id = 'markdown-viewer'
    document.body.appendChild(container)
  })

  it('应该正确初始化渲染器', () => {
    const ast = [
      {
        type: 'paragraph' as const,
        children: [{ type: 'text' as const, value: 'Hello World' }],
      },
    ]
    const renderer = new Renderer({ ast, container })
    expect(container.innerHTML).toContain('Hello World')
    expect(container.querySelector('.markdown-body')).toBeTruthy()
  })

  it('应该正确更新内容', () => {
    const ast = [{ type: 'text' as const, value: 'Initial' }]
    const renderer = new Renderer({ ast, container })

    const newAst = [{ type: 'text' as const, value: 'Updated' }]
    renderer.update(newAst)
    expect(container.textContent).toContain('Updated')
  })

  it('应该正确销毁渲染器', () => {
    const ast = [{ type: 'text' as const, value: 'Test' }]
    const renderer = new Renderer({ ast, container })
    renderer.destroy()
    expect(container.querySelector('.markdown-body')).toBeFalsy()
  })
})
