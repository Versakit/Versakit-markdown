<script setup lang="ts">
import VerCode from '../../components/code/index.ts'
import VerIcon from '../../components/icon/index.ts'
import VerTooltip from '../../components/tooltip/index.ts'
import { Observer } from '../../utils/observer.ts'
import sharedObservable from '../../utils/sharedObservable.ts' // 引入单例实例

// 使用单例的 Observable 实例
const observable = sharedObservable

// 定义更新函数，不触发 Observable 的状态更新
const customUpdateFunction = (data: any) => {
  console.log(data.state.editorRef)
}

// 创建 Observer 实例
const observer = new Observer(customUpdateFunction)

// 将观察者附加到可观察对象
observable.attach(observer)

// 模拟一个点击事件，触发数据传递
const handBold = () => {
  const dataToSend = { message: 'This is some data from click event' }
  // 调用 Observable 的 actions 方法更新状态并通知观察者
  observable.actions(dataToSend)
}
</script>

<template>
  <VerTooltip position="top" content="文字加粗">
    <VerCode @click="handBold">
      <VerIcon name="bold" />
    </VerCode>
  </VerTooltip>
</template>
