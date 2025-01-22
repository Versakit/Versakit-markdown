<script setup lang="ts">
import { ref, onMounted } from 'vue'
import VerCode from '../../components/code/index.ts'
import VerIcon from '../../components/icon/index.ts'
import VerTooltip from '../../components/tooltip/index.ts'

const El = ref<HTMLElement | null>(null)

const handBold = () => {
  if (El.value) {
    let value = El.value.textContent || ''
    // 检查是否已经加粗
    if (value.startsWith('**') && value.endsWith('**')) {
      // 移除加粗
      value = value.slice(2, -2)
    } else {
      // 添加加粗
      value = `**${value}**`
    }
    El.value.textContent = value
  }
}

onMounted(() => {
  El.value = document.querySelector('#edit') as HTMLElement
})
</script>

<template>
  <VerTooltip position="top" content="文字加粗">
    <ver-code @click="handBold">
      <ver-icon name="bold"></ver-icon>
    </ver-code>
  </VerTooltip>
</template>
