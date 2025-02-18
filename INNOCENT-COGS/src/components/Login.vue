<template>
    <div class="login-container">
      <h3>Login Page</h3>
      <form @submit.prevent="handleLogin">
        <div class="input-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="email" required placeholder="Enter your email" />
        </div>
  
        <div class="input-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" required placeholder="Enter your password" />
        </div>
  
        <div class="button-group">
          <button type="submit">Login</button>
        </div>
      </form>
  
      <p class="register-link">
        Don't have an account? <router-link to="/register">Register</router-link>
      </p>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  // Data for email and password
  const email = ref('');
  const password = ref('');
  const router = useRouter();
  
  // Handle the login form submission
  const handleLogin = () => {
    // Check if the email and password fields are filled
    if (email.value && password.value) {
      // Retrieve stored user data from localStorage
      const storedUser = localStorage.getItem(email.value);
  
      if (!storedUser) {
        alert('User does not exist!');
        return;
      }
  
      // Parse stored data
      const userData = JSON.parse(storedUser);
  
      // Check if the entered password matches the stored password
      if (userData.password !== password.value) {
        alert('Incorrect password!');
        return;
      }
  
      // Simulate login by storing an "authToken" in localStorage
      localStorage.setItem('authToken', 'dummy-token');
      alert('Login successful!');
  
      // Redirect to the blank page after successful login
      router.push('/blank');
    } else {
      alert('Please enter both email and password.');
    }
  };
  </script>
  
  <!-- Import external CSS file -->
  <style src="../styles/Login.css"></style>
  