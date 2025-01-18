<script setup lang="ts">
import VerCode from '../../components/code/index.ts'
import VerIcon from '../../components/icon/index.ts'
import VerTooltip from '../../components/tooltip/index.ts'
import eventBus from '../../utils/eventBus.ts'

const handH1 = () => {
  eventBus.$emit('h1')
}
</script>

<template>
  <VerTooltip content="一级标题">
    <ver-code @click="handH1">
      <VerIcon name="h1" />
    </ver-code>
  </VerTooltip>
</template>
