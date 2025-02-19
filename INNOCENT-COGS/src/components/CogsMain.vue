<template>
  <div class="cogs-main-container">
    <!-- Back to Login Button -->
    <div class="back-to-login-container">
      <button @click="goBackToLogin" class="back-to-login">Back to Login</button>
    </div>

    <!-- Auto-save Message -->
    <p v-if="autoSaveMessage" class="auto-save-message">Auto-saved!</p>

    <!-- Text Block -->
    <div class="text-block">
      <textarea 
        v-model="textContent" 
        @input="autoSaveText"
        placeholder="Write something here...">
      </textarea>
    </div>

    <!-- Word & Character Count -->
    <div class="word-count-container">
      Words: {{ wordCount }} | Characters: {{ charCount }}
    </div>

    <!-- Load Button -->
    <div class="load-button-container">
      <label for="file-input" class="label-load">Load .txt File</label>
      <input type="file" id="file-input" @change="loadTextFile" accept=".txt">
    </div>

    <!-- Save Button -->
    <div class="save-button-container">
      <button @click="saveTextFile" :disabled="!textContent.trim()">Save as .txt</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import '../styles/CogsMain.css';  /* Ensure correct path */

const router = useRouter();
const textContent = ref("");
const autoSaveMessage = ref(false);

const goBackToLogin = () => {
  router.push('/login'); // Goes back to login page
};

// Auto-save feature
const autoSaveText = () => {
  localStorage.setItem("savedText", textContent.value);
  autoSaveMessage.value = true;
  setTimeout(() => {
    autoSaveMessage.value = false;
  }, 1000);
};

// Save text as .txt file
const saveTextFile = () => {
  const blob = new Blob([textContent.value], { type: 'text/plain' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'saved_text.txt';
  link.click();
};

// Load .txt file
const loadTextFile = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    textContent.value = e.target.result;
  };
  reader.readAsText(file);
};

// Word & Character Count
const wordCount = computed(() => {
  return textContent.value.trim() ? textContent.value.trim().split(/\s+/).length : 0;
});

const charCount = computed(() => textContent.value.length);
</script>
