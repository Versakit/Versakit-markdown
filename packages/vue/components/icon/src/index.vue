<script setup lang="ts">
import { computed } from 'vue'
import type { IconsProps } from '../type/index'

defineOptions({ name: 'VerIcon', inheritAttrs: false })

const props = withDefaults(defineProps<IconsProps>(), {
  name: '',
  size: 14,
  color: '',
})

const size = props.size + 'px'

const IconName = computed(() => {
  return `#icon-${props.name}`
})
</script>

<template>
  <svg
    class="ver-icon"
    aria-hidden="true"
    :style="{
      width: size,
      height: size,
      color: props.color,
    }"
  >
    <use :xlink:href="IconName"></use>
  </svg>
</template>

<style lang="css" scoped src="../style/index.css"></style>
