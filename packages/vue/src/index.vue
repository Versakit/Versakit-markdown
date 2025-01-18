<script setup lang="ts">
import ToolBar from './components/toolbar/index.vue'
import {
  onBeforeUnmount,
  onMounted,
  onUnmounted,
  ref,
  useTemplateRef,
} from 'vue'
import { applyMarkdownSyntax } from '../utils/core'
import eventBus from '../utils/eventBus'
import type { RichEditorProps } from './type/index.ts'

defineOptions({ name: 'VerRichEditor' })

const editorRef = useTemplateRef<HTMLElement | null>('editorRef')
let savedSelection: Range | null = null
const currentRow = ref(1)
const currentColumn = ref(1)
const eventMap = new Map([
  ['bold', '**'],
  ['italic', '*'],
  ['strikethrough', '~~'],
  ['code', '`'],
  ['h3', '###'],
])

withDefaults(defineProps<RichEditorProps>(), {
  value: '',
})

const emit = defineEmits<{
  (event: 'update:value', value: string): void
}>()

const handleInput = () => {
  if (editorRef.value) {
    const newValue = editorRef.value.innerHTML
    // 触发 update:value 事件，将新值传递回 VerRichEditor
    emit('update:value', newValue)
  }
}

/**
 * @author Jannik
 * @time 2025/1/17
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
 * @author Jannik
 * @time 2025/1/17
 * @description 封装光标位置并应用 Markdown 语法
 * @param {String} cmd
 */
const wrapSelection = (cmd: string) => {
  if (!savedSelection) return

  const selection = window.getSelection()
  if (selection && selection.rangeCount > 0) {
    const range = selection.getRangeAt(0)
    // 提取选中的文本
    const selectedText = range.extractContents()
    // 调用新的方法应用 Markdown 语法
    const wrappedText = applyMarkdownSyntax(cmd, selectedText)
    // 将处理后的文档片段插入到选区中
    range.insertNode(wrappedText)
    // 更新 savedSelection 为新的范围
    savedSelection = range.cloneRange()
  }
}

/**
 * @author Jannik
 * @time 2025/1/17
 * @description 保存选区
 */
const saveSelection = () => {
  const selection = window.getSelection()
  if (selection && selection.rangeCount > 0) {
    savedSelection = selection.getRangeAt(0).cloneRange()
  }
}

/**
 * @author Jannik
 * @time 2025/1/17
 * @description 恢复选区
 * @param {Stirng} cmd
 */
const markdownHandler = (cmd: string) => {
  restoreSelection()
  wrapSelection(cmd)
  if (editorRef.value) {
    editorRef.value.focus()
  }
}

eventMap.forEach((cmd, eventName) => {
  eventBus.$on(eventName, () => markdownHandler(cmd))
})

/**
 * @author Jannik
 * @time 2025/1/17
 * @description 更新光标位置
 */
const updateCursorPosition = () => {
  const selection = window.getSelection()
  if (!selection || !selection.focusNode || !editorRef.value) return

  let node = selection.focusNode
  let offset = selection.focusOffset

  currentColumn.value = offset + 1

  let range = document.createRange()
  range.setStart(editorRef.value, 0)
  range.setEnd(node, 0)
  let content = range.cloneContents()
  let rows = content.textContent?.split('\n') || []
  currentRow.value = rows.length
}

/**
 * @author Jannik
 * @time 2025/1/17
 * @description 生命周期
 */
onMounted(() => {
  document.addEventListener('selectionchange', updateCursorPosition)
  editorRef.value?.addEventListener('input', updateCursorPosition)
})

onBeforeUnmount(() => {
  eventMap.forEach((cmd, eventName) => {
    eventBus.$off(eventName, () => markdownHandler(cmd))
  })
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
      ref="editorRef"
      contenteditable="true"
      @mouseup="saveSelection"
      @keyup="saveSelection"
      @input="handleInput"
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
