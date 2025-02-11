import { createApp } from 'vue';
import App from './App.vue'; // Root component
import router from './router/index.js'; // Import router

const app = createApp(App);
app.use(router);
app.mount('#app');
