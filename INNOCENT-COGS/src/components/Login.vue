<template>
    <div class="login-container">
      <h2>Login Form</h2>
      <form>
        <label for="username">Username</label>
        <input type="text" id="username" name="username" placeholder="Enter your username" required />
        <label for="password">Password</label>
        <input type="password" id="password" name="password" placeholder="Enter your password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Login',
  };
  </script>
  
  <style scoped>
  /* Add your styles here */
  .login-container {
    width: 300px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  </style>
  