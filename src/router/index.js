import { createRouter, createWebHistory } from 'vue-router'
import CpHome from "@/views/CpHome";
import CpArticle from "@/views/CpArticle";
import CpArticles from "@/views/CpArticles";
import CpCart from "@/views/CpCart";
import NotFound from "@/NotFound";

const routes = [
  {
    path: '/infos',
    name: 'info',
    component: CpHome
  },
  {
    path: '/cart',
    name: 'cart',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component:CpCart// () => import(/* webpackChunkName: "about" */ '../views/CpCart.vue')
  },
  { path: '/', component: CpArticles },
  { path: '/articles/:id', component: CpArticle },
  { path: "/not-found", component: NotFound }
]

const router = createRouter({
  history: createWebHistory(process.env.publicPath),
  routes
})

export default router

