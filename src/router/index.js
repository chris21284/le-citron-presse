import { createRouter, createWebHistory } from 'vue-router'
import CpHome from "@/views/CpHome";
import CpArticle from "@/views/CpArticle";

import HomePage from "@/views/v2/Pages/HomePage";
import AboutUsPage from "@/views/v2/Pages/AboutUsPage";
import ContactPage from "@/views/v2/Pages/ContactPage";

import CpCart from "@/views/CpCart";

import NotFoundPage from "@/views/v2/Pages/NotFoundPage";

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

  { path: '/', component: HomePage },
  { path: '/a-propos-de-nous', component: AboutUsPage },
  { path: '/contact', component: ContactPage },
  // { path: '/macarons', component: MacaronPage },
  // { path: '/patisserie', component: PatisseriePage },
  // { path: '/biscuits', component: BiscuitsPage },

  { path: '/articles/:id', component: CpArticle },
  { path: "/not-found", component: NotFoundPage },
  { path: "/:pathMatch(.*)*", redirect: '/not-found' }
]

const router = createRouter({
  history: createWebHistory(),//process.env.publicPath),
  routes
})

export default router

