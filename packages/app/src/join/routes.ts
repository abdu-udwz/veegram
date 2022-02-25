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
        meta: {
          guestOnly: true,
        },
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    component: () => import('@/join/Welcome.vue'),
  },
] as RouteConfig[]
