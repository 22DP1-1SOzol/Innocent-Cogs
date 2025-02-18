<template>
    <div class="form-container">
      <h2>Register</h2>
      <form @submit.prevent="submitRegister">
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
            placeholder="Create a password"
            required
          />
          <span v-if="passwordError" class="error">{{ passwordError }}</span>
        </div>
  
        <div class="input-group">
          <label for="confirmPassword">Confirm Password</label>
          <input
            v-model="confirmPassword"
            type="password"
            id="confirmPassword"
            placeholder="Confirm your password"
            required
          />
          <span v-if="confirmPasswordError" class="error">{{ confirmPasswordError }}</span>
        </div>
  
        <button type="submit">Register</button>
        <p>
          Already have an account? <router-link to="/login">Login here</router-link>
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
        confirmPassword: '',
        emailError: '',
        passwordError: '',
        confirmPasswordError: '',
      };
    },
    methods: {
      submitRegister() {
        // Reset errors
        this.emailError = '';
        this.passwordError = '';
        this.confirmPasswordError = '';
  
        // Validate fields
        if (!this.email) {
          this.emailError = 'Email is required';
          return;
        }
  
        if (!this.password) {
          this.passwordError = 'Password is required';
          return;
        }
  
        if (!this.confirmPassword) {
          this.confirmPasswordError = 'Confirm your password';
          return;
        }
  
        if (this.password !== this.confirmPassword) {
          this.confirmPasswordError = 'Passwords do not match';
          return;
        }
  
        // Process registration (For now, we just log the values)
        alert(`Registration successful for ${this.email}`);
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
  