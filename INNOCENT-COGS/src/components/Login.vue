<template>
    <div class="form-container">
      <h2>Login</h2>
      <form @submit.prevent="submitLogin">
        <div class="input-group">
          <label for="email">Email</label>
          <input
            v-model="email"
            type="email"
            id="email"
            placeholder="Enter your email"
            required
          />
          <span v-if="emailError" class="error">{{ emailError }}</span>
        </div>
  
        <div class="input-group">
          <label for="password">Password</label>
          <input
            v-model="password"
            type="password"
            id="password"
            placeholder="Enter your password"
            required
          />
          <span v-if="passwordError" class="error">{{ passwordError }}</span>
        </div>
  
        <button type="submit">Login</button>
        <p>
          Don't have an account? <router-link to="/register">Register here</router-link>
        </p>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: '',
        password: '',
        emailError: '',
        passwordError: '',
      };
    },
    methods: {
      submitLogin() {
        // Reset errors
        this.emailError = '';
        this.passwordError = '';
  
        // Validate email and password
        if (!this.email) {
          this.emailError = 'Email is required';
          return;
        }
  
        if (!this.password) {
          this.passwordError = 'Password is required';
          return;
        }
  
        // Process login (For now, we will just log the values)
        alert(`Login successful for ${this.email}`);
      },
    },
  };
  </script>
  
  <style scoped>
  .form-container {
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: white;
  }
  
  .input-group {
    margin-bottom: 15px;
  }
  
  input {
    width: 100%;
    padding: 10px;
    margin-top: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  button {
    width: 100%;
    padding: 10px;
    background-color: #333;
    color: white;
    border: none;
    border-radius: 4px;
  }
  
  button:hover {
    background-color: #555;
  }
  
  .error {
    color: red;
    font-size: 0.9em;
  }
  </style>
  