<template>
  <VerTooltip content="插入表格">
    <ver-code @click="handTable">
      <VerIcon name="table" />
    </ver-code>
  </VerTooltip>
</template>

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

// 处理插入表格的点击事件
const handTable = () => {
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
        // 删除原有内容
        range.deleteContents()

        // 创建表格的每一行
        // const br0 = document.createElement('\n')
        const br0 = document.createTextNode('\n')
        const row1 = document.createTextNode('| 标题 |  |')
        // const br1 = document.createElement('\n')
        const br1 = document.createTextNode('\n')
        const row2 = document.createTextNode('| --- | --- |')
        // const br2 = document.createElement('\n')
        const br2 = document.createTextNode('\n')
        const row3 = document.createTextNode('|  |  |')
        // const br3 = document.createElement('\n')
        const br3 = document.createTextNode('\n')

        // 按顺序插入各个元素
        range.insertNode(br3)
        range.insertNode(row3)
        range.insertNode(br2)
        range.insertNode(row2)
        range.insertNode(br1)
        range.insertNode(row1)
        range.insertNode(br0)

        // 创建新的范围用于设置光标位置
        const newRange = document.createRange()
        // 设置光标位置到第一个单元格c
        newRange.setStart(row1, 2)
        newRange.setEnd(row1, 4)

        // 重新设置选区
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
