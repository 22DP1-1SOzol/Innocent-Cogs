<template>
  <div class="dropdown-container">
    <button @click="open = !open" class="hamburger" title="Menu">
      ☰
    </button>

    <transition name="slide-down">
      <div v-if="open" class="menu">
        <ul>
            <li @click="select('New Note')">📝 New Note</li>
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
  display: inline-block;
}

.hamburger {
  font-size: 24px;
  background: none;
  border: none;
  cursor: pointer;
  color: #444;
  padding: 6px 10px;
  border-radius: 6px;
  transition: background 0.2s ease;
}
.hamburger:hover {
  background-color: #eaeaea;
}

.menu {
  position: absolute;
  top: 100%;
  left: 0;
  background: #ffffff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
  min-width: 180px;
  padding: 0.5rem 0;
  z-index: 200;
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
  background-color: #f6f7f8;
}

/* Slide-down animation */
.slide-down-enter-active {
  transition: all 0.25s ease-out;
}
.slide-down-leave-active {
  transition: all 0.2s ease-in;
}
.slide-down-enter-from {
  opacity: 0;
  transform: translateY(-8px);
}
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
.divider {
  border-top: 1px solid #eee;
  margin: 0.3rem 0;
  pointer-events: none;
}

</style>
