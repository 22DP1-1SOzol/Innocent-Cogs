const noteArea = document.getElementById('note');
const saveBtn = document.getElementById('saveBtn');
const loadBtn = document.getElementById('loadBtn');

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
