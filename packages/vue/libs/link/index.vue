<template>
  <VerTooltip content="插入链接">
    <ver-code @click="handLink">
      <VerIcon name="link" />
    </ver-code>
  </VerTooltip>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'
import VerCode from '../../components/code/index.ts'
import VerIcon from '../../components/icon/index.ts'
import VerTooltip from '../../components/tooltip/index.ts'
import store from '../../store/store.ts'
// import eventBus from '../../utils/eventBus.ts'

const elRef = ref<HTMLElement | null>(null)

// 定义更新函数，处理状态更新时的逻辑
const customUpdateFunction = (observable: any) => {
  const state = observable.getState()
  elRef.value = state.editorRef
}

// 注册观察者到 store
const unsubscribe = store.attach(customUpdateFunction)

// 处理插入链接的点击事件
const handLink = () => {
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
        // 构建Markdown链接格式，URL部分为空
        const linkText = `[${selectedText}](url)`

        // 删除原有内容
        range.deleteContents()
        // 插入新的链接文本
        const textNode = document.createTextNode(linkText)
        range.insertNode(textNode)

        // 创建新的范围用于设置光标位置
        const newRange = document.createRange()
        // 设置光标位置到URL括号内
        newRange.setStart(textNode, selectedText.length + 3) // [text]( 的长度
        newRange.setEnd(textNode, selectedText.length + 6)

        // 重新设置选区到URL位置
        selection.removeAllRanges()
        selection.addRange(newRange)
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
