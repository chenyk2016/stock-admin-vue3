import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/all',
    name: '全部',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/home-all')
  },
  {
    path: '/group',
    name: '分组',
    component: () => import('../views/home')
  },
  {
    path: '/group/:id',
    name: '分组2',
    component: () => import('../views/home-all')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export { routes }
export default router
