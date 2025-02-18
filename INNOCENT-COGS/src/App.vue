<template>
  <div>
    <h1></h1>
    <h2></h2>
    
    <!-- Navigation Links -->
    

    <!-- Router View: This is where the routed pages will show -->
    <router-view />
  </div>
</template>

<script setup>
// No script needed for now
</script>

<style scoped>
nav {
  margin: 20px 0;
}

router-link {
  text-decoration: none;
  margin: 0 10px;
  color: #000;
}

router-link:hover {
  color: blue;
}

h1 {
  font-size: 2em;
  text-align: center;
  margin-top: 20px;
}

h2 {
  text-align: center;
  margin-top: 10px;
}

.router-view {
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ffffff;
  border-radius: 5px;
  background-color: #000000;
}
</style>
