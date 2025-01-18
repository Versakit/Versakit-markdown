<script setup lang="ts">
import { VerRichEditor } from '@versakit/markdown-vue'
import MarkdownParser from '@versakit/markdown-parser'
import MarKdownRenderer from '@versakit/markdown-renderer'
import { ref, watch } from 'vue'

const value = ref('')
const ast = ref()
const preview = ref()
const markdownParser = new MarkdownParser.Parser()
const markdownRenderer = new MarKdownRenderer.Renderer()

// 监听输入的内容变化
const updateAST = () => {
  ast.value = markdownParser.parseMarkdown(value.value)
}

// 监听value的变化,更新AST
watch(value, () => {
  updateAST()
  preview.value = markdownRenderer.render(ast.value)
})
</script>

<template>
  <div class="container-box">
    <div class="container">
      <VerRichEditor v-model:value="value" />
    </div>

    <div class="preview">
      <h3>预览</h3>
      <span v-html="preview"></span>
    </div>
  </div>
</template>

<style scoped>
.container-box {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  height: 100vh;
}

.container {
  width: 50%;
}

.preview {
  width: 50%;
  height: 1000px;
  border: 1px solid #c4c4c4;
}
</style>
