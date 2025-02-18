<template>
  <div class="cogs-main-container">
    <!-- Back to Login Button -->
    <div class="back-to-login-container">
      <button @click="goBackToLogin">Back to Login</button>
    </div>

    <!-- Text Block Section -->
    <div class="text-block">
      <textarea v-model="textContent" placeholder="Enter your text here..."></textarea>
    </div>

    <!-- Save Button -->
    <div class="save-button-container">
      <button @click="saveTextToFile">Save</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const textContent = ref(''); // Holds the content of the text box

const goBackToLogin = () => {
  router.push('/login'); // Goes back to login page
};

const saveTextToFile = () => {
  const blob = new Blob([textContent.value], { type: 'text/plain' }); // Create a Blob object from the text content
  const link = document.createElement('a'); // Create an anchor element
  link.href = URL.createObjectURL(blob); // Create a download URL for the Blob object
  link.download = 'textfile.txt'; // Set the download filename
  link.click(); // Trigger the download
};
</script>

<style src="../styles/CogsMain.css" scoped></style>
