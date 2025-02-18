<template>
    <div class="register-container">
      <h3>Register Page</h3>
      <form @submit.prevent="handleRegister">
        <div class="input-group">
          <label for="name">Full Name</label>
          <input type="text" id="name" v-model="name" required placeholder="Enter your full name" />
        </div>
  
        <div class="input-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="email" required placeholder="Enter your email" />
        </div>
  
        <div class="input-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" required placeholder="Enter your password" />
        </div>
  
        <div class="input-group">
          <label for="confirmPassword">Confirm Password</label>
          <input type="password" id="confirmPassword" v-model="confirmPassword" required placeholder="Confirm your password" />
        </div>
  
        <div class="button-group">
          <button type="submit">Register</button>
        </div>
      </form>
  
      <p class="login-link">
        Already have an account? <router-link to="/login">Login</router-link>
      </p>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  // Data for user input
  const name = ref('');
  const email = ref('');
  const password = ref('');
  const confirmPassword = ref('');
  
  // Handle the registration form submission
  const handleRegister = () => {
    if (password.value !== confirmPassword.value) {
      alert("Passwords don't match. Please try again.");
      return;
    }
  
    if (name.value && email.value && password.value && confirmPassword.value) {
      // Here you can add registration logic (e.g., save to database or call an API)
      console.log('Registered with:', name.value, email.value, password.value);
      // For now, let's just clear the inputs after submit
      name.value = '';
      email.value = '';
      password.value = '';
      confirmPassword.value = '';
      alert('Registration successful');
    } else {
      alert('Please fill in all fields.');
    }
  };
  </script>
  
  <style scoped>
  .register-container {
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
  
  .login-link {
    text-align: center;
    margin-top: 20px;
    font-size: 14px;
  }
  
  .login-link a {
    color: #4A90E2;
    text-decoration: none;
  }
  
  .login-link a:hover {
    text-decoration: underline;
  }
  </style>
  