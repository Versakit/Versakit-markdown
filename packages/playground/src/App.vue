<script setup lang="ts">
import { VerRichEditor } from '@versakit/markdown-vue'
import MarkdownParser from '@versakit/markdown-parser'
import { ref } from 'vue'

const value = ref('')
const ast = ref()
const markdownParser = new MarkdownParser.Parser()

ast.value = markdownParser.parseMarkdown(value.value)
</script>

<template>
  <div class="container">
    <VerRichEditor v-model:value="value" />
    <div>输入的内容:{{ value }}</div>
    <div>AST转译的内容:{{ ast }}</div>
  </div>
</template>

<style scoped>
.container {
  width: 50%;
  margin: 50px auto;
}
</style>
