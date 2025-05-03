<template>
  <div class="editor">
    <!-- Title input -->
    <input
      v-model="localNote.title"
      placeholder="Title"
      class="title-input"
    />

    <!-- Formatting Toolbar -->
    <div class="format-toolbar">
      <div class="button-group">
        <button @click="execCommand('bold')" title="Bold">B</button>
        <button @click="execCommand('italic')" title="Italic">I</button>
        <button @click="execCommand('underline')" title="Underline">U</button>
        <button @click="execCommand('strikeThrough')" title="Strikethrough">S</button>
        <button @click="execCommand('insertUnorderedList')" title="Bullet List">•</button>
        <button @click="execCommand('insertOrderedList')" title="Numbered List">1.</button>
        <button @click="formatBlock('h1')" title="Heading 1">H1</button>
        <button @click="formatBlock('h2')" title="Heading 2">H2</button>
        <button @click="execCommand('insertHorizontalRule')" title="Horizontal Rule">―</button>
        <button @click="execCommand('justifyLeft')" title="Align Left">L</button>
        <button @click="execCommand('justifyCenter')" title="Align Center">C</button>
        <button @click="execCommand('justifyRight')" title="Align Right">R</button>
        <button @click="execCommand('removeFormat')" title="Clear Formatting">✖</button>
      </div>
    </div>

    <!-- Rich Text Content -->
    <div
      class="rich-editor"
      ref="editor"
      contenteditable="true"
      @input="updateNoteContent"
    ></div>

    <!-- Delete Button -->
    <button @click="$emit('delete-note', localNote.id)" class="delete-btn">
      🗑 Delete Note
    </button>
  </div>
</template>

<script>
import { reactive, ref, watch, onMounted } from 'vue'

export default {
  name: 'NoteEditor',
  props: {
    note: {
      type: Object,
      required: true
    }
  },
  setup(props, { emit }) {
    const localNote = reactive({ ...props.note })
    const editor = ref(null)

    function updateNoteContent() {
      localNote.content = editor.value.innerHTML
    }

    function execCommand(command) {
      document.execCommand(command, false, null)
      updateNoteContent()
    }

    function formatBlock(tag) {
      document.execCommand('formatBlock', false, tag)
      updateNoteContent()
    }

    watch(localNote, () => {
      emit('update-note', { ...localNote })
    }, { deep: true })

    onMounted(() => {
      if (editor.value) {
        editor.value.innerHTML = localNote.content
      }
    })

    return {
      localNote,
      editor,
      execCommand,
      formatBlock,
      updateNoteContent
    }
  }
}
</script>

<style scoped>
.editor {
  flex: 1;
  max-width: 500px;            /* Wider max width for better space usage */
  min-width: 300px;
  width: 100%;
  display: flex;
  flex-direction: column;
  background: var(--color-dark);
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  color: white;
  box-sizing: border-box;
}


.title-input {
  font-size: 1.2rem;
  padding: 0.6rem;
  margin-bottom: 1rem;
  border: 1px solid var(--color-peach);
  border-radius: 8px;
  outline: none;
  background-color: var(--color-plum);
  color: white;
  width: 100%;
  box-sizing: border-box;
}

.title-input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.format-toolbar {
  display: flex;
  justify-content: flex-start;
  background: var(--color-plum);
  padding: 0.5rem;
  border: 1px solid var(--color-peach);
  border-radius: 8px;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 0.5rem;
  width: 100%;
  box-sizing: border-box;
}


.button-group button {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  background-color: var(--color-rose);
  color: white;
  cursor: pointer;
  font-size: 0.95rem;
  transition: background 0.2s, transform 0.1s;
  flex-shrink: 0;
}

.button-group {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}


.button-group button:hover {
  background-color: var(--color-peach);
  color: var(--color-dark);
  transform: scale(1.05);
}

.rich-editor {
  flex: 1;
  width: 100%;
  min-height: 300px;
  border: 1px solid var(--color-peach);
  border-radius: 8px;
  padding: 1rem;
  background-color: var(--color-plum);
  color: white;
  outline: none;
  font-size: 1rem;
  font-family: inherit;
  margin-bottom: 1rem;
  overflow-y: auto;
  box-sizing: border-box;
}


.rich-editor blockquote {
  border-left: 4px solid var(--color-peach);
  margin: 1rem 0;
  padding: 0.5rem 1rem;
  color: #ffd;
  background-color: rgba(255, 255, 255, 0.05);
  font-style: italic;
}

.rich-editor pre {
  background-color: rgba(255, 255, 255, 0.1);
  padding: 0.8rem;
  border-radius: 6px;
  overflow-x: auto;
  font-family: monospace;
  white-space: pre-wrap;
}

.delete-btn {
  background-color: var(--color-rose);
  color: white;
  border: none;
  padding: 0.6rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.2s;
}

.delete-btn:hover {
  background-color: var(--color-peach);
  color: var(--color-dark);
}

.title-input:focus,
.rich-editor:focus {
  border-color: var(--color-peach);
  box-shadow: 0 0 4px var(--color-peach);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .format-toolbar {
    flex-direction: column;
    gap: 0.25rem;
  }

  .button-group button {
    font-size: 0.95rem;
    padding: 5px 8px;
  }

  .title-input {
    font-size: 1rem;
  }

  .rich-editor {
    font-size: 0.95rem;
  }
}
</style>

