type EditorElement = HTMLTextAreaElement | HTMLElement

interface State {
  content: string
}

interface Options {
  maxHistory?: number
}

class UndoRedoManager {
  private editor: EditorElement
  private options: Options
  private historyStack: State[] = []
  private redoStack: State[] = []

  constructor(editorElement: EditorElement, options: Options = {}) {
    this.editor = editorElement
    this.options = {
      maxHistory: 50, // 默认最大历史记录数量
      ...options,
    }

    this.init()
  }

  private init(): void {
    // 确保 editor 是一个有效的 DOM 元素
    if (!this.editor) {
      console.error('Editor element is not valid.')
      return
    }

    // 监听输入事件
    this.editor.addEventListener('input', () => this.onInput())
  }

  private saveState(): State {
    let content = ''
    if (this.editor instanceof HTMLTextAreaElement) {
      content = this.editor.value || ''
    } else if (
      this.editor instanceof HTMLElement &&
      this.editor.isContentEditable
    ) {
      content = this.editor.innerHTML || ''
    }
    return { content }
  }

  private restoreState(state: State): void {
    if (this.editor instanceof HTMLTextAreaElement) {
      this.editor.value = state.content
    } else if (
      this.editor instanceof HTMLElement &&
      this.editor.isContentEditable
    ) {
      this.editor.innerHTML = state.content
    }
  }

  public onInput(): void {
    const currentState: State = this.saveState()
    this.historyStack.push(currentState)
    this.redoStack = [] // 清空重做栈

    // 限制历史记录数量
    if (this.historyStack.length > (this.options.maxHistory ?? 50)) {
      // 使用 ?? 提供默认值
      this.historyStack.shift()
    }
  }

  public undo(): void {
    if (this.historyStack.length > 1) {
      const lastState: State = this.historyStack.pop()!
      this.redoStack.push(lastState)

      const previousState: State =
        this.historyStack[this.historyStack.length - 1]
      this.restoreState(previousState)
    }
  }

  public redo(): void {
    if (this.redoStack.length > 0) {
      const lastRedoState: State = this.redoStack.pop()!
      this.historyStack.push(lastRedoState)
      this.restoreState(lastRedoState)
    }
  }
}

export default UndoRedoManager
