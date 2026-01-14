// 1. Navbar Scroll Effect
const nav = document.querySelector('.glass-nav');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.style.background = "rgba(10, 10, 12, 0.95)";
        nav.style.padding = "15px 8%";
        nav.style.borderBottom = "1px solid rgba(255, 77, 0, 0.3)";
    } else {
        nav.style.background = "rgba(10, 10, 12, 0.8)";
        nav.style.padding = "20px 8%";
        nav.style.borderBottom = "1px solid rgba(255, 255, 255, 0.1)";
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