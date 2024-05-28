import { createRouter, createWebHistory } from 'vue-router'
import {getToken} from "@/helpers/helpers";

const routes = [
  {
    path: '/',
    name: 'main',
    meta: {layout: 'main', auth: true,role: ['admin']},
    component: () => import('@/views/MainPage.vue')
  },
  {
    path: '/login',
    name: 'login',
    meta: {layout: 'special', auth: false},
    component: () => import('@/views/Login')
  },
  {
    path: '/',
    redirect: '/login',
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  const requireAuth = to.matched.some(record => record.meta.auth)
  const currentUser = getToken()
  if (requireAuth && !currentUser) {
    next('/login')
  }
  else {
    next()
  }
})

export default router
