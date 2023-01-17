import { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    // { path: '/:pathMatch(.*)*', component: () => import("@renderer/views/404.vue") },
    { path: '/', name: '首页', component: () => import('@/pages/home/Home.vue') },
    // { path: '/setting', name: '设置', component: () => import('@/pages/setting/Setting.vue') },
    // { path: '/Print', name: '打印', component: () => import('@renderer/views/Print.vue') },
]

export default routes