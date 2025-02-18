import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login.vue';  // Path to Login.vue
import Register from '../components/Register.vue';  // Path to Register.vue

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
