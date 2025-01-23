<script setup lang="ts">
import VerCode from '../../components/code/index.ts'
import VerIcon from '../../components/icon/index.ts'
import VerTooltip from '../../components/tooltip/index.ts'
import eventBus from '../../utils/eventBus.ts'

const handUnderline = () => {
  eventBus.$emit('underline')
}
</script>

<template>
  <VerTooltip content="文字下划线">
    <ver-code @click="handUnderline">
      <VerIcon name="underline" />
    </ver-code>
  </VerTooltip>
</template>
