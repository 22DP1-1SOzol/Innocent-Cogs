<template>
    <div class="register-container">
      <h2>Registration Form</h2>
      <form>
        <label for="username">Username</label>
        <input type="text" id="username" name="username" placeholder="Enter your username" required />
        <label for="email">Email</label>
        <input type="email" id="email" name="email" placeholder="Enter your email" required />
        <label for="password">Password</label>
        <input type="password" id="password" name="password" placeholder="Create a password" required />
        <button type="submit">Register</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Register',
  };
  </script>
  
  <style scoped>
  /* Add any custom styles or styles from the tutorial */
  .register-container {
    width: 300px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  </style>
  