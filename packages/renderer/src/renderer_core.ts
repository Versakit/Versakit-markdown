import { renderNode } from './renderer_node'
import { updateChildren } from './utils/diff'
import type { MarkdownNode, RendererOptions } from './types'

export class Renderer {
  private viewer: HTMLDivElement
  private viewerRoot: HTMLDivElement
  private ast: MarkdownNode
  private oldAst: MarkdownNode | null

  constructor(options: RendererOptions) {
    const { ast, container = '#markdown-viewer' } = options

    // 初始化 AST，包装成根节点
    this.ast = {
      type: 'root',
      children: ast,
    }
    this.oldAst = null

    // 初始化容器
    if (typeof container === 'string') {
      const el = document.querySelector<HTMLDivElement>(container)
      if (!el) throw new Error('Container element not found')
      this.viewer = el
    } else {
      this.viewer = container as HTMLDivElement
    }

    this.viewerRoot = document.createElement('div')
    this.viewerRoot.className = 'markdown-body'
    this.viewer.appendChild(this.viewerRoot)

    // 初始渲染
    this.update(ast)
  }

  // 更新 AST 并触发重新渲染
  update(newAst: MarkdownNode[]) {
    const newRootAst = {
      type: 'root',
      children: newAst,
    }

    if (!this.oldAst) {
      // 首次渲染
      const fragment = document.createDocumentFragment()
      newRootAst.children.forEach((node) => {
        const el = renderNode(node)
        if (el) {
          node.el = el as HTMLElement
          fragment.appendChild(el)
        }
      })
      this.viewerRoot.appendChild(fragment)
    } else {
      // 使用 diff 算法更新变化的节点
      updateChildren(
        this.viewerRoot,
        this.oldAst.children || [],
        newRootAst.children || [],
      )
    }

    this.oldAst = newRootAst
    this.ast = newRootAst
  }

  // 销毁方法
  destroy() {
    this.viewer.removeChild(this.viewerRoot)
    this.ast = { type: 'root', children: [] }
    this.oldAst = null
  }
}
