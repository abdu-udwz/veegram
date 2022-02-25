import { type RouteConfig } from 'vue-router'

export default [
  {
    path: '/home',
    component: () => import('@/common/layouts/Main.vue'),
    children: [
      {
        path: '',
        name: 'home', 
        component: () => import('./Home.vue'),
        meta: {
          authenticatedOnly: true,
        },
      },
    ],
  },
  {
    path: '*',
    redirect: 'home',
  },
] as RouteConfig[]
