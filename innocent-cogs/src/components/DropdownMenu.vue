<template>
  <div class="dropdown-container">
    <button @click="open = !open" class="hamburger" title="Menu">
      ☰
    </button>

    <transition name="slide-down">
      <div v-if="open" class="menu">
        <ul>
          <li @click="select('Export Notes')">📤 Export Notes</li>
          <li @click="select('Import Notes')">📥 Import Notes</li>
          <li @click="select('About')">ℹ️ About</li>
          <li class="divider"></li>
          <li @click="select('Logout')">🚪 Iziet</li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'DropdownMenu',
  emits: ['menu-select'],
  setup(_, { emit }) {
    const open = ref(false)

    function select(option) {
      emit('menu-select', option)
      open.value = false
    }

    return { open, select }
  }
}
</script>

<style scoped>
.dropdown-container {
  position: relative;
  z-index: 1000;
}

.hamburger {
  font-size: 24px;
  background: var(--color-peach);
  border: none;
  color: var(--color-dark);
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 8px;
  transition: background 0.2s ease;
}
.hamburger:hover {
  background-color: var(--color-rose);
  color: white;
}

.menu {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1001;
  min-width: 180px;
  background-color: var(--color-peach);
  color: var(--color-dark);
  border: 1px solid var(--color-rose);
  border-radius: 8px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  padding: 0.5rem 0;
}

.menu ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.menu li {
  padding: 0.75rem 1rem;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.2s ease;
}
.menu li:hover {
  background-color: var(--color-rose);
  color: white;
}

.divider {
  border-top: 1px solid var(--color-rose);
  margin: 0.3rem 0;
  pointer-events: none;
}

/* Animation */
.slide-down-enter-active {
  transition: all 0.25s ease-out;
}
.slide-down-leave-active {
  transition: all 0.2s ease-in;
}
.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
