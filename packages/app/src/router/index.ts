import Vue from 'vue'
import VueRouter from 'vue-router'
import type { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: RouteConfig[] = [
  {
    path: '/home',
    component: () => import('@/common/layouts/Main.vue'),
    children: [
      {
        path: '',
        name: 'home', 
        component: () => import('@/home/Home.vue'),
      },
    ],
  },
  {
    path: '*',
    redirect: 'home',
  },
]

const router = new VueRouter({
  mode: 'history',
  routes,
})

export default router
