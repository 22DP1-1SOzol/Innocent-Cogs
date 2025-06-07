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
                <div class="note-title-btn disabled" v-else>
                  {{ note.title || 'Untitled Note' }}
                  <button class="remove-btn-inline" @click.stop="removeNoteById(note.id)">✖</button>
                </div>
              </div>
            </div>
          </transition>
        </div>

        <div class="panel-content" ref="panel">
          <!-- Notes and Dots inside wrapper -->
          <div
            v-for="(note, index) in placedNotes"
            :key="note.id"
            class="note-wrapper"
            @mouseenter="hoveredNote = note.id"
            @mouseleave="hoveredNote = null"
            :style="{ left: note.x + 'px', top: note.y + 'px' }"
          >
            <div
              class="draggable-note"
              :ref="el => noteRefs[note.id] = el"
              @mousedown.prevent="startDrag($event, index)"
            >
              {{ note.title || 'Untitled Note' }}
            </div>

            <!-- Dots on hover -->
            <div
              v-if="hoveredNote === note.id"
              v-for="(offset, dir) in getDotOffsets(note)"
              :key="dir"
              class="dot"
              :style="{ left: offset.x + 'px', top: offset.y + 'px' }"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'SidePanel',
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
      dragOffsetY: 0,
      noteRefs: {},
      hoveredNote: null
    };
  },
  methods: {
    toggleList() {
      this.showList = !this.showList;
    },
    isPlaced(note) {
      return this.placedNotes.some(n => n.id === note.id);
    },
    placeNote(note) {
      if (!this.isPlaced(note)) {
        const newPlaced = [
          ...this.placedNotes,
          { id: note.id, title: note.title, x: 200, y: 100 }
        ];
        this.$emit('update:placedNotes', newPlaced);
      }
    },
    removeNoteById(id) {
      const updated = this.placedNotes.filter(note => note.id !== id);
      this.$emit('update:placedNotes', updated);
    },
    startDrag(event, index) {
      this.draggingIndex = index;
      const note = this.placedNotes[index];
      this.dragOffsetX = event.clientX - note.x;
      this.dragOffsetY = event.clientY - note.y;
      window.addEventListener('mousemove', this.onDrag);
      window.addEventListener('mouseup', this.stopDrag);
    },
    onDrag(event) {
      if (this.draggingIndex !== null) {
        const updated = [...this.placedNotes];
        updated[this.draggingIndex] = {
          ...updated[this.draggingIndex],
          x: event.clientX - this.dragOffsetX,
          y: event.clientY - this.dragOffsetY
        };
        this.$emit('update:placedNotes', updated);
      }
    },
    stopDrag() {
      this.draggingIndex = null;
      window.removeEventListener('mousemove', this.onDrag);
      window.removeEventListener('mouseup', this.stopDrag);
    },
    getNoteSize(noteId) {
      const el = this.noteRefs[noteId];
      if (!el) return { width: 150, height: 40 };
      const rect = el.getBoundingClientRect();
      return { width: rect.width, height: rect.height };
    },
    getDotOffsets(note) {
      const size = this.getNoteSize(note.id);
      const centerX = size.width / 2;
      const centerY = size.height / 2;
      return {
        top: { x: centerX, y: -10 },
        right: { x: size.width + 10, y: centerY },
        bottom: { x: centerX, y: size.height + 10 },
        left: { x: -10, y: centerY }
      };
    }
  }
};
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
  background: var(--color-peach);
  border: none;
  border-radius: 6px;
  padding: 0.3rem 0.6rem;
  font-size: 0.9rem;
  color: var(--color-dark);
  cursor: pointer;
}
.note-title-btn.disabled {
  background: linear-gradient(135deg, var(--color-peach), #fdd49a);
  color: var(--color-dark);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  font-weight: bold;
  font-size: 1rem;
  padding: 0.6rem 0.8rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2), inset 0 0 0 2px var(--color-rose);
  text-align: center;
  gap: 0.6rem;
  transition: background 0.3s ease, transform 0.2s ease;
}
.remove-btn-inline {
  background: none;
  border: none;
  color: var(--color-rose);
  cursor: pointer;
}

.panel-content {
  flex: 1;
  position: relative;
}

.note-wrapper {
  position: absolute;
  width: 200px;
  height: 120px;
  transform: translate(-25%, -25%);
  pointer-events: auto;
  z-index: 2;
}

.draggable-note {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: var(--color-peach);
  color: var(--color-dark);
  padding: 0.4rem 0.6rem;
  border-radius: 8px;
  font-weight: bold;
  text-align: center;
  cursor: move;
  user-select: none;
  white-space: nowrap;
  z-index: 3;
}

.dot {
  position: absolute;
  width: 10px;
  height: 10px;
  background: red;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  z-index: 4;
  cursor: crosshair;
}
</style>
