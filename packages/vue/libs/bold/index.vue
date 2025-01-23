<template>
  <VerTooltip position="top" content="文字加粗">
    <VerCode @click="handBold">
      <VerIcon name="bold" />
    </VerCode>
  </VerTooltip>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'
import VerCode from '../../components/code/index.ts'
import VerIcon from '../../components/icon/index.ts'
import VerTooltip from '../../components/tooltip/index.ts'
import store from '../../store/store.ts'
import eventBus from '../../utils/eventBus.ts'

const elRef = ref<HTMLElement | null>(null)
const editorRef = ref<HTMLElement | null>(null) // 编辑器元素

// 定义更新函数，处理状态更新时的逻辑
const customUpdateFunction = (observable: any) => {
  const state = observable.getState()
  elRef.value = state.editorRef
  // console.log('Index2.vue received data:', state)
}

// 注册观察者到 store
const unsubscribe = store.attach(customUpdateFunction)

// 模拟一个点击事件，触发数据传递
const handBold = () => {
  if (elRef.value) {
    const selection = window.getSelection()
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0)
      // 获取选区的祖先节点
      let ancestor = range.commonAncestorContainer
      // 如果祖先节点是文本节点，获取其父元素
      if (ancestor.nodeType === Node.TEXT_NODE) {
        ancestor = ancestor.parentNode as HTMLElement
      }
      // 检查祖先节点是否在 elRef 元素内
      if (elRef.value.contains(ancestor)) {
        const selectedText = range.toString()
        if (selectedText.startsWith('**') && selectedText.endsWith('**')) {
          // 如果已经加粗，还原
          const newText = selectedText.slice(2, -2)
          range.deleteContents()
          range.insertNode(document.createTextNode(newText))
        } else {
          // 如果未加粗，加粗
          const newText = `**${selectedText}**`
          range.deleteContents()
          const textNode = document.createTextNode(newText)
          range.insertNode(textNode)
        }
        // debugger
        // 重新设置选区
        selection.removeAllRanges()
        selection.addRange(range)
      }
    }
  }

  if (editorRef.value) {
    // 通过 store 更新状态
    store.actions({ editorRef: editorRef.value })
  }
  eventBus.$emit('updateValue')
}

onBeforeUnmount(() => {
  // 移除观察者，防止内存泄漏
  unsubscribe()
})
</script>
