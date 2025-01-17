<template>
  <div class="rich-text-editor">
    <ToolBar />

    <div class="editor" contenteditable="true" ref="editorRef" />

    <div class="status-bar">
      <div class="position-info">
        行: {{ currentRow }}, 列: {{ currentColumn }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ToolBar from './components/toolbar/index.vue'

defineOptions({ name: 'VerRichEditor' })

const currentRow = ref(1)
const currentColumn = ref(1)
</script>

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
