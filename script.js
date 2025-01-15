const noteArea = document.getElementById('note');
const saveBtn = document.getElementById('saveBtn');
const loadBtn = document.getElementById('loadBtn');
const fontSizeSelect = document.getElementById('fontSizeSelect');

// Save text to local storage
saveBtn.addEventListener('click', () => {
    const text = noteArea.value;
    localStorage.setItem('webNotepad', text);
    alert('Notes saved!');
});

// Load text from local storage
loadBtn.addEventListener('click', () => {
    const savedText = localStorage.getItem('webNotepad');
    if (savedText) {
        noteArea.value = savedText;
    } else {
        alert('No saved notes found.');
    }
});

// Change font size of the note area
fontSizeSelect.addEventListener('change', () => {
    const selectedFontSize = fontSizeSelect.value;
    noteArea.style.fontSize = selectedFontSize;
});
