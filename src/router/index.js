import { createRouter, createWebHistory } from 'vue-router'

import HomePage from "@/views/v2/Pages/HomePage";
import AboutUsPage from "@/views/v2/Pages/AboutUsPage";
import ContactPage from "@/views/v2/Pages/ContactPage";
import DevisPage from "@/views/v2/Pages/DevisPage";
import SingleArticlePage from "@/views/v2/Pages/SingleArticlePage";

import NotFoundPage from "@/views/v2/Pages/NotFoundPage";

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

