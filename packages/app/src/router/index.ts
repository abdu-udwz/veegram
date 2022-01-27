import Vue from 'vue'
import VueRouter from 'vue-router'
import type { RouteConfig } from 'vue-router'
import homeRoutes from '@/home/routes'
import joinRoutes from '@/join/routes'

Vue.use(VueRouter)

const routes: RouteConfig[] = [
  ...homeRoutes,
  ...joinRoutes,
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
