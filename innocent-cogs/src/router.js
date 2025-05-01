// src/router.js
import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from './pages/LoginPage.vue'
import InnocentCogs from './InnocentCogs.vue'
import AboutPage from './pages/AboutPage.vue'

const routes = [
    { path: '/', component: LoginPage }, // Front page is login
    { path: '/notes', component: InnocentCogs },
    { path: '/about', component: AboutPage }
  ]

export const router = createRouter({
  history: createWebHistory(),
  routes
})
