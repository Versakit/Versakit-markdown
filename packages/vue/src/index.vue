<template>
  <div>
    <div class="rich-text-editor">
      <ToolBar />
      <div class="editor" contenteditable="true" ref="editorRef" />

      <div class="status-bar">
        <div>行: {{ currentRow }}, 列: {{ currentColumn }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, onUpdated, onUnmounted, ref } from 'vue'
import ToolBar from './components/toolbar/index.vue'
import store from '../store/store'
import type { RichProps } from './type.ts'

defineOptions({ name: 'VerRichEditor' })

const editorRef = ref<HTMLElement | null>(null)
const currentRow = ref(1)
const currentColumn = ref(1)

withDefaults(defineProps<RichProps>(), {
  value: '',
})

const emit = defineEmits(['update:value'])

// 更新光标位置
const updateCursorPosition = () => {
  const selection = window.getSelection()
  if (!selection || !selection.focusNode || !editorRef.value) return

  let node = selection.focusNode
  let offset = selection.focusOffset

  // 更新列号
  currentColumn.value = offset + 1

  // 从编辑器的根节点开始遍历
  let currentNode = editorRef.value.firstChild
  let row = 1 // 初始行号为 1

  // 遍历所有节点，直到到达光标所在的节点
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

  // 更新行号
  currentRow.value = row
}

// 定义更新函数，处理状态更新时的逻辑
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const customUpdateFunction = (_observable: any) => {
  const textContent = editorRef.value?.textContent || ''

  emit('update:value', textContent)
}

// 注册观察者到 store
const unsubscribe = store.attach(customUpdateFunction)

// 生命周期钩子
onMounted(() => {
  document.addEventListener('selectionchange', updateCursorPosition)
  editorRef.value?.addEventListener('input', updateCursorPosition)
})

onUpdated(() => {
  if (editorRef.value) {
    store.actions({ editorRef: editorRef.value })
  }
})

onBeforeUnmount(() => {
  unsubscribe()
})

onUnmounted(() => {
  document.removeEventListener('selectionchange', updateCursorPosition)
  editorRef.value?.removeEventListener('input', updateCursorPosition)
})
</script>

<style scoped>
.rich-text-editor {
  @apply relative rounded-sm border-2 h-full w-full dark:bg-zinc-800 dark:text-white dark:border-gray-600;
}

.editor {
  @apply outline-none p-4 min-h-[400px];
}

.status-bar {
  @apply absolute bottom-0 left-0 w-full text-[12px] text-gray-500 p-2  dark:text-white  dark:bg-zinc-800 dark:border-gray-600;
}
</style>
