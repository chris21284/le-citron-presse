import { createRouter, createWebHistory } from 'vue-router'
import CpHome from "@/views/CpHome";
import CpArticle from "@/views/CpArticle";

// import CpArticles from "@/views/CpArticles";
import HomePage from "@/views/v2/HomePage";

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

  // { path: '/', component: CpArticles },
  {path: '/', component: HomePage },

  { path: '/articles/:id', component: CpArticle },
  { path: "/not-found", component: NotFound },
  { path: "/:pathMatch(.*)*", redirect: '/not-found' }
]

const router = createRouter({
  history: createWebHistory(),//process.env.publicPath),
  routes
})

export default router

