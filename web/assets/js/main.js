// 1. Navbar Scroll Effect (Updated with Class Toggle)
window.addEventListener('scroll', function() {
    const nav = document.querySelector('.glass-nav');
    
    if (window.scrollY > 50) {
        nav.classList.add('scrolled'); // Adds the dark background
    } else {
        nav.classList.remove('scrolled'); // Forcefully removes it at the top
    }
});

// 2. Simple Scroll Reveal Logic
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// Target all value cards to reveal on scroll
document.querySelectorAll('.v-card').forEach(card => {
    card.classList.add('scroll-reveal');
    observer.observe(card);
});