<template>
  <div>
    <div class="rich-text-editor">
      <ToolBar />

      <Editor :value="value" @update:value="updateValue" />
    </div>
  </div>
</template>

<script setup lang="ts">
import ToolBar from './components/toolbar/index.vue'
import Editor from './components/editor/index.vue'
import type { RichProps } from './type'

defineOptions({ name: 'VerRichEditor' })

withDefaults(defineProps<RichProps>(), {
  value: '',
})

const emit = defineEmits(['update:value']) // 触发更新事件

const updateValue = (newValue: string) => {
  emit('update:value', newValue) // 通知父组件更新值
}
</script>

<style scoped>
.rich-text-editor {
  @apply relative rounded-sm border-2 h-full w-full dark:bg-zinc-800 dark:text-white dark:border-gray-600;
}
</style>
