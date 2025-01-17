<script setup lang="ts">
import {
  H1,
  H2,
  H3,
  Bold,
  Italic,
  Underline,
  StrikeThrough,
  OrderList,
  UnOrderList,
  Quote,
  Code,
  Link,
  Image,
  Table,
  Video,
  Audio,
} from '../../../libs/index'
</script>

<template>
  <div class="toolbar">
    <div class="toolbar-group">
      <H1 />
      <H2 />
      <H3 />
    </div>

    <div class="toolbar-group">
      <Bold />

      <Italic />

      <Underline />

      <StrikeThrough />
    </div>

    <div class="toolbar-group">
      <UnOrderList />

      <OrderList />

      <Quote />

      <Code />
    </div>

    <div class="toolbar-group">
      <Link />

      <Image />

      <Table />

      <Video />

      <Audio />
    </div>
  </div>
</template>

<style scoped lang="css">
.toolbar {
  @apply p-2 border-b-2 border-gray-200 flex flex-wrap gap-2 dark:bg-zinc-800 dark:border-gray-600;
}

.toolbar-group {
  @apply flex gap-2 px-1 border-r-2 border-r-gray-200 justify-center items-center dark:border-gray-600;
}

.toolbar-group:last-child {
  @apply border-r-0;
}
</style>
