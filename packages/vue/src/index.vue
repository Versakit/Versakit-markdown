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
// import type { RichProps } from './type'

defineOptions({ name: 'VerRichEditor' })

withDefaults(defineProps<any>(), {
  value: '',
})

const emit = defineEmits(['update:value']) // 触发更新事件

const updateValue = (newValue: string) => {
  emit('update:value', newValue) // 通知父组件更新值
}
</script>

<style scoped lang="scss">
.rich-text-editor {
  position: relative;
  border-radius: 0.125rem;
  border: 2px solid #e2e8f0;
  height: 100%;
  width: 100%;

  .dark & {
    background-color: #222;
    color: #fff;
    border-color: #4c5257;
  }
}
</style>
