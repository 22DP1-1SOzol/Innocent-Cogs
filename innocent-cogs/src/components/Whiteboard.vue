<template>
    <div class="whiteboard">
      <div
        class="bullet"
        v-for="note in notes"
        :key="note.id"
        :style="{ top: note.y + 'px', left: note.x + 'px' }"
        @mousedown="startDrag(note, $event)"
      >
        • {{ note.title || 'Untitled Note' }}
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Whiteboard',
    props: {
      notes: Array // expects notes to have .x and .y props
    },
    methods: {
      startDrag(note, event) {
        const offsetX = event.clientX - (note.x || 0)
        const offsetY = event.clientY - (note.y || 0)
  
        const onMouseMove = (e) => {
          note.x = e.clientX - offsetX
          note.y = e.clientY - offsetY
        }
  
        const onMouseUp = () => {
          document.removeEventListener('mousemove', onMouseMove)
          document.removeEventListener('mouseup', onMouseUp)
        }
  
        document.addEventListener('mousemove', onMouseMove)
        document.addEventListener('mouseup', onMouseUp)
      }
    },
    mounted() {
      this.notes.forEach((n) => {
        if (n.x === undefined) n.x = 20 + Math.random() * 200
        if (n.y === undefined) n.y = 20 + Math.random() * 200
      })
    }
  }
  </script>
  
  <style scoped>
  .whiteboard {
    position: relative;
    width: 100%;
    height: 100%;
    background: white;
    overflow: hidden;
    border-radius: 12px;
  }
  
  .bullet {
    position: absolute;
    cursor: grab;
    font-size: 1rem;
    padding: 6px 10px;
    background: var(--color-peach);
    color: var(--color-dark);
    border-radius: 6px;
    user-select: none;
    transition: transform 0.1s ease;
  }
  .bullet:hover {
    transform: scale(1.05);
  }
  </style>
  