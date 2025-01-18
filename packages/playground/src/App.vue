<script setup lang="ts">
import { VerRichEditor } from '@versakit/markdown-vue'
import MarkdownParser from '@versakit/markdown-parser'
import { ref, watch } from 'vue'

const value = ref('就是计算机技术')
const ast = ref()
const markdownParser = new MarkdownParser.Parser()

ast.value = markdownParser.parseMarkdown(value.value)

// 监听输入的内容变化
const updateAST = () => {
  ast.value = markdownParser.parseMarkdown(value.value)
}

// 监听value的变化,更新AST
watch(value, () => {
  updateAST()
})
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
