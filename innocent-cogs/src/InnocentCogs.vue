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

export default {
  name: 'InnocentCogs',
  components: {
    NoteList,
    NoteEditor,
    DropdownMenu
  },
  setup() {
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
    const blob = new Blob([JSON.stringify(notes.value)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'innocent-cogs-notes.json'
    link.click()
    URL.revokeObjectURL(url)
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
      handleMenuSelect
    }
  }
}
</script>

<style scoped>
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
  border-bottom: 1px solid #ccc;
  background-color: rgb(255, 255, 255);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 30px;
  z-index: 100;
}

.title {
  margin-left: 1rem;
  font-size: 2rem;
  font-family: 'Monoton', cursive; /* 👈 Monoton applied */
  color: #155c35;
  letter-spacing: 1.5px;
  font-weight: normal;
  text-transform: uppercase; /* optional for bold look */
}




.layout {
  display: flex;
  gap: 1.5rem;
  padding: 2rem;
  padding-top: 80px;
  flex: 1;
  overflow: auto;
  background: #345d46;
  font-family: 'Segoe UI', sans-serif;
}
</style>
