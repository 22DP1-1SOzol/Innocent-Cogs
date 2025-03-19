<template>
  <div class="login-page">
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

<style scoped>
/* Only apply the background to the login page container */
.login-page {
  background-image: url('@/Images/InnocentCogsLogo.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 20px;
}

.login-container {
  max-width: 500px;
  padding: 35px;
  background-color: rgba(63, 193, 201, 0.8);
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(187, 2, 2, 0.1);
  position: relative;
  z-index: 1;
}

h3 {
  text-align: center;
  color: #000000;
  font-size: 24px; /* Bigger font size for header */
  margin-bottom: 20px; /* Add margin to separate header from form */
}

.input-group {
  margin-bottom: 20px;
}

label {
  display: block;
  font-size: 16px; /* Larger font size for readability */
  margin-bottom: 8px;
  color: #000000;
}

input {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
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
  width: 100%; /* Make button full width */
}

button:hover {
  background-color: #357ABD;
}

.register-link {
  text-align: center;
  margin-top: 20px;
  font-size: 16px;
}

.register-link a {
  color: #4A90E2;
  text-decoration: none;
}

.register-link a:hover {
  text-decoration: underline;
}
</style>
