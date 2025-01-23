<script setup lang="ts">
import VerCode from '../../components/code/index.ts'
import VerIcon from '../../components/icon/index.ts'
import VerTooltip from '../../components/tooltip/index.ts'
import eventBus from '../../utils/eventBus.ts'

const handUnorderlist = () => {
  eventBus.$emit('unorderlist')
}
</script>

<template>
  <VerTooltip content="无序列表">
    <ver-code @click="handUnorderlist">
      <VerIcon name="unorderlist" />
    </ver-code>
  </VerTooltip>
</template>
