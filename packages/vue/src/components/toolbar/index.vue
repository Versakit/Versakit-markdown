<script setup lang="ts">
import {
  H1,
  H2,
  H3,
  Bold,
  Italic,
  StrikeThrough,
  OrderList,
  UnOrderList,
  Quote,
  Code,
  Link,
  Image,
  Table,
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
    </div>
  </div>
</template>

<style scoped lang="scss">
.toolbar {
  padding: 8px;
  border-bottom: 2px solid #e2e8f0;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  .dark & {
    background-color: #222;
    border-bottom-color: #4c5257;
  }
}

.toolbar-group {
  display: flex;
  gap: 8px; // gap-2
  padding-left: 4px;
  padding-right: 4px; // px-1
  border-right: 2px solid #e2e8f0; // border-r-2 border-r-gray-200
  justify-content: center;
  align-items: center;

  .dark & {
    border-right-color: #4c5257; // dark:border-gray-600
  }

  &:last-child {
    border-right-width: 0; // border-r-0
  }
}
</style>
