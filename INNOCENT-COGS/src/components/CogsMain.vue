<template>
  <div class="cogs-main-container">
    <!-- Back to Login Button -->
    <div class="back-to-login-container">
      <button @click="goBackToLogin" class="back-to-login">Back to Login</button>
    </div>

    <!-- Auto-save Message -->
    <p v-if="autoSaveMessage" class="auto-save-message">Auto-saved!</p>

    <!-- Add Text Block Button -->
    <button @click="addTextBlock" class="add-block-button">Add Text Block</button>

    <!-- Dynamic Text Blocks -->
    <div 
      v-for="(block, index) in textBlocks" 
      :key="block.id" 
      class="text-block"
      :style="{ top: block.y + 'px', left: block.x + 'px', width: block.width + 'px', height: block.height + 'px' }"
      @mousedown="startDrag(index, $event)"
    >
      <textarea 
        v-model="block.content" 
        @input="autoSaveText"
        placeholder="Write something here..."
      ></textarea>
      
      <!-- Resize Handle -->
      <div class="resize-handle" @mousedown="startResize(index, $event)"></div>

      <!-- Delete Button -->
      <button class="delete-button" @click="deleteTextBlock(index)"></button>
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
      <button @click="saveTextFile" :disabled="textBlocks.length === 0">Save as .txt</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import '../styles/CogsMain.css';

const router = useRouter();
const textBlocks = ref([]);
const autoSaveMessage = ref(false);
let dragIndex = null;
let resizingIndex = null;
let startX, startY, startWidth, startHeight;

// Go back to login
const goBackToLogin = () => {
  router.push('/login');
};

// Add a new text block
const addTextBlock = () => {
  textBlocks.value.push({
    id: Date.now(),
    content: "",
    x: 100,
    y: 100,
    width: 200,
    height: 150,
  });
};

// Delete a text block
const deleteTextBlock = (index) => {
  textBlocks.value.splice(index, 1);
};

// Dragging functionality
const startDrag = (index, event) => {
  dragIndex = index;
  startX = event.clientX - textBlocks.value[index].x;
  startY = event.clientY - textBlocks.value[index].y;
  document.addEventListener("mousemove", dragMove);
  document.addEventListener("mouseup", stopDrag);
};

const dragMove = (event) => {
  if (dragIndex === null) return;
  textBlocks.value[dragIndex].x = event.clientX - startX;
  textBlocks.value[dragIndex].y = event.clientY - startY;
};

const stopDrag = () => {
  dragIndex = null;
  document.removeEventListener("mousemove", dragMove);
  document.removeEventListener("mouseup", stopDrag);
};

// Resizing functionality
const startResize = (index, event) => {
  event.stopPropagation();
  resizingIndex = index;
  startX = event.clientX;
  startY = event.clientY;
  startWidth = textBlocks.value[index].width;
  startHeight = textBlocks.value[index].height;
  document.addEventListener("mousemove", resizeMove);
  document.addEventListener("mouseup", stopResize);
};

const resizeMove = (event) => {
  if (resizingIndex === null) return;
  textBlocks.value[resizingIndex].width = startWidth + (event.clientX - startX);
  textBlocks.value[resizingIndex].height = startHeight + (event.clientY - startY);
};

const stopResize = () => {
  resizingIndex = null;
  document.removeEventListener("mousemove", resizeMove);
  document.removeEventListener("mouseup", stopResize);
};

// Auto-save feature
const autoSaveText = () => {
  localStorage.setItem("savedTextBlocks", JSON.stringify(textBlocks.value));
  autoSaveMessage.value = true;
  setTimeout(() => {
    autoSaveMessage.value = false;
  }, 1000);
};

// Save text as .txt files in a ZIP
const saveTextFile = () => {
  textBlocks.value.forEach((block, i) => {
    const blob = new Blob([block.content], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `text_block_${i + 1}.txt`;
    link.click();
  });
};

// Load .txt file
const loadTextFile = (event) => {
  const files = event.target.files;
  if (!files.length) return;

  Array.from(files).forEach(file => {
    const reader = new FileReader();
    reader.onload = (e) => {
      textBlocks.value.push({
        id: Date.now(),
        content: e.target.result,
        x: 100,
        y: 100,
        width: 200,
        height: 150,
      });
    };
    reader.readAsText(file);
  });
};

// Word & Character Count
const wordCount = computed(() => {
  return textBlocks.value.reduce((acc, block) => acc + (block.content.trim() ? block.content.trim().split(/\s+/).length : 0), 0);
});

const charCount = computed(() => {
  return textBlocks.value.reduce((acc, block) => acc + block.content.length, 0);
});

// Load saved text blocks from localStorage on page load
onMounted(() => {
  const savedBlocks = localStorage.getItem("savedTextBlocks");
  if (savedBlocks) {
    textBlocks.value = JSON.parse(savedBlocks);
  }
});
</script>
