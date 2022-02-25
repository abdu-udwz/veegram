// vue
import VueRouter from 'vue-router'
import type { RouteConfig } from 'vue-router'
// routes
import homeRoutes from '@/home/routes'
import joinRoutes from '@/join/routes'
// stores
import useSessionStore from '@/common/stores/session'

// api
import { getSelf as getUserSelf } from '@/common/services/users'
import axios from 'axios'


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

// logging guard
router.beforeEach((to, from, next) => {
  console.log(to, '=', from)
  next()
})

// session initialization
router.beforeEach(async (to, from, next) => {
  const sessionStore = useSessionStore()
  if (!sessionStore.initialized) {
    try {
      const res = await getUserSelf()
      sessionStore.initialize(true, res.data)
    } catch (error: any ) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status == 401) {
          // the server could not validate a session sent with the request
          // i.e. the user is not authenticated
          sessionStore.initialize(false)
        } else {
          console.log('unknown error during session validation. could be a network error')
          console.log(error, error.response?.status, error.response?.data)
        }
      } else {
        console.error('an unknown error', error)
      }
    }
  }
  
  next()
})

router.beforeEach((to, from, next) => {
  const sessionStore = useSessionStore()
  if (to.meta?.guestOnly && sessionStore.isAuthenticated) {
    return next({ name: 'home' })
  }

  if (to.meta?.authenticatedOnly && !sessionStore.isAuthenticated) {
    return next({ name: 'join' })
  }

  return next()
})

export default router
