<script setup lang="ts">
import VerCode from '../../components/code/index.ts'
import VerIcon from '../../components/icon/index.ts'
import VerTooltip from '../../components/tooltip/index.ts'
</script>

<template>
  <VerTooltip content="三级标题">
    <ver-code>
      <VerIcon name="h3" />
    </ver-code>
  </VerTooltip>
</template>
