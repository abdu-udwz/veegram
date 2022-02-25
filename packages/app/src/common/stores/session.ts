// pinia
import { defineStore } from 'pinia'
// types
import type { User } from '@/common/types'

const useSessionStore = defineStore({
  id: 'session',
  state: () => {
    return {
      initialized: false,
      user: null as null | User,
    }
  },

  getters: {
    isAuthenticated (): boolean {
      return this.initialized && this.user != null
    },
  },

  actions: {
    initialize (authenticated: boolean, user?: User) {
      this.initialized = true
      this.user = user ?? null
    },

    reset () {
      this.initialized = false
      this.user = null
    },
  },
})

export default useSessionStore