import { createApp } from 'vue'
import "@/styles/index.less"
import App from './App.vue'
import '@/node-ipc/node-api'
import store from '@/store'
import router from '@/router'
import TDesign from 'tdesign-vue-next';
// 引入组件库全局样式资源
import 'tdesign-vue-next/es/style/index.css';
import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css'
import ContextMenu from '@imengyu/vue3-context-menu'

const app = createApp(App)
app.use(TDesign);
app.use(store)
app.use(router)
app.use(ContextMenu);

app.mount('#app')
