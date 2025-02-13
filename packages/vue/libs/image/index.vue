<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'
import VerCode from '../../components/code/index'
import VerIcon from '../../components/icon/index'
import VerTooltip from '../../components/tooltip/index'
import store from '../../store/store'

// 创建编辑器DOM引用
const elRef = ref<HTMLElement | null>(null)

// 定义更新函数，处理状态更新时的逻辑
const customUpdateFunction = (observable: any) => {
  const state = observable.getState()
  elRef.value = state.editorRef
}

// 注册观察者到 store
const unsubscribe = store.attach(customUpdateFunction)

// 处理插入图片的点击事件
const handleImage = () => {
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
        // 构建Markdown图片格式，URL部分为空
        const imageText = `![${selectedText || 'img'}](url)`

        // 删除原有内容
        range.deleteContents()
        // 插入新的图片文本
        const textNode = document.createTextNode(imageText)
        range.insertNode(textNode)

        // 创建新的范围用于设置光标位置
        const newRange = document.createRange()
        // 设置光标位置到URL括号内
        const cursorPosition = selectedText ? selectedText.length + 4 : 7 // ![text]( 或 ![图片描述]( 的长度
        newRange.setStart(textNode, cursorPosition)
        newRange.setEnd(textNode, cursorPosition + 3) // url的长度

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

<template>
  <VerTooltip content="插入图片">
    <ver-code @click="handleImage">
      <VerIcon name="image" />
    </ver-code>
  </VerTooltip>
</template>
