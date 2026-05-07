import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  { 
    path: '/',
    name: 'bus-lines',
    component: () => import('@/views/BusLinesView.vue')
  },
  { 
    path: '/stops',
    name: 'stops',
    component: () => import('@/views/StopsView.vue')
  },
  { 
    path: '/:pathMatch(.*)*',
    redirect: '/'
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
