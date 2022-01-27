import { type RouteConfig } from 'vue-router'

export default [
  {
    path: '/join',
    component: () => import('@/common/layouts/Main.vue'),
    children: [
      {
        path: '',
        name: 'join', 
        component: () => import('./Join.vue'),
      },
    ],
  },
  {
    path: '*',
    redirect: 'home',
  },
] as RouteConfig[]
