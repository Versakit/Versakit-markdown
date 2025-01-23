<script setup lang="ts">
import VerCode from '../../components/code/index.ts'
import VerIcon from '../../components/icon/index.ts'
import VerTooltip from '../../components/tooltip/index.ts'
import eventBus from '../../utils/eventBus.ts'

const handCode = () => {
  eventBus.$emit('code')
}
</script>

<template>
  <VerTooltip content="代码块">
    <ver-code @click="handCode">
      <VerIcon name="code" />
    </ver-code>
  </VerTooltip>
</template>
