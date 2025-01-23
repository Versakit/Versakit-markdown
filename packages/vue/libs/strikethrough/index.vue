<script setup lang="ts">
import VerCode from '../../components/code/index.ts'
import VerIcon from '../../components/icon/index.ts'
import VerTooltip from '../../components/tooltip/index.ts'

import eventBus from '../../utils/eventBus.ts'

const handStrikeThrough = () => {
  eventBus.$emit('strikethrough')
}
</script>

<template>
  <VerTooltip content="文字删除线">
    <ver-code @click="handStrikeThrough">
      <VerIcon name="strikethrough" />
    </ver-code>
  </VerTooltip>
</template>
