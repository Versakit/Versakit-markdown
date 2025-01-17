/**
 * @author Jannik
 * @description 自动注册组件
 * @time 2025/01/16
 */
import type { App, Component } from 'vue'
import VerRichEditor from './src/index'

/** 样式文件 */
import './style/index.css'

/** 图标文件 */
import 'virtual:svg-icons-register'

const components: Component[] = [VerRichEditor]
export { VerRichEditor }

export default {
  install: (app: App) => {
    for (const c in components) {
      app.component(c, components[c])
    }
  },
}
