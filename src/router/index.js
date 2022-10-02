import { createRouter, createWebHistory } from 'vue-router'
import CpHome from "@/views/CpHome";
import CpArticle from "@/views/CpArticle";
import CpArticles from "@/views/CpArticles";

const routes = [
  {
    path: '/',
    name: 'home',
    component: CpHome
  },
  {
    path: '/cart',
    name: 'cart',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/CpCart.vue')
  },
  { path: '/articles', component: CpArticles },
  { path: '/articles/:id', component: CpArticle },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
