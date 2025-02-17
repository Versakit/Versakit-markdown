<script setup lang="ts">
import { VerRichEditor } from '@versakit/markdown-vue' // Markdown 编辑器的 Vue 组件
import MarkdownParser from '@versakit/markdown-parser' // Markdown 解析器
import MarKdownRenderer from '@versakit/markdown-renderer' // Markdown 渲染器
import { ref, watch } from 'vue'

const value = ref('')
const ast = ref()
const preview = ref()
const parser = new MarkdownParser.Parser()
const markdownRenderer = new MarKdownRenderer()

// 监听输入的内容变化
const updateAST = () => {
  ast.value = parser.parseMarkdown(value.value)

  console.log(ast.value)
}

// 监听value的变化,更新AST
watch(value, () => {
  updateAST()
  preview.value = markdownRenderer.render(ast.value)

  console.log(preview.value)
})
</script>

<template>
  <div class="container-box">
    <div class="rich">
      <VerRichEditor v-model:value="value" />
    </div>
    <div style="border: 1px solid red; width: 50%; height: 600px">
      {{ value }}
    </div>

    <div class="preview">
      <h3>输入的内容</h3>
      <span>{{ value }}</span>

      <h3>AST</h3>
      <span>{{ ast }}</span>

      <h2>预览</h2>

      <span v-html="preview"></span>

      <h2>渲染器</h2>
      <span>{{ preview }}</span>

      <h2>result</h2>
      <div v-html="preview"></div>
    </div>
  </div>
</template>

<style scoped>
.container-box {
  padding: 2rem;
  display: flex;
  width: 100vw;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  height: 100vh;
  overflow: hidden;
  gap: 8px;
}

.rich {
  width: 50%;
  height: 100%;
}

.preview {
  width: 50%;
  height: 100%;
  border: 1px solid #c4c4c4;
  overflow-x: hidden;
}
</style>
