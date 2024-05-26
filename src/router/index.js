import { createRouter, createWebHistory } from 'vue-router'
import {decodeJWT, getToken} from "@/helpers/helpers";

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

function intersection(first, second) {
  let s = new Set(second)
  return first.filter(item => s.has(item))
}

router.beforeEach((to, from, next) => {
  const requireAuth = to.matched.some(record => record.meta.auth)
  // const role = to.matched[0].meta.authorize[0]
  const currentUser = getToken()
  // to.matched.some(r => {
  //   r.meta.authorize.map(i => {
  //       console.log(decodeJWT().roled[0] === i)
  //   })
  // })
  if (requireAuth && !currentUser) {
    next('/login')
  }
      // else if(decodeJWT().roles[0] !== role) {
      //   next('/dashboard')
  // }
  else {
    next()
  }
})

export default router
