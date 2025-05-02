<template>
  <div class="note-list">
    <h2>All Notes</h2>
    <button @click="$emit('create-note')">➕ New Note</button>

    <ul>
      <li 
        v-for="note in notes" 
        :key="note.id"
        :class="{ active: note.id === selectedId }"
        @click="$emit('select-note', note.id)"
      >
        {{ note.title || 'Untitled Note' }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'NoteList',
  props: {
    notes: Array,
    selectedId: String
  }
}
</script>

<style scoped>
.note-list {
  width: 220px;
  padding: 1rem;
  background: var(--color-plum);
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  color: white;
}

h2 {
  font-size: 1.1rem;
  margin-bottom: 1rem;
  font-weight: 600;
  color: var(--color-peach);
  text-align: center;
  width: 100%;
}

button {
  background-color: var(--color-rose);
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.4rem 0.8rem;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}

button:hover {
  background-color: var(--color-peach);
  color: var(--color-dark);
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  padding: 0.5rem 0.8rem;
  margin-bottom: 6px;
  border-radius: 6px;
  cursor: pointer;
  background-color: transparent;
  color: white;
  font-size: 14px;
  transition: background 0.2s;
}

li.active {
  background-color: var(--color-dark);
  font-weight: 600;
}

li:hover {
  background-color: var(--color-peach);
  color: var(--color-dark);
}

</style>
