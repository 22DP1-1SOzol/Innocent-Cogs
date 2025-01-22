new Vue({
  el: '#app',
  data: {
    orbs: [],
    selectedOrb: null,
    zoom: 1,
    dragStart: null,
  },
  methods: {
    addOrb() {
      this.orbs.push({ x: 100, y: 100, text: '' });
    },
    selectOrb(index, event) {
      this.selectedOrb = index;
      this.dragStart = { x: event.clientX, y: event.clientY };
    },
    startDrag(event) {
      if (this.selectedOrb !== null) {
        this.dragStart = { x: event.clientX, y: event.clientY };
      }
    },
    onDrag(event) {
      if (this.selectedOrb !== null) {
        const orb = this.orbs[this.selectedOrb];
        orb.x += (event.clientX - this.dragStart.x) / this.zoom;
        orb.y += (event.clientY - this.dragStart.y) / this.zoom;
        this.dragStart = { x: event.clientX, y: event.clientY };
      }
    },
    endDrag() {
      this.selectedOrb = null;
    },
  }
});
