import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login.vue';  // Adjusted to correct path
import Register from '../components/Register.vue';  // Adjusted to correct path

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
