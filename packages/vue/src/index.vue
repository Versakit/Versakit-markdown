<script setup lang="ts">
import ToolBar from './components/toolbar/index.vue'
import Editor from './components/editor/index.vue'

defineOptions({ name: 'VerRichEditor' })
</script>

<template>
  <div class="rich-text-editor">
    <ToolBar />
    <Editor />
  </div>
</template>

<style scoped>
.rich-text-editor {
  @apply relative rounded-sm border-2 w-full dark:bg-zinc-800 dark:text-white dark:border-gray-600;
}
</style>
