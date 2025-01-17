<script setup lang="ts">
import VerCode from '../../components/code/index.ts'
import VerIcon from '../../components/icon/index.ts'
import VerTooltip from '../../components/tooltip/index.ts'
</script>

<template>
  <VerTooltip content="插入链接">
    <ver-code>
      <VerIcon name="link" />
    </ver-code>
  </VerTooltip>
</template>
