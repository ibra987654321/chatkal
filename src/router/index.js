import { createRouter, createWebHistory } from 'vue-router'
import Landing from "@/views/Landing";
import {decodeJWT, getToken} from "@/helpers/helpers";

const routes = [
  {
    path: '/',
    name: 'landing',
    meta: {layout: 'main'},
    component: Landing
  },
  {
    path: '/main',
    name: 'main',
    meta: {layout: 'main', auth: true,role: ['admin']},
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    meta: {layout: 'special', auth: false},
    component: () => import('../views/Login')
  },
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/home',
    name: 'home',
    meta: {layout: 'special'},
    component: () => import('../views/HomeView')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

function intersection(first, second) {
  let s = new Set(second)
  return first.filter(item => s.has(item))
}

router.beforeEach((to, from, next) => {
  const requireAuth = to.matched.some(record => record.meta.auth)
  const currentUser = getToken()

  if (requireAuth && !currentUser) {
    next('/login')
  } else {
    let authorized = true

    to.matched.forEach(r => {
      if (r.meta.role) {
        const userRoles = decodeJWT().roles
        const role = intersection(r.meta.role, userRoles)

        if (role.length === 0) {
          authorized = false
          console.log('setSnackbars', 'У вас нет доступа')
        }
      }
    })

    if (authorized) {
      next()
    } else {
      next(false) // Остановить переход, если нет доступа
    }
  }
})

export default router
