const toggleBtn = document.getElementById('theme-toggle');
const rootElement = document.documentElement;

// 1. Check for saved user preference
const savedTheme = localStorage.getItem('theme') || 'dark';
rootElement.setAttribute('data-theme', savedTheme);

// 2. Toggle logic
toggleBtn.addEventListener('click', () => {
    const currentTheme = rootElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    rootElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme); // Save preference
});