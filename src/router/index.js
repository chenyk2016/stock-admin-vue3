import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: '分组',
    component: () => import('../views/home')
  },
  {
    path: '/all',
    name: '全部',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/home-all')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export { routes }
export default router
