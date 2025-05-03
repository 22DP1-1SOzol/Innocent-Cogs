<template>
  <transition name="slide">
    <div v-if="visible" class="slide-wrapper">
      <div class="slide-panel">
        <div class="left-controls">
          <button class="notes-toggle" @click="toggleList">🗂 Notes</button>
          <transition name="fade">
            <div v-if="showList" class="note-list">
              <div
                v-for="note in notes"
                :key="note.id"
                class="note-title-wrapper"
              >
                <button
                  v-if="!isPlaced(note)"
                  class="note-title-btn"
                  @click="placeNote(note)"
                >
                  {{ note.title || 'Untitled Note' }}
                </button>
                <div
                  v-else
                  class="note-title-btn disabled"
                >
                  {{ note.title || 'Untitled Note' }} <span class="x-indicator">✔</span>
                </div>
              </div>
            </div>
          </transition>
        </div>

        <div class="panel-content">
          <div
            v-for="(note, index) in placedNotes"
            :key="note.id"
            class="draggable-note"
            :style="{ left: note.x + 'px', top: note.y + 'px' }"
            @mousedown.prevent="startDrag($event, index)"
          >
            {{ note.title || 'Untitled Note' }}
            <button class="remove-btn" @click.stop="removeNote(index)">✖</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'SlidePanel',
  props: {
    visible: Boolean,
    notes: Array,
    placedNotes: Array
  },
  emits: ['update:placedNotes'],
  data() {
    return {
      showList: true,
      draggingIndex: null,
      dragOffsetX: 0,
      dragOffsetY: 0
    }
  },
  methods: {
    toggleList() {
      this.showList = !this.showList
    },
    isPlaced(note) {
      return this.placedNotes.some(n => n.id === note.id)
    },
    placeNote(note) {
      if (!this.isPlaced(note)) {
        const newPlaced = [
          ...this.placedNotes,
          { id: note.id, title: note.title, x: 200, y: 100 }
        ]
        this.$emit('update:placedNotes', newPlaced)
      }
    },
    removeNote(index) {
      const updated = [...this.placedNotes]
      updated.splice(index, 1)
      this.$emit('update:placedNotes', updated)
    },
    startDrag(event, index) {
      this.draggingIndex = index
      const note = this.placedNotes[index]
      this.dragOffsetX = event.clientX - note.x
      this.dragOffsetY = event.clientY - note.y
      window.addEventListener('mousemove', this.onDrag)
      window.addEventListener('mouseup', this.stopDrag)
    },
    onDrag(event) {
      if (this.draggingIndex !== null) {
        const updated = [...this.placedNotes]
        updated[this.draggingIndex] = {
          ...updated[this.draggingIndex],
          x: event.clientX - this.dragOffsetX,
          y: event.clientY - this.dragOffsetY
        }
        this.$emit('update:placedNotes', updated)
      }
    },
    stopDrag() {
      this.draggingIndex = null
      window.removeEventListener('mousemove', this.onDrag)
      window.removeEventListener('mouseup', this.stopDrag)
    }
  }
}
</script>


<style scoped>
.slide-wrapper {
  position: fixed;
  top: 93px;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 900;
}

.slide-panel {
  height: 100%;
  background: var(--color-dark);
  display: flex;
  flex-direction: row;
  padding: 1rem;
  box-sizing: border-box;
  overflow: hidden;
}

.left-controls {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 180px;
  padding-right: 1rem;
  border-right: 1px solid var(--color-peach);
}

.notes-toggle {
  background-color: var(--color-rose);
  color: white;
  border: none;
  padding: 0.4rem 0.8rem;
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;
  width: 100%;
  margin-bottom: 0.5rem;
}

.note-list {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  width: 100%;
}

.note-title-btn {
  text-align: left;
  background: var(--color-peach);
  border: none;
  border-radius: 6px;
  padding: 0.3rem 0.6rem;
  font-size: 0.9rem;
  color: var(--color-dark);
  cursor: pointer;
  transition: background 0.2s;
}

.note-title-btn:hover {
  background-color: var(--color-rose);
  color: white;
}

.note-title-btn.disabled {
  cursor: default;
  opacity: 0.6;
  background-color: #888;
  color: white;
  display: flex;
  justify-content: space-between;
  padding-right: 0.8rem;
}

.x-indicator {
  margin-left: 0.5rem;
}

.panel-content {
  flex: 1;
  position: relative;
  overflow: hidden;
}

.draggable-note {
  position: absolute;
  background: var(--color-peach);
  color: var(--color-dark);
  padding: 0.4rem 0.6rem;
  border-radius: 8px;
  cursor: move;
  font-weight: bold;
  user-select: none;
}

.remove-btn {
  background: transparent;
  border: none;
  margin-left: 0.5rem;
  color: var(--color-rose);
  font-weight: bold;
  cursor: pointer;
}

.remove-btn:hover {
  color: white;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.4s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
.slide-enter-to,
.slide-leave-from {
  transform: translateX(0%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
