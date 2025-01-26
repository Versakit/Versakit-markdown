<template>
  <div>
    <div class="editor" contenteditable="plaintext-only" ref="editorRef" />
    <div class="status-bar">
      <div>行: {{ currentRow }}, 列: {{ currentColumn }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import store from '../../../store/store.ts'
import type { RichProps } from '../../type.ts'
import UndoRedoManager from '../../../utils/undoRedoManager.ts' // 确保路径正确

const editorRef = ref<HTMLElement | null>(null)
const currentRow = ref(1)
const currentColumn = ref(1)

withDefaults(defineProps<RichProps>(), {
  value: '',
})

const emit = defineEmits(['update:value']) // 触发更新事件

// 更新光标位置
const updateCursorPosition = () => {
  const selection = window.getSelection()
  if (!selection || !selection.focusNode || !editorRef.value) return

  let node = selection.focusNode
  let offset = selection.focusOffset

  currentColumn.value = offset + 1

  let currentNode = editorRef.value.firstChild
  let row = 1

  while (currentNode && currentNode !== node) {
    if (currentNode.nodeType === Node.ELEMENT_NODE) {
      const element = currentNode as HTMLElement
      if (
        element.tagName.toLowerCase() === 'p' ||
        element.tagName.toLowerCase() === 'div' ||
        element.tagName.toLowerCase() === 'br'
      ) {
        row++
      }
    }
    currentNode = currentNode.nextSibling
  }

  currentRow.value = row
}

// 定义更新函数，处理状态更新时的逻辑
const customUpdateFunction = () => {
  const textContent = editorRef.value?.textContent || ''
  console.log(editorRef.value.innerText)

  // 更新父组件的 value
  emit('update:value', textContent)
}

// 注册观察者到 store
const unsubscribe = store.attach(customUpdateFunction)

// 初始化 UndoRedoManager
const undoRedoManager = ref<UndoRedoManager | null>(null)

// 生命周期钩子
onMounted(() => {
  if (editorRef.value) {
    store.actions({ editorRef: editorRef.value })

    // 初始化 UndoRedoManager
    undoRedoManager.value = new UndoRedoManager(editorRef.value)

    document.addEventListener('selectionchange', updateCursorPosition)
    editorRef.value.addEventListener('input', customUpdateFunction)

    // 监听键盘事件
    document.addEventListener('keydown', (event) => {
      if (event.ctrlKey) {
        if (event.key === 'z') {
          event.preventDefault() // 阻止默认行为
          undoRedoManager.value?.undo()
        } else if (event.key === 'y') {
          event.preventDefault() // 阻止默认行为
          undoRedoManager.value?.redo()
        }
      }
    })
  }
})

onUnmounted(() => {
  document.removeEventListener('selectionchange', updateCursorPosition)
  editorRef.value?.removeEventListener('input', customUpdateFunction)
  unsubscribe()
})
</script>

<style lang="scss" scoped src="./index.scss"></style>
