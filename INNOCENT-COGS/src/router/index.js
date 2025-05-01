import { createRouter, createWebHistory } from 'vue-router';
import Register from '../components/Register.vue';
import Login from '../components/Login.vue';
import BlankPage from '../components/CogsMain.vue';

const routes = [
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/blank',
    name: 'BlankPage',
    component: BlankPage,
  },
  {
    path: '/',
    redirect: '/login',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Global navigation guard to handle route errors
router.onError((error) => {
  console.error("Routing error:", error);
  // Optionally, redirect to a 404 or error page
  router.push('/login');
});

export default router;
