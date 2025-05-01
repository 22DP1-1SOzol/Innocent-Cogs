<template>
  <div class="editor">
    <input
      v-model="localNote.title"
      placeholder="Title"
      class="title-input"
    />
    <textarea
      v-model="localNote.content"
      placeholder="Start typing your note..."
      class="content-textarea"
    ></textarea>

    <button @click="$emit('delete-note', localNote.id)" class="delete-btn">
      🗑 Delete Note
    </button>
  </div>
</template>


<script>
import { reactive, watch } from 'vue'

export default {
  name: 'NoteEditor',
  props: {
    note: Object
  },
  setup(props, { emit }) {
    const localNote = reactive({ ...props.note })

    watch(localNote, () => {
      emit('update-note', { ...localNote })
    }, { deep: true })

    return { localNote }
  }
}
</script>

<style scoped>
.editor {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: white;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
}

.title-input {
  font-size: 1.2rem;
  padding: 0.6rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.2s;
}

.title-input:focus {
  border-color: #007acc;
}

.content-textarea {
  flex: 1;
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-family: inherit;
  font-size: 1rem;
  resize: vertical;
  outline: none;
  min-height: 300px;
}

.content-textarea:focus {
  border-color: #007acc;
}

.delete-btn {
  margin-top: 1rem;
  background-color: #ef4444;
  color: white;
  border: none;
  padding: 0.6rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.2s;
}

.delete-btn:hover {
  background-color: #dc2626;
}
</style>

