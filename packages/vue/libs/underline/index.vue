<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'
import VerCode from '../../components/code/index.ts'
import VerIcon from '../../components/icon/index.ts'
import VerTooltip from '../../components/tooltip/index.ts'
import store from '../../store/store.ts'

const elRef = ref<HTMLElement | null>(null)

// 定义更新函数，处理状态更新时的逻辑
const customUpdateFunction = (observable: any) => {
  const state = observable.getState()

  elRef.value = state.editorRef
}

// 注册观察者到 store
const unsubscribe = store.attach(customUpdateFunction)

// 模拟一个点击事件，触发数据传递
const handUnderline = () => {
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
        if (selectedText.startsWith('<u>') && selectedText.endsWith('</u>')) {
          // 如果已经加粗，还原
          const newText = selectedText.slice(2, -2)
          range.deleteContents()
          range.insertNode(document.createTextNode(newText))
        } else {
          // 如果未加粗，加粗
          const newText = `<u>${selectedText}</u>`
          range.deleteContents()
          const textNode = document.createTextNode(newText)
          range.insertNode(textNode)
        }
        // 重新设置选区
        selection.removeAllRanges()
        selection.addRange(range)
      }
    }
  }

  if (elRef.value) {
    // 通过 store 更新状态
    store.actions({ editorRef: elRef.value })
  }
}

onBeforeUnmount(() => {
  // 移除观察者，防止内存泄漏
  unsubscribe()
})
</script>

<template>
  <VerTooltip content="文字下划线">
    <ver-code @click="handUnderline">
      <VerIcon name="underline" />
    </ver-code>
  </VerTooltip>
</template>
