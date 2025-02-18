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
  import { useRouter } from 'vue-router';
  
  // Data for user input
  const name = ref('');
  const email = ref('');
  const password = ref('');
  const confirmPassword = ref('');
  const router = useRouter();
  
  // Handle the registration form submission
  const handleRegister = () => {
    if (password.value !== confirmPassword.value) {
      alert("Passwords don't match. Please try again.");
      return;
    }
  
    if (name.value && email.value && password.value && confirmPassword.value) {
      // Check if the email is already registered
      const existingUser = localStorage.getItem(email.value);
  
      if (existingUser) {
        alert('This email is already registered. Please login.');
        return;
      }
  
      // Store the new user in localStorage
      const userData = {
        name: name.value,
        email: email.value,
        password: password.value,
      };
      localStorage.setItem(email.value, JSON.stringify(userData));
  
      // Clear the form fields
      name.value = '';
      email.value = '';
      password.value = '';
      confirmPassword.value = '';
  
      alert('Registration successful!');
  
      // Redirect to login page after successful registration
      router.push('/login');
    } else {
      alert('Please fill in all fields.');
    }
  };
  </script>
  
  <style scoped>
  body {
    background-image: url('@/Images/InnocentCogsLogo.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
  }
  
  .register-container {
    max-width: 500px;
    width: 100%; /* Ensure full width up to max-width */
    padding: 35px;
    background-color: rgba(63, 193, 201, 0.8);
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  h3 {
    text-align: center;
    color: #000000;
  }
  
  .input-group {
    margin-bottom: 20px;
  }
  
  label {
    display: block;
    font-size: 16px;
    margin-bottom: 8px;
    color: #000000;
  }
  
  input {
    width: 100%;
    padding: 12px;
    font-size: 16px;
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
    padding: 12px 24px;
    font-size: 18px;
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
    font-size: 16px;
  }
  
  .login-link a {
    color: #4A90E2;
    text-decoration: none;
  }
  
  .login-link a:hover {
    text-decoration: underline;
  }
  </style>
  