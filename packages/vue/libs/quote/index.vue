<script setup lang="ts">
import VerCode from '../../components/code/index.ts'
import VerIcon from '../../components/icon/index.ts'
import VerTooltip from '../../components/tooltip/index.ts'
import eventBus from '../../utils/eventBus.ts'

const handQuote = () => {
  eventBus.$emit('quote')
}
</script>

<template>
  <VerTooltip content="引用">
    <ver-code @click="handQuote">
      <VerIcon name="quote" />
    </ver-code>
  </VerTooltip>
</template>
