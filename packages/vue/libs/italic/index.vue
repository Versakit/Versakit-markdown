<script setup lang="ts">
import VerCode from '../../components/code/index.ts'
import VerIcon from '../../components/icon/index.ts'
import VerTooltip from '../../components/tooltip/index.ts'
import eventBus from '../../utils/eventBus.ts'

const handItalic = () => {
  eventBus.$emit('italic')
}
</script>

<template>
  <VerTooltip position="bottom" content="文字倾斜">
    <ver-code @click="handItalic">
      <VerIcon name="italic" />
    </ver-code>
  </VerTooltip>
</template>
