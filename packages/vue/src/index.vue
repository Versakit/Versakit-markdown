<template>
  <div class="rich-text-editor">
    <ToolBar />
    <div
      class="editor"
      @input="updateValue"
      @blur="updateValue"
      contenteditable="true"
      ref="editorRef"
    >
      <!-- <div></div> -->
    </div>
    <div class="status-bar">
      <div>行: {{ currentRow }}, 列: {{ currentColumn }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  onBeforeUnmount,
  onMounted,
  onUpdated,
  onUnmounted,
  ref,
  useTemplateRef,
  defineEmits,
} from 'vue'
import ToolBar from './components/toolbar/index.vue'
import store from '../store/store'
import eventBus from '../utils/eventBus.ts'

defineOptions({ name: 'VerRichEditor' })

const editorRef = useTemplateRef<HTMLElement | null>('editorRef')
const currentRow = ref(1)
const currentColumn = ref(1)
const emit = defineEmits(['update:value'])

const updateValue = () => {
  // debugger
  emit('update:value', editorRef.value?.innerText)
  console.log('updateValue', editorRef.value?.innerText)
}

// 更新光标位置
const updateCursorPosition = () => {
  // debugger
  // 获取当前选区信息
  const selection = window.getSelection()
  if (!selection || !selection.focusNode || !editorRef.value) return
  // debugger
  let node = selection.focusNode
  let offset = selection.focusOffset
  // 计算光标偏移量
  currentColumn.value = offset + 1
  // 通过Range API计算行数
  let range = document.createRange()
  range.setStart(editorRef.value, 0)
  range.setEnd(node, 0)
  let content = range.cloneContents()
  let rows = content.textContent?.split('\n') || []
  currentRow.value = rows.length
}

// 定义更新函数，处理状态更新时的逻辑
const customUpdateFunction = (observable: any) => {
  console.log('Index.vue received data:', observable.getState())
}

// 注册观察者到 store
const unsubscribe = store.attach(customUpdateFunction)

// 生命周期钩子
onMounted(() => {
  eventBus.$on('updateValue', () => {
    // updateValue()
    updateValue()
  })
  document.addEventListener('selectionchange', updateCursorPosition)
  editorRef.value?.addEventListener('input', updateCursorPosition)
})

onUpdated(() => {
  if (editorRef.value) {
    // 通过 store 更新状态
    store.actions({ editorRef: editorRef.value })
  }
})

onBeforeUnmount(() => {
  // 移除观察者，防止内存泄漏
  unsubscribe()
})

onUnmounted(() => {
  document.removeEventListener('selectionchange', updateCursorPosition)
  editorRef.value?.removeEventListener('input', updateCursorPosition)
})
</script>

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
