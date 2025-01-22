<script setup lang="ts">
import { ref, onMounted } from 'vue'
import VerCode from '../../components/code/index.ts'
import VerIcon from '../../components/icon/index.ts'
import VerTooltip from '../../components/tooltip/index.ts'
import { EventBus } from '../../utils/eventBus.ts'

const eventbus = new EventBus()
const El = ref<HTMLElement | null>()

const handBold = () => {
  // 确保 el 是一个 DOM 元素
  if (!(El.value instanceof Element)) {
    console.error('el 不是一个有效的 DOM 元素')
    return
  }
  const selection = window.getSelection()
  if (selection.rangeCount > 0) {
    const range = selection.getRangeAt(0)
    // 检查范围是否在 el 元素内
    if (El.value.contains(range.commonAncestorContainer)) {
      let selectedText = range.toString()
      // 检查是否已经加粗
      if (selectedText.startsWith('**') && selectedText.endsWith('**')) {
        // 移除加粗
        selectedText = selectedText.slice(2, -2)
      } else {
        // 添加加粗
        selectedText = `**${selectedText}**`
      }
      // 替换原范围的内容
      const newNode = document.createTextNode(selectedText)
      range.deleteContents()
      range.insertNode(newNode)
    }
  }
}

onMounted(() => {
  eventbus.$on('edit', (editorRef) => {
    console.log(editorRef)
    El.value = editorRef
  })
})
</script>

<template>
  <VerTooltip position="bottom" content="文字加粗">
    <ver-code @click="handBold">
      <ver-icon name="bold"></ver-icon>
    </ver-code>
  </VerTooltip>
</template>
