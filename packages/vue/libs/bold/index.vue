<script setup lang="ts">
import VerCode from '../../components/code/index.ts'
import VerIcon from '../../components/icon/index.ts'
import VerTooltip from '../../components/tooltip/index.ts'
import eventBus from '../../utils/eventBus.ts'

const handBold = () => {
  eventBus.$emit('bold')
}
</script>

<template>
  <VerTooltip content="文字加粗">
    <ver-code @click="handBold">
      <ver-icon name="bold"></ver-icon>
    </ver-code>
  </VerTooltip>
</template>
