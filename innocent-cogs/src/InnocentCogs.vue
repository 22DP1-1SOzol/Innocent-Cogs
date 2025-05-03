<template>
  <div class="app-wrapper">
    <div class="top-bar">
      <DropdownMenu @menu-select="handleMenuSelect" />
      <h1 class="title">Innocent Cogs</h1>
    </div>

    <div class="layout">
      <NoteList
        :notes="notes"
        :selectedId="selectedNoteId"
        @select-note="selectNote"
        @create-note="createNote"
      />

      <NoteEditor
        v-if="selectedNote"
        :key="selectedNote.id"
        :note="selectedNote"
        @update-note="updateNote"
        @delete-note="deleteNote"
      />
    </div>

    <div v-if="showEnvelope" class="envelope-animation">✉️</div>

    <button class="right-arrow-btn" @click="handleArrowClick">➤</button>

    <SlidePanel
  v-if="showPanel"
  :visible="showPanel"
  :notes="notes"
  v-model:placedNotes="placedNotes"
  @close="showPanel = false"
  />
  </div>
</template>

<script>
import { signOut } from 'firebase/auth'
import { auth } from './firebase'
import { router } from './router'
import { ref, computed, watch } from 'vue'
import NoteList from './components/NoteList.vue'
import NoteEditor from './components/NoteEditor.vue'
import DropdownMenu from './components/DropdownMenu.vue'
import SlidePanel from './components/SlidePanel.vue'

export default {
  name: 'InnocentCogs',
  components: {
    NoteList,
    NoteEditor,
    DropdownMenu,
    SlidePanel
  },
  setup() {
    const showPanel = ref(false)
    const showEnvelope = ref(false)
    const placedNotes = ref([])

    function handleArrowClick() {
      showPanel.value = !showPanel.value
    }

    const STORAGE_KEY = 'innocent-cogs-notes'
    const notes = ref(JSON.parse(localStorage.getItem(STORAGE_KEY)) || [])
    const selectedNoteId = ref(notes.value[0]?.id || null)

    const selectedNote = computed(() =>
      notes.value.find(n => n.id === selectedNoteId.value)
    )

    function selectNote(id) {
      selectedNoteId.value = id
    }

    function createNote() {
      const newNote = {
        id: Date.now().toString(),
        title: '',
        content: ''
      }
      notes.value.unshift(newNote)
      selectedNoteId.value = newNote.id
    }

    function updateNote(updatedNote) {
      const index = notes.value.findIndex(n => n.id === updatedNote.id)
      if (index !== -1) {
        notes.value[index] = updatedNote
      }
    }

    function deleteNote(id) {
      const index = notes.value.findIndex(n => n.id === id)
      if (index !== -1) {
        notes.value.splice(index, 1)
        if (selectedNoteId.value === id) {
          selectedNoteId.value = notes.value[0]?.id || null
        }
      }
    }

    async function handleMenuSelect(option) {
      if (option === 'New Note') {
        createNote()
      } else if (option === 'Export Notes') {
        const now = new Date().toISOString().split('T')[0]
        const filename = `innocent-cogs-notes-${now}.json`
        const blob = new Blob([JSON.stringify(notes.value, null, 2)], {
          type: 'application/json'
        })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = filename
        link.click()
        URL.revokeObjectURL(url)
        showEnvelope.value = true
        setTimeout(() => {
          showEnvelope.value = false
        }, 1000)
      } else if (option === 'Import Notes') {
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = 'application/json'
        input.onchange = (e) => {
          const file = e.target.files[0]
          const reader = new FileReader()
          reader.onload = () => {
            try {
              const imported = JSON.parse(reader.result)
              if (Array.isArray(imported)) {
                notes.value = imported
                selectedNoteId.value = notes.value[0]?.id || null
              } else {
                alert('Invalid file format.')
              }
            } catch {
              alert('Error reading file.')
            }
          }
          reader.readAsText(file)
        }
        input.click()
      } else if (option === 'About') {
        router.push('/about')
      } else if (option === 'Logout') {
        try {
          await signOut(auth)
          router.push('/')
        } catch (err) {
          alert('Neizdevās iziet: ' + err.message)
        }
      }
    }

    watch(notes, () => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes.value))
    }, { deep: true })

    return {
      notes,
      selectedNoteId,
      selectedNote,
      selectNote,
      createNote,
      updateNote,
      deleteNote,
      handleMenuSelect,
      showEnvelope,
      showPanel,
      handleArrowClick,
      placedNotes
    }
  }
}
</script>

<style scoped>
.right-arrow-btn {
  position: fixed;
  top: 50%;
  right: -12px;
  transform: translateY(-50%);
  background-color: var(--color-peach);
  border: none;
  color: var(--color-dark);
  font-size: 1.5rem;
  padding: 0.4rem 0.6rem;
  border-radius: 6px 0 0 6px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  z-index: 1000;
  transition: background 0.3s ease;
}
.right-arrow-btn:hover {
  background-color: var(--color-rose);
  color: white;
}
.app-wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}
.top-bar {
  display: flex;
  align-items: center;
  padding: 1rem 2rem;
  border-bottom: 1px solid var(--color-peach);
  background-color: var(--color-dark);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  z-index: 100;
}
.title {
  margin-left: 1rem;
  font-size: 2rem;
  font-family: 'Monoton', cursive;
  color: var(--color-peach);
  letter-spacing: 1.5px;
  font-weight: normal;
  text-transform: uppercase;
}
.layout {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 1.5rem;
  padding: 2rem;
  padding-top: 80px;
  flex: 1;
  overflow: auto;
  background: var(--color-plum);
  font-family: 'Segoe UI', sans-serif;
  color: white;
}
.envelope-animation {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 64px;
  z-index: 9999;
  animation: pulseEnvelope 1.2s ease-out forwards;
  pointer-events: none;
  text-shadow:
    0 0 10px rgba(255, 255, 255, 0.7),
    0 0 25px rgba(201, 87, 146, 0.5),
    0 0 40px rgba(201, 87, 146, 0.3);
}
@keyframes pulseEnvelope {
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.3);
  }
  35% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(3.5);
  }
  65% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(2);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(1);
  }
}
</style>
