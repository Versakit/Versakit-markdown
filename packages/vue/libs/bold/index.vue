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

const elRef = ref()
const editorRef = ref<HTMLElement | null>(null)

// 定义更新函数，处理状态更新时的逻辑
const customUpdateFunction = (observable: any) => {
  const state = observable.getState()
  elRef.value = state.editorRef
  console.log('Index2.vue received data:', state)
}

// 注册观察者到 store
const unsubscribe = store.attach(customUpdateFunction)

// 模拟一个点击事件，触发数据传递
const handBold = () => {
  if (elRef.value) {
    const text = elRef.value.textContent
    if (text) {
      if (text.startsWith('**') && text.endsWith('**')) {
        // 如果已经加粗，还原
        elRef.value.textContent = text.slice(2, -2)
      } else {
        // 如果未加粗，加粗
        elRef.value.textContent = `**${text}**`
      }
    }
  }

  if (editorRef.value) {
    // 通过 store 更新状态
    store.actions({ editorRef: editorRef.value })
  }
}

onBeforeUnmount(() => {
  // 移除观察者，防止内存泄漏
  unsubscribe()
})
</script>
