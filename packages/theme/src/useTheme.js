import themes from './styles'

console.log('useTheme.js')

/**
 * 切换 Markdown 渲染主题
 * @param {string} containerId - Markdown 内容容器的 ID
 * @param {string} themeName - 主题名称 ('default' | 'custom')
 */
export default function useTheme(containerId, themeName = 'default') {
  const container = document.getElementById(containerId)
  if (!container) {
    console.error(`Container with id "${containerId}" not found`)
    return
  }

  // 添加markdown-body类
  if (!container.classList.contains('markdown-body')) {
    container.classList.add('markdown-body')
  }

  // 移除旧的主题样式表
  const oldStyle = document.getElementById('markdown-theme-style')
  if (oldStyle) {
    oldStyle.remove()
  }

  // 创建style标签并插入主题样式
  const style = document.createElement('style')
  style.id = 'markdown-theme-style'
  style.textContent = themes[themeName] || themes.default
  document.head.appendChild(style)
}
