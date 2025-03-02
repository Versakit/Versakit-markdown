<script setup>
import { VerRichEditor } from '@versakit/markdown-vue'
import { Parser } from '@versakit/markdown-parser'
import { RendererText, Renderer } from '@versakit/markdown-renderer'
import juejin from 'juejin-markdown-themes'
import { ref, watch, onMounted, onUnmounted } from 'vue'
import '@versakit/markdown-vue/dist/markdown-vue.css'

// 创建响应式变量
const value = ref('')
const themeName = ref('juejin')
const ast = ref()
const diffContainer = ref()
const themes = {
  juejin: '掘金',
  github: 'GitHub',
  smartblue: '智能蓝',
  cyanosis: '网格蓝',
  channing_cyan: '清新绿',
  fancy: '彩虹',
  hydrogen: '科技黑',
  condensed_night_purple: '凝夜紫',
  greenwillow: '绿柳青',
}

// 创建解析器和渲染器实例
const parser = new Parser()
let diffRenderer

const applyTheme = (container, theme) => {
  const targetElement = document.getElementById(container)
  if (!targetElement) return

  // 获取主题样式
  let themeStyle = juejin[theme] || juejin.juejin
  if (!themeStyle) {
    console.warn('主题未找到:', theme)
    return
  }

  // 清理旧样式
  targetElement.removeAttribute('style')

  // 将主题样式字符串转换为对象
  const styleObj = {}
  const styleStr = themeStyle.style || themeStyle
  if (typeof styleStr === 'string') {
    styleStr.split(';').forEach((item) => {
      const [key, value] = item.split(':')
      if (key && value) {
        styleObj[key.trim()] = value.trim()
      }
    })
  }

  // 应用主题样式
  Object.assign(targetElement.style, styleObj)

  // 添加基础样式
  Object.assign(targetElement.style, {
    width: '100%',
    height: '100%',
    overflow: 'auto',
    padding: '16px',
    boxSizing: 'border-box',
  })
}

// 监听输入的内容变化
const updateAST = () => {
  ast.value = parser.parseMarkdown(value.value)
}

// 监听value的变化,更新AST
watch(value, () => {
  updateAST()
  if (diffRenderer) {
    diffRenderer.update(ast.value)
  }
})

// 监听主题变化时，需要重新渲染内容
watch(themeName, () => {
  applyTheme('diffContainer', themeName.value)
  // 重新渲染内容
  if (diffRenderer && ast.value) {
    diffRenderer.update(ast.value)
  }
})

// 在组件挂载时确保应用初始主题
onMounted(() => {
  if (diffContainer.value) {
    diffRenderer = new Renderer({
      container: diffContainer.value,
      ast: [],
      options: {
        preferredTheme: themeName.value,
        sanitize: false,
        breaks: true,
      },
    })
    // 确保先应用主题
    applyTheme('diffContainer', themeName.value)
    // 如果有初始内容，再渲染
    if (value.value) {
      updateAST()
    }
  }
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
        <option v-for="(label, key) in themes" :key="key" :value="key">
          {{ label }}
        </option>
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
  position: relative;
  overflow: hidden;
  background: #fff; /* 确保预览区有背景色 */
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

.chose select {
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  background: #fff;
  outline: none;
}

.chose select:focus {
  border-color: #1890ff;
}

#diffContainer {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
}
</style>
