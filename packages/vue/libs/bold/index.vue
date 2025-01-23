<script setup lang="ts">
import { ref } from 'vue'
import VerCode from '../../components/code/index.ts'
import VerIcon from '../../components/icon/index.ts'
import VerTooltip from '../../components/tooltip/index.ts'
import { Observer } from '../../utils/observer.ts'
import sharedObservable from '../../utils/sharedObservable.ts' // 引入单例实例

// 使用单例的 Observable 实例
const observable = sharedObservable
const elRef = ref()

// 定义更新函数，不触发 Observable 的状态更新
const customUpdateFunction = (data: any) => {
  elRef.value = data.state.editorRef
}

// 创建 Observer 实例
const observer = new Observer(customUpdateFunction)

// 将观察者附加到可观察对象
observable.attach(observer)

// 通过 ref 获取编辑器元素
const editorRef = ref<HTMLElement | null>(null)

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
    // 将 editorRef 传递给 observable.actions
    observable.actions({ editorRef: editorRef.value })
  }
}
</script>

<template>
  <VerTooltip position="top" content="文字加粗">
    <VerCode @click="handBold">
      <VerIcon name="bold" />
    </VerCode>
  </VerTooltip>
</template>
