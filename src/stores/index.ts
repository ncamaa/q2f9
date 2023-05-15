// pinia store for user, firebase auth
import { defineStore, createPinia } from 'pinia'

import { FB_auth } from 'boot/firebase'
import { User } from 'firebase/auth'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    auth: {
      user: <User | null>null,
    },
  }),
  getters: {
    isAuthenticated: () => {
      return FB_auth.currentUser !== null
    },
  },
})

// on auth state change, update user store
FB_auth.onAuthStateChanged((user) => {
  console.log('Auth state changed')
  if (user) {
    console.log('User is logged in')

    useUserStore().auth.user = user as User
  } else {
    console.log('User is logged out')
    useUserStore().auth.user = null
  }
})

export default createPinia
