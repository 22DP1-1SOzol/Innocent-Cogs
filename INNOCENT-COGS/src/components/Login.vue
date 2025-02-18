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
  
  // Data for email and password
  const email = ref('');
  const password = ref('');
  
  // Handle the login form submission
  const handleLogin = () => {
    if (email.value && password.value) {
      // Here you can add login logic (e.g., authentication with backend)
      console.log('Logged in with:', email.value, password.value);
      // For now, let's just clear the inputs after submit
      email.value = '';
      password.value = '';
      alert('Login successful');
    } else {
      alert('Please enter both email and password.');
    }
  };
  </script>
  
  <style scoped>
  .login-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  h3 {
    text-align: center;
    color: #333;
  }
  
  .input-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    font-size: 14px;
    margin-bottom: 5px;
    color: #555;
  }
  
  input {
    width: 100%;
    padding: 10px;
    font-size: 14px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  input:focus {
    border-color: #4A90E2;
  }
  
  .button-group {
    text-align: center;
  }
  
  button {
    padding: 10px 20px;
    font-size: 16px;
    color: #fff;
    background-color: #4A90E2;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #357ABD;
  }
  
  .register-link {
    text-align: center;
    margin-top: 20px;
    font-size: 14px;
  }
  
  .register-link a {
    color: #4A90E2;
    text-decoration: none;
  }
  
  .register-link a:hover {
    text-decoration: underline;
  }
  </style>
  