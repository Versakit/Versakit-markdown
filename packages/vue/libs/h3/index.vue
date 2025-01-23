<script setup lang="ts">
import VerCode from '../../components/code/index.ts'
import VerIcon from '../../components/icon/index.ts'
import VerTooltip from '../../components/tooltip/index.ts'
import eventBus from '../../utils/eventBus.ts'

const handH3 = () => {
  eventBus.$emit('h3')
}
</script>

<template>
  <VerTooltip content="三级标题">
    <ver-code @click="handH3">
      <VerIcon name="h3" />
    </ver-code>
  </VerTooltip>
</template>
