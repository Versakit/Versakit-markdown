<script setup lang="ts">
import { VerRichEditor } from '@versakit/markdown-vue'
import { Parser } from '@versakit/markdown-parser'
import { RendererText, Renderer } from '@versakit/markdown-renderer'
import { useTheme } from '@versakit/markdown-theme'
import { ref, watch, onMounted, onUnmounted } from 'vue'
import '@versakit/markdown-vue/dist/markdown-vue.css'

// 创建响应式变量
const value = ref('')
const themeName = ref('default')
const ast = ref()
const diffContainer = ref<HTMLDivElement>()

// 创建解析器和渲染器实例
const parser = new Parser()
let diffRenderer: Renderer

onMounted(() => {
  if (diffContainer.value) {
    diffRenderer = new Renderer({
      container: diffContainer.value,
      ast: [],
    })
  }
})

useTheme('diffContainer', themeName.value)
// 监听输入的内容变化
const updateAST = () => {
  ast.value = parser.parseMarkdown(value.value)
}

// 监听value的变化,更新AST
watch(value, () => {
  updateAST()
  // preview.value = markdownRenderer.render(ast.value)
  // 更新 diff 渲染
  if (diffRenderer) {
    diffRenderer.update(ast.value)
  }
})
watch(themeName, () => {
  useTheme('diffContainer', themeName.value)
})

// 组件卸载时清理
onUnmounted(() => {
  if (diffRenderer) {
    diffRenderer.destroy()
  }
})
</script>

<template>
  <div class="container-box">
    <div class="chose">
      <select v-model="themeName">
        <option value="default">default</option>
        <option value="custom">custom</option>
      </select>
    </div>
    <div class="rich">
      <VerRichEditor v-model:value="value" />
    </div>
    <div class="preview">
      <div ref="diffContainer" id="diffContainer"></div>
    </div>
  </div>
</template>

<style scoped>
.container-box {
  position: relative;
  padding: 2rem;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: row;
}

.rich {
  min-height: 445px;
  width: 50%;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.preview {
  min-height: 445px;
  width: 50%;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 1rem;
}

.chose {
  position: absolute;
  top: -1rem;
  right: -1rem;
  background: #000;
  z-index: 999;
}

.preview h2,
.preview h3 {
  margin: 1rem 0;
  color: #333;
}

.preview span {
  display: block;
  margin: 0.5rem 0;
  word-break: break-all;
}
</style>
