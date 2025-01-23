<script setup lang="ts">
import { VerRichEditor } from '@versakit/markdown-vue'
import MarkdownParser from '@versakit/markdown-parser'
import MarKdownRenderer from '@versakit/markdown-renderer'
import { ref, watch } from 'vue'

const value = ref('')
const ast = ref()
const preview = ref()
const parser = new MarkdownParser.Parser()
const markdownRenderer = new MarKdownRenderer.Renderer()

// 监听输入的内容变化
const updateAST = () => {
  ast.value = parser.parseMarkdown(value.value)
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
      <h2>预览</h2>
      <span v-html="preview"></span>
    </div>
  </div>
</template>

<style scoped>
.container-box {
  padding: 1rem;
  display: flex;
  width: 100vw;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  height: 100vh;
  overflow: hidden;
}

.container {
  width: 50%;
}

.preview {
  width: 50%;
  height: 600px;
  border: 1px solid #c4c4c4;
}
</style>
