import { route } from 'quasar/wrappers'
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router'

import { FB_auth } from 'boot/firebase'

import routes from './routes'

import { Notify } from 'quasar'

const noAuthRoutes = ['LoginPage', 'SignUp']

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
    ? createWebHistory
    : createWebHashHistory

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  })

  Router.beforeEach(async (to, from, next) => {
    if (noAuthRoutes.includes(to.name as string)) {
      next()
    } else {
      try {
        // check if user is logged in firebase
        const user = FB_auth.currentUser

        if (!user) {
          // add a notification here using quasar Notify
          Notify.create({
            message: 'You must be logged in to access this page',
            color: 'negative',
            icon: 'warning',
            position: 'bottom',
          })

          console.log(
            'User is not logged in. Redirecting to LoginPage page',
            to
          )

          next({ name: 'LoginPage' })
        } else {
          // user is logged in
          next()
        }
      } catch (err) {
        // add a notification here using quasar Notify
        Notify.create({
          message: 'You must be logged in to access this page',
          color: 'negative',
          icon: 'warning',
          position: 'bottom',
        })
        console.log(
          "can't get user from auth service. Redirecting to LoginPage page",
          to
        )
        next({ name: 'LoginPage' })
      }
    }
  })

  return Router
})
