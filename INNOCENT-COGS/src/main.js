import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// Create the Vue app
const app = createApp(App);

// Global error handling for uncaught errors and unhandled promise rejections
window.addEventListener('error', (event) => {
  console.error('Global error caught:', event.error);
  // Optionally, show a global error message or redirect the user to an error page
  alert('An unexpected error occurred. Please try again later.');
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  // Optionally, handle promise rejection errors here
  alert('A promise error occurred. Please try again later.');
});

// Use the router and mount the app
app.use(router).mount('#app');
