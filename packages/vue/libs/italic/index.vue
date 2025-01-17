<script setup lang="ts">
import VerCode from '../../components/code/index.ts'
import VerIcon from '../../components/icon/index.ts'
import VerTooltip from '../../components/tooltip/index.ts'
</script>

<template>
  <VerTooltip content="文字倾斜">
    <ver-code>
      <VerIcon name="italic" />
    </ver-code>
  </VerTooltip>
</template>
