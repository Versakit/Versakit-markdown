<script setup lang="ts">
import { VerRichEditor } from '@versakit/markdown-vue'
import MarkdownParser from '@versakit/markdown-parser'
import { ref } from 'vue'

const value = ''
const ast = ref()
const markdownParser = new MarkdownParser.Parser()

ast.value = markdownParser.parseMarkdown(value)
</script>

<template>
  <div class="container">
    <VerRichEditor v-model:value="value" />
    {{ ast }}
  </div>
</template>

<style scoped>
.container {
  width: 50%;
  margin: 50px auto;
}
</style>
