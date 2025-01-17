<script setup lang="ts">
import { onBeforeUnmount, onMounted, onUnmounted, ref } from 'vue'
import ToolBar from './components/toolbar/index.vue'
import eventBus from '../utils/eventBus'
import { createWrapper } from '../utils/core'

defineOptions({ name: 'VerRichEditor' })

const editorRef = ref<HTMLElement | null>(null)
let savedSelection: Range | null = null
const currentRow = ref(1)
const currentColumn = ref(1)

/**
 * @author Jannik
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

const wrapSelection = (wrapper: HTMLElement) => {
  if (!savedSelection) return

  const content = savedSelection.extractContents()
  wrapper.appendChild(content)
  savedSelection.insertNode(wrapper)

  const newRange = document.createRange()
  newRange.selectNode(wrapper)
  const selection = window.getSelection()
  if (selection) {
    selection.removeAllRanges()
    selection.addRange(newRange)
    savedSelection = newRange
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

const boldHandler = (cmd: string) => {
  restoreSelection()

  switch (cmd) {
    case 'bold':
      wrapSelection(createWrapper('strong'))
      break
  }

  if (editorRef.value) {
    editorRef.value.focus()
  }
}

eventBus.$on('bold', () => boldHandler('bold'))

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
      <div class="position-info">
        行: {{ currentRow }}, 列: {{ currentColumn }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.rich-text-editor {
  @apply relative rounded-sm border-2 w-full;
}

.editor {
  @apply outline-none p-4 min-h-[400px];
}

.editor:focus {
  @apply bg-gray-50;
}

.status-bar {
  border-top: 1px solid #ccc;
  padding: 4px 8px;
  background: #f5f5f5;
  font-size: 12px;
  color: #666;
}

.position-info {
  font-family: monospace;
}
</style>
