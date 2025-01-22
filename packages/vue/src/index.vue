<script setup lang="ts">
import ToolBar from './components/toolbar/index.vue'
import {
  nextTick,
  onBeforeMount,
  onBeforeUnmount,
  onMounted,
  onUnmounted,
  ref,
  useTemplateRef,
} from 'vue'
import type { RichEditorProps } from './type/index.ts'
import { EventBus } from '../utils/eventBus.ts'

defineOptions({ name: 'VerRichEditor' })

const editorRef = useTemplateRef<HTMLElement | null>('editorRef')
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let savedSelection: Range | null = null
const currentRow = ref(1)
const currentColumn = ref(1)
const eventbus = new EventBus()

withDefaults(defineProps<RichEditorProps>(), {
  value: '',
})

const emit = defineEmits<{
  (event: 'update:value', value: string): void
}>()

const handleInput = () => {
  if (editorRef.value) {
    const newValue = editorRef.value.innerHTML
    emit('update:value', newValue)
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

onBeforeMount(() => {
  nextTick(() => {
    eventbus.$emit('edit', editorRef.value)
  })
})

onMounted(() => {
  document.addEventListener('selectionchange', updateCursorPosition)
  editorRef.value?.addEventListener('input', updateCursorPosition)
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
      id="edit"
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
