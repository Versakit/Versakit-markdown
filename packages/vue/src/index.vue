<script setup lang="ts">
import { onBeforeUnmount, onMounted, onUnmounted, ref } from 'vue'
import ToolBar from './components/toolbar/index.vue'
import eventBus from '../utils/eventBus'

defineOptions({ name: 'VerRichEditor' })

const editorRef = ref<HTMLElement | null>(null)
let savedSelection: Range | null = null
const currentRow = ref(1)
const currentColumn = ref(1)

/**
 * @description 存储当前光标位置
 */
const restoreSelection = () => {
  if (savedSelection && editorRef.value) {
    const selection = window.getSelection()
    if (selection) {
      selection.removeAllRanges()
      selection.addRange(savedSelection)
    }
  }
}

/**
 * @description 封装光标位置并应用 Markdown 语法
 * @param cmd - Markdown 语法符号，如 '**' 表示加粗，'*' 表示斜体，'~~' 表示删除线
 */
const wrapSelection = (cmd: string) => {
  if (!savedSelection) return

  const selection = window.getSelection()
  if (selection && selection.rangeCount > 0) {
    const range = selection.getRangeAt(0)
    // 提取选中的文本
    const selectedText = range.extractContents()
    // 创建一个文档片段
    const fragment = document.createDocumentFragment()
    // 创建一个新的开始文本节点，内容为 cmd
    const startNode = document.createTextNode(cmd)
    // 创建一个新的结束文本节点，内容为 cmd
    const endNode = document.createTextNode(cmd)
    // 将开始文本节点添加到文档片段中
    fragment.appendChild(startNode)
    // 将选中的文本添加到文档片段中
    fragment.appendChild(selectedText)
    // 将结束文本节点添加到文档片段中
    fragment.appendChild(endNode)
    // 将文档片段插入到选区中
    range.insertNode(fragment)
    // 更新 savedSelection 为新的范围
    savedSelection = range.cloneRange()
  }
}

/**
 * 保存当前选中的文本
 */
const saveSelection = () => {
  const selection = window.getSelection()
  if (selection && selection.rangeCount > 0) {
    savedSelection = selection.getRangeAt(0).cloneRange()
  }
}

// 业务层
const boldHandler = () => {
  restoreSelection()
  wrapSelection('**')
  if (editorRef.value) {
    editorRef.value.focus()
  }
}

const italicHandler = () => {
  restoreSelection()
  wrapSelection('*')
  if (editorRef.value) {
    editorRef.value.focus()
  }
}

const strikethroughHandler = () => {
  restoreSelection()
  wrapSelection('~~')
  if (editorRef.value) {
    editorRef.value.focus()
  }
}

eventBus.$on('bold', () => boldHandler())
eventBus.$on('italic', () => italicHandler())
eventBus.$on('strikethrough', () => strikethroughHandler())

/**
 * @description 更新光标位置
 */
const updateCursorPosition = () => {
  const selection = window.getSelection()
  if (!selection || !selection.focusNode || !editorRef.value) return

  let node = selection.focusNode
  let offset = selection.focusOffset

  // Calculate column
  currentColumn.value = offset + 1

  // Calculate row
  let range = document.createRange()
  range.setStart(editorRef.value, 0)
  range.setEnd(node, 0)
  let content = range.cloneContents()
  let rows = content.textContent?.split('\n') || []
  currentRow.value = rows.length
}

onMounted(() => {
  document.addEventListener('selectionchange', updateCursorPosition)
  editorRef.value?.addEventListener('input', updateCursorPosition)
})

onBeforeUnmount(() => {
  eventBus.$off('bold', boldHandler)
  eventBus.$off('italic', italicHandler)
  eventBus.$off('strikethrough', strikethroughHandler)
})

onUnmounted(() => {
  document.removeEventListener('selectionchange', updateCursorPosition)
  editorRef.value?.removeEventListener('input', updateCursorPosition)
})
</script>

<template>
  <div class="rich-text-editor">
    <ToolBar />
    <div
      class="editor"
      contenteditable="true"
      @mouseup="saveSelection"
      @keyup="saveSelection"
      ref="editorRef"
    />
    <div class="status-bar">
      <div>行: {{ currentRow }}, 列: {{ currentColumn }}</div>
    </div>
  </div>
</template>

<style scoped>
.rich-text-editor {
  @apply relative rounded-sm border-2 w-full dark:bg-zinc-800 dark:text-white dark:border-gray-600;
}

.editor {
  @apply outline-none p-4 min-h-[400px];
}

.status-bar {
  @apply text-[12px] text-gray-500 p-2 border-2 dark:text-white border-t-gray-200 dark:bg-zinc-800 dark:border-gray-600;
}
</style>
