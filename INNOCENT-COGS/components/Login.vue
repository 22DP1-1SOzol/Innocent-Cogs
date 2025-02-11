<template>
    <div class="page">
      <h2>Login</h2>
      <input type="email" placeholder="Email">
      <input type="password" placeholder="Password">
      <button @click="$router.push('/intermission')">Login</button>
      <p>Don't have an account? <router-link to="/signup">Sign up</router-link></p>
    </div>
  </template>
  
  <style scoped>
  .page {
    text-align: center;
    padding: 20px;
  }
  </style>
  