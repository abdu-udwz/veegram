// vue
import Vue from 'vue'
import VueRouter from 'vue-router'
import type { RouteConfig } from 'vue-router'
// routes
import homeRoutes from '@/home/routes'
import joinRoutes from '@/join/routes'

// api
import { getSelf as getUserSelf } from '@/common/services/users'
import axios from 'axios'

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

router.beforeEach(async (to, from, next) => {
  console.log(to, '=', from)
  try {
    await getUserSelf()
    console.log('user is authenticated')
  } catch (error: any ) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status == 401) {
        // the server could not validate a session sent with the request
        // i.e. the user is not authenticated
        console.log('user is not authenticated')
      } else {
        console.log('unknown error during session validation. could be a network error')
        console.log(error, error.response?.status, error.response?.data)
      }
    } else {
      console.error('an unknown error', error)
    }
  } finally {
    next()
  }
})

export default router
