<template>
  <div class="cogs-main-container">
    <!-- Control Panel (Top-Left Corner) -->
    <div class="control-panel">
      <button @click="addTextBlock" class="add-block-button">Add Text Block</button>

      <div class="word-count-container">
        Words: {{ wordCount }} | Characters: {{ charCount }}
      </div>

      <label for="file-input" class="label-load">Load .txt Files</label>
      <input type="file" id="file-input" @change="loadTextFiles" accept=".txt" multiple>

      <div class="save-button-container">
        <button @click="saveTextFile" :disabled="textBlocks.length === 0">Save as TXT</button>
      </div>
    </div>

    <!-- Back to Login Button -->
    <div class="back-to-login-container">
      <button @click="goBackToLogin" class="back-to-login">Back to Login</button>
    </div>

    <!-- Auto-save Message -->
    <p v-if="autoSaveMessage" class="auto-save-message">Auto-saved!</p>

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
      
      <!-- Green Orbs outside the box -->
      <div 
        class="orb top-left" 
        @mousedown="startDragOrb(index, 'top-left', $event)"
        :style="getOrbStyle(block, 'top-left')"
      ></div>
      <div 
        class="orb top-right" 
        @mousedown="startDragOrb(index, 'top-right', $event)"
        :style="getOrbStyle(block, 'top-right')"
      ></div>
      <div 
        class="orb bottom-left" 
        @mousedown="startDragOrb(index, 'bottom-left', $event)"
        :style="getOrbStyle(block, 'bottom-left')"
      ></div>
      <div 
        class="orb bottom-right" 
        @mousedown="startDragOrb(index, 'bottom-right', $event)"
        :style="getOrbStyle(block, 'bottom-right')"
      ></div>

      <!-- Resize Handle -->
      <div class="resize-handle" @mousedown="startResize(index, $event)"></div>

      <!-- Delete Button -->
      <button class="delete-button" @click="deleteTextBlock(index)">X</button>
    </div>

    <!-- Green lines (yarn) -->
    <div v-for="(line, index) in lines" :key="index" class="line" :style="line.style"></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import '../styles/CogsMain.css';

const router = useRouter();
const textBlocks = ref([]);
const lines = ref([]); // Store lines (yarn) between orbs
const autoSaveMessage = ref(false);
const dragging = ref(null);
const resizing = ref(null);
let currentLine = null; // Track current line being drawn

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

// Load multiple .txt files at once
const loadTextFiles = (event) => {
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

// Save text blocks to files
const saveTextFile = async () => {
  if (textBlocks.value.length === 0) return;

  if ('showDirectoryPicker' in window) {
    try {
      const dirHandle = await window.showDirectoryPicker();

      for (let i = 0; i < textBlocks.value.length; i++) {
        const block = textBlocks.value[i];
        let fileName = block.content
          .trim()
          .split(/\s+/)
          .slice(0, 3)
          .join("_")
          .replace(/[^a-zA-Z0-9_-]/g, "");

        if (!fileName) fileName = `text_block_${i + 1}`;

        const fileHandle = await dirHandle.getFileHandle(`${fileName}.txt`, { create: true });
        const writable = await fileHandle.createWritable();
        await writable.write(block.content);
        await writable.close();
      }

      alert("Files saved successfully!");
    } catch (err) {
      console.error("Error saving files:", err);
    }
  } else {
    alert("Your browser does not support saving files to a chosen folder.");
  }
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

// Dragging functionality
const startDrag = (index, event) => {
  if (resizing.value) return;  // Prevent dragging when resizing

  dragging.value = {
    index,
    offsetX: event.clientX - textBlocks.value[index].x,
    offsetY: event.clientY - textBlocks.value[index].y,
  };

  // Attach mousemove and mouseup event listeners
  document.addEventListener('mousemove', onDrag);
  document.addEventListener('mouseup', stopDrag);
};

const onDrag = (event) => {
  if (dragging.value && !resizing.value) {  // Ensure it's not resizing
    const block = textBlocks.value[dragging.value.index];
    block.x = event.clientX - dragging.value.offsetX;
    block.y = event.clientY - dragging.value.offsetY;
  }
};

const stopDrag = () => {
  document.removeEventListener('mousemove', onDrag);
  document.removeEventListener('mouseup', stopDrag);
  dragging.value = null;
};

// Resizing functionality
const startResize = (index, event) => {
  event.preventDefault(); // Prevent text selection during resizing

  // Lock dragging during resize
  dragging.value = null;

  resizing.value = {
    index,
    startX: event.clientX,
    startY: event.clientY,
    startWidth: textBlocks.value[index].width,
    startHeight: textBlocks.value[index].height,
  };

  // Attach mousemove and mouseup event listeners for resizing
  document.addEventListener('mousemove', onResize);
  document.addEventListener('mouseup', stopResize);
};

const onResize = (event) => {
  if (resizing.value) {
    const dx = event.clientX - resizing.value.startX;
    const dy = event.clientY - resizing.value.startY;

    const block = textBlocks.value[resizing.value.index];

    // Ensure minimum size for the block
    block.width = Math.max(50, resizing.value.startWidth + dx); // Ensure width doesn't shrink below 50px
    block.height = Math.max(50, resizing.value.startHeight + dy); // Ensure height doesn't shrink below 50px
  }
};

const stopResize = () => {
  document.removeEventListener('mousemove', onResize);
  document.removeEventListener('mouseup', stopResize);
  resizing.value = null;
};

// Orb dragging functionality
const startDragOrb = (blockIndex, orbPosition, event) => {
  event.preventDefault();
  const orb = { blockIndex, orbPosition, startX: event.clientX, startY: event.clientY };
  currentLine = orb;
  document.addEventListener('mousemove', onDragOrb);
  document.addEventListener('mouseup', stopDragOrb);
};

const onDragOrb = (event) => {
  if (currentLine) {
    const block = textBlocks.value[currentLine.blockIndex];
    const orb = getOrbPosition(block, currentLine.orbPosition);

    const line = {
      startX: orb.x,
      startY: orb.y,
      endX: event.clientX,
      endY: event.clientY,
      style: {
        transform: `rotate(${Math.atan2(event.clientY - orb.y, event.clientX - orb.x)}rad)`,
        width: `${Math.hypot(event.clientX - orb.x, event.clientY - orb.y)}px`,
        left: `${orb.x}px`,
        top: `${orb.y}px`,
      },
    };

    lines.value = [line]; // Display the current line
  }
};

const stopDragOrb = () => {
  document.removeEventListener('mousemove', onDragOrb);
  document.removeEventListener('mouseup', stopDragOrb);

  // Attach the line to another orb if it was dragged to one
  if (currentLine) {
    lines.value.push(currentLine);
    currentLine = null; // Reset after attaching the line
  }
};

// Calculate the position of the orb outside the text box
const getOrbPosition = (block, orbPosition) => {
  const offset = 10; // Adjust this value to control how far outside the box the orbs should be
  const positions = {
    'top-left': { x: block.x - offset, y: block.y - offset },
    'top-right': { x: block.x + block.width + offset, y: block.y - offset },
    'bottom-left': { x: block.x - offset, y: block.y + block.height + offset },
    'bottom-right': { x: block.x + block.width + offset, y: block.y + block.height + offset },
  };
  return positions[orbPosition];
};

// Get the style for each orb
const getOrbStyle = (block, orbPosition) => {
  const orb = getOrbPosition(block, orbPosition);
  return {
    left: `${orb.x}px`,
    top: `${orb.y}px`,
  };
};
</script>
