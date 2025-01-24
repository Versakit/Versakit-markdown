<template>
  <div class="ver-code">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.ver-code {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px;
  color: #888;
  cursor: pointer;

  &:hover {
    color: #000;
  }

  .dark & {
    color: #a0aec0;

    &:hover {
      color: #fff;
    }
  }
}
</style>
