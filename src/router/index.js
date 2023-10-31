import { createRouter, createWebHistory } from 'vue-router'

import HomePage from "@/views/Pages/HomePage";
import AboutUsPage from "@/views/Pages/AboutUsPage";
import ContactPage from "@/views/Pages/ContactPage";
import DevisPage from "@/views/Pages/DevisPage";
import SingleArticlePage from "@/views/Pages/SingleArticlePage";

import NotFoundPage from "@/views/Pages/NotFoundPage";

const routes = [
  { path: '/', component: HomePage },
  { path: '/a-propos-de-nous', component: AboutUsPage },
  { path: '/contact', component: ContactPage },
  { path: '/devis', component: DevisPage },
  // { path: '/macarons', component: MacaronPage },
  // { path: '/patisserie', component: PatisseriePage },
  // { path: '/biscuits', component: BiscuitsPage },

  { path: '/articles/:articleId', component: SingleArticlePage },
  { path: "/not-found", component: NotFoundPage },
  { path: "/:pathMatch(.*)*", redirect: '/not-found' }
]

const router = createRouter({
  history: createWebHistory(),//process.env.publicPath),
  routes
})

export default router

