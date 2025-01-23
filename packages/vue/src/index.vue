<script setup lang="ts">
import {
  onBeforeUnmount,
  onMounted,
  onUpdated,
  onUnmounted,
  ref,
  useTemplateRef,
} from 'vue'
import ToolBar from './components/toolbar/index.vue'
import { Observer } from '../utils/observer.ts'
import sharedObservable from '../utils/sharedObservable.ts' // 引入单例实例

defineOptions({ name: 'VerRichEditor' })

// 先定义更新函数
const customUpdateFunction = (data: any) => {
  console.log('Received data:', data)
}

// 再实例化观察者
const observer = new Observer(customUpdateFunction)

// 使用单例的 Observable 实例
const observable = sharedObservable

// 将观察者注册到 Observable
observable.attach(observer)

const editorRef = useTemplateRef<HTMLElement | null>('editorRef')
const currentRow = ref(1)
const currentColumn = ref(1)

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

onUpdated(() => {
  if (editorRef.value) {
    // 通过 actions 方法将 editorRef 传递给 Observable
    observable.actions({ editorRef: editorRef.value })
  }
})

onBeforeUnmount(() => {})

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
