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
const handUnorderedList = () => {
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
        const selectedText = range.toString().trim() // 去除首尾空格

        // 检测是否已经是无序列表（以 "- " 开头）
        const isUnorderedList = /^\s*- \s/.test(selectedText)

        if (isUnorderedList) {
          // 如果已经是无序列表，移除符号
          const newText = selectedText.replace(/^\s*- \s/, '').trim() // 移除开头的 "- " 和空白字符
          range.deleteContents()
          range.insertNode(document.createTextNode(newText))
        } else {
          // 如果不是无序列表，添加符号
          const newText = `- ${selectedText}`
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
  <VerTooltip content="无序列表">
    <VerCode @click="handUnorderedList">
      <VerIcon name="unorderlist" />
    </VerCode>
  </VerTooltip>
</template>
