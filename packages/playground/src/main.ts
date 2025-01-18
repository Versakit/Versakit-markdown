import { createApp } from 'vue'
import MarKDwonVue from '@versakit/markdown-vue'
import '@versakit/markdown-vue/dist/markdown-vue.css'
import App from './App.vue'

createApp(App).use(MarKDwonVue).mount('#app')
