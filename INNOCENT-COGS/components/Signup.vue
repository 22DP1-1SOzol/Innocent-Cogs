<template>
    <div class="page">
      <h2>Sign Up</h2>
      <input type="text" placeholder="Username">
      <input type="email" placeholder="Email">
      <input type="password" placeholder="Password">
      <button @click="$router.push('/intermission')">Sign Up</button>
      <p>Already have an account? <router-link to="/">Login</router-link></p>
    </div>
  </template>
  
  <style scoped>
  .page {
    text-align: center;
    padding: 20px;
  }
  </style>
  