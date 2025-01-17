<template>
  <div class="ver-code">
    <slot />
  </div>
</template>

<style scoped lang="css">
.ver-code {
  @apply flex justify-center items-center p-1 text-gray-500 hover:text-black cursor-pointer;
}
</style>
