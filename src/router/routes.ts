import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/IndexPage.vue'),
        name: 'Home',
      },
      {
        path: '/signup',
        component: () => import('pages/SignUp.vue'),
        name: 'SignUp',
      },
      // add the Login route here
      {
        path: '/login',
        component: () => import('pages/LoginPage.vue'),
        name: 'LoginPage',
      },
      {
        path: '/test',
        component: () => import('pages/TestVue.vue'),
        name: 'TestPage',
      },
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
