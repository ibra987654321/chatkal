import { createRouter, createWebHistory } from 'vue-router'
import Landing from "@/views/Landing";

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
    meta: {layout: 'special'},
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    meta: {layout: 'special'},
    component: () => import('../views/Login')
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

export default router
