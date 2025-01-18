<script setup lang="ts">
import VerCode from '../../components/code/index.ts'
import VerIcon from '../../components/icon/index.ts'
import VerTooltip from '../../components/tooltip/index.ts'
import eventBus from '../../utils/eventBus.ts'

const handH2 = () => {
  eventBus.$emit('h2')
}
</script>

<template>
  <VerTooltip content="二级标题">
    <ver-code @click="handH2">
      <VerIcon name="h2" />
    </ver-code>
  </VerTooltip>
</template>
