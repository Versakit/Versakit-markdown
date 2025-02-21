<template>
  <div class="container-box">
    <div class="rich">
      <VerRichEditor v-model:value="value" />
    </div>

    <div class="preview markdown-body">
      <h3>输入的内容</h3>
      <span>{{ value }}</span>

      <h3>AST</h3>
      <span>{{ ast }}</span>

      <h2>预览</h2>
      <span v-html="preview"></span>

      <h2>diff预览</h2>
      <div ref="diffContainer"></div>

      <h2>渲染器</h2>
      <span>{{ preview }}</span>

      <h2>result</h2>
      <div v-html="preview"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { VerRichEditor } from '@versakit/markdown-vue'
import { Parser } from '@versakit/markdown-parser'
import { Renderer } from '@versakit/markdown-renderer'
import { ref, watch, onMounted, onUnmounted } from 'vue'
import cyanosisCss from './css/cyanosis.css?raw'
import smartBlueCSS from './css/smart-blue.css?raw'
import channingCyanCSS from './css/channing-cyan.css?raw'
import condensedNightPurpleCSS from './css/condensed-night-purple.css?raw'
import fancyCSS from './css/fancy.css?raw'
import hydrogenCSS from './css/hydrogen.css?raw'

const value = ref('')
const ast = ref()
// const preview = ref()
const diffContainer = ref<HTMLDivElement>()
const parser = new Parser()
// const markdownRenderer = new RendererText()
let diffRenderer: Renderer

onMounted(() => {
  if (diffContainer.value) {
    diffRenderer = new Renderer({
      container: diffContainer.value,
      ast: [],
    })
  }
  switchTheme('smartblue')
})

const mapTheme = new Map([
  ['smartblue', smartBlueCSS],
  ['cyanosis', cyanosisCss],
  ['channingcyan', channingCyanCSS],
  ['condensednightpurple', condensedNightPurpleCSS],
  ['fancy', fancyCSS],
  ['hydrogen', hydrogenCSS],
])
// 监听输入的内容变化
const updateAST = () => {
  ast.value = parser.parseMarkdown(value.value)
  console.log(ast.value)
  console.log(ast.value[0])
  if (ast.value !== undefined && ast.value[0].type === 'theme') {
    const themeName = ast.value[0].value
    if (mapTheme.has(themeName)) {
      switchTheme(themeName)
    } else {
      switchTheme('smartblue')
    }
  }
}

// 切换主题
const switchTheme = (themeName: string): HTMLStyleElement | null => {
  console.log('切换主题', themeName) //要设置默认主题
  if (!mapTheme.has(themeName)) return null

  const preView = document.querySelector('.preview')
  let styleTag = document.querySelector(
    'style[data-theme]',
  ) as HTMLStyleElement | null
  if (!styleTag) {
    styleTag = document.createElement('style')
    styleTag.setAttribute('data-theme', 'true')
    if (preView) {
      preView.appendChild(styleTag)
    }
  }

  const themeCss = mapTheme.get(themeName)
  if (themeCss !== undefined) {
    console.log('切换主题', themeCss)
    styleTag.textContent = themeCss
    console.log(styleTag.textContent)
    console.log(styleTag)
    console.log(preView)
  } else {
    console.error(`Theme "${themeName}" not found in mapTheme.`)
  }
  return styleTag
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

// 组件卸载时清理
onUnmounted(() => {
  if (diffRenderer) {
    diffRenderer.destroy()
  }
})
</script>

<template>
  <div class="container-box">
    <div class="rich">
      <VerRichEditor v-model:value="value" />
    </div>
    <div class="preview">
      <h2>diff预览</h2>
      <div ref="diffContainer"></div>
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
