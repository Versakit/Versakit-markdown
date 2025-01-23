<script setup lang="ts">
import VerCode from '../../components/code/index.ts'
import VerIcon from '../../components/icon/index.ts'
import VerTooltip from '../../components/tooltip/index.ts'
import eventBus from '../../utils/eventBus.ts'

const handOrderlist = () => {
  eventBus.$emit('orderlist')
}
</script>

<template>
  <VerTooltip content="有序列表">
    <ver-code @click="handOrderlist">
      <VerIcon name="orderlist" />
    </ver-code>
  </VerTooltip>
</template>
