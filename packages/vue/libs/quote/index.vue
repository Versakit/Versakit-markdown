<script setup lang="ts">
import VerCode from '../../components/code/index.ts'
import VerIcon from '../../components/icon/index.ts'
import VerTooltip from '../../components/tooltip/index.ts'
</script>

<template>
  <VerTooltip content="引用">
    <ver-code>
      <VerIcon name="quote" />
    </ver-code>
  </VerTooltip>
</template>
