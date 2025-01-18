<script setup lang="ts">
import VerCode from '../../components/code/index.ts'
import VerIcon from '../../components/icon/index.ts'
import VerTooltip from '../../components/tooltip/index.ts'
</script>

<template>
  <VerTooltip position="bottom" content="插入表格">
    <ver-code>
      <VerIcon name="table" />
    </ver-code>
  </VerTooltip>
</template>
