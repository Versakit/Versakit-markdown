type EditorElement = HTMLTextAreaElement | HTMLElement

interface State {
  content: string
}

interface Options {
  maxHistory?: number
}
// 定义状态值的类型

// 定义命令接口
interface Command {
  undo: (value: State) => void
  redo: (value: State) => void
  value: State

}

// 实现 EditCommand 类
class EditCommand implements Command {
  undo: (value: State) => void
  redo: (value: State) => void
  value: State

  constructor(
    undo: (value: State) => void,
    redo: (value: State) => void,
    value: State,
  ) {
    this.undo = undo
    this.redo = redo
    this.value = value
  }

  executeUndo(): void {
    this.undo(this.value)
  }

  executeRedo(): void {
    this.redo(this.value)
  }
}

class UndoRedoManager {
  private editor: EditorElement
  private options: Options
  private isTypingPinyin: boolean = false
  public historyStack: EditCommand[] = []
  public redoStack: EditCommand[] = []

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
    // let a = () => {
    //   window.undo = this.historyStack
    //   window.redo = this.redoStack
    // }
    // a()
    this.editor.addEventListener('compositionstart', () => {
      console.log('compositionstart')
      this.isTypingPinyin = true
    })

    this.editor.addEventListener('compositionend', () => {
      console.log('compositionend')
      this.isTypingPinyin = false
      this.onInput()
    })
    // 监听输入事件
    this.editor.addEventListener('input', () => {
      if (!this.isTypingPinyin) {
        console.log('input')
        this.onInput()
      }
    })
    this.historyStackBottomInit()
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
  private rangeRemoveToEnd(): void {
    const range = document.createRange()
    const selection = window.getSelection()

    // 将光标移动到内容的末尾
    range.selectNodeContents(this.editor)
    range.collapse(false)
    if (!selection) return
    selection.removeAllRanges()
    selection.addRange(range)
  }

  private restoreState(editor: EditorElement) {
    const editorElement = editor || this.editor
    return (state: State) => {
      if (editorElement instanceof HTMLTextAreaElement) {
        editorElement.value = state.content
      } else if (
        editorElement instanceof HTMLElement &&
        editorElement.isContentEditable
      ) {
        editorElement.innerHTML = state.content
      }
    }
    // debugger
  }

  public onInput(): void {
    const currentState: State = this.saveState()
    const current = new EditCommand(
      this.restoreState(this.editor),
      this.restoreState(this.editor),
      currentState,
    )
    this.historyStack.push(current)
    // this.redoStack = []
    this.redoStack.length = 0 // 清空重做栈
    // 限制历史记录数量
    if (this.historyStack.length > (this.options.maxHistory ?? 50)) {
      // 使用 ?? 提供默认值
      this.historyStack.shift()
    }
  }

  public undo(): void {
    //
    // debugger
    if (this.historyStack.length > 1) {
      const lastState = this.historyStack.pop()!
      this.redoStack.push(lastState)
      const index = this.historyStack.length - 1
      // this.historyStack.length - 1 < 0 ? 0 : this.historyStack.length - 1
      const previousState = this.historyStack[index]
      previousState.executeUndo()
      this.rangeRemoveToEnd()
    } else if (this.historyStack.length === 1) {
      // console.log('没有更多撤销记录了')
    }
  }

  public redo(): void {
    if (this.redoStack.length > 0) {
      const lastRedoState = this.redoStack.pop()!
      this.historyStack.push(lastRedoState)
      lastRedoState.executeRedo()
      this.rangeRemoveToEnd()
    } else {
      console.log('没有更多重做记录了')
    }
  }
  // 初始化栈底的空状态
  private historyStackBottomInit(): void {
    const currentState: State = this.saveState()
    const current = new EditCommand(
      this.restoreState(this.editor),
      this.restoreState(this.editor),
      currentState,
    )
    this.historyStack.push(current)
  }
}

export { UndoRedoManager, EditCommand }
