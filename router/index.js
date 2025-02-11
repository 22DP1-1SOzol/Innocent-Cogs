import { createRouter, createWebHistory } from 'vue-router';

import Login from '../components/Login.vue';
import Signup from '../components/Signup.vue';
import Intermission from '../components/Intermission.vue';
import MainProgram from '../components/MainProgram.vue';

const routes = [
    { path: '/', component: Login },
    { path: '/signup', component: Signup },
    { path: '/intermission', component: Intermission },
    { path: '/main', component: MainProgram }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
