document.addEventListener("DOMContentLoaded", () => {
    const toggleThemeBtn = document.getElementById('toggle-theme-btn');
    const saveNoteBtn = document.getElementById('save-note-btn');
    const highlightTextBtn = document.getElementById('highlight-text-btn');
    const addBulletBtn = document.getElementById('add-bullet-btn');
    const editor = document.getElementById('editor');
    const loginBtn = document.getElementById('login-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const authSection = document.getElementById('auth-section');
    
    let isAuthenticated = false;
    let theme = 'light'; // Default theme

    // Toggle between light and dark themes
    toggleThemeBtn.addEventListener('click', () => {
        theme = theme === 'light' ? 'dark' : 'light';
        document.body.className = theme;
    });

    // Save the note (for now, just logs it)
    saveNoteBtn.addEventListener('click', () => {
        const noteContent = editor.innerHTML;
        console.log('Note Saved:', noteContent);
        // You can save to localStorage or send it to a server here
    });

    // Highlight selected text
    highlightTextBtn.addEventListener('click', () => {
        document.execCommand('backColor', false, 'yellow'); // Highlights text with yellow
    });

    // Add a bullet point list
    addBulletBtn.addEventListener('click', () => {
        document.execCommand('insertUnorderedList');
    });

    // Log In and Log Out actions
    loginBtn.addEventListener('click', () => {
        isAuthenticated = true;
        authSection.innerHTML = `
            <button id="logout-btn">Log Out</button>
        `;
        document.getElementById('logout-btn').addEventListener('click', () => {
            isAuthenticated = false;
            authSection.innerHTML = `
                <button id="login-btn">Log In</button>
            `;
            document.getElementById('login-btn').addEventListener('click', () => {
                isAuthenticated = true;
                authSection.innerHTML = `
                    <button id="logout-btn">Log Out</button>
                `;
            });
        });
    });

    // Initialize the theme
    document.body.className = theme;
});
