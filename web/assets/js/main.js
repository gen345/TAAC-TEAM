// 1. Navbar Scroll Effect
window.addEventListener('scroll', function () {
    const nav = document.querySelector('.glass-nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// 2. Intersection Observer (Reveal on Scroll)
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));

// 3. CAROUSEL LOGIC (Smart Distance + Arrows + Swipe)
const track = document.getElementById('scrollTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentTranslate = 0;

// --- A. THE AUTO-MONITOR (Handles Arrow Visibility & Opacity) ---
function checkAutoScroll() {
    if (track) {
        const style = window.getComputedStyle(track);
        const matrix = new WebKitCSSMatrix(style.transform);

        // Show Prev Button if we have scrolled away from the start
        if (matrix.m41 < -10) {
            prevBtn.classList.add('active');
            prevBtn.style.opacity = "1";
            prevBtn.style.pointerEvents = "auto";
        } else {
            prevBtn.classList.remove('active');
            prevBtn.style.opacity = "0";
            prevBtn.style.pointerEvents = "none";
        }

        // Hide Next Button if we reach the very end
        const maxScroll = track.scrollWidth - track.parentElement.offsetWidth;
        if (Math.abs(matrix.m41) >= maxScroll - 10) {
            nextBtn.style.opacity = "0";
            nextBtn.style.pointerEvents = "none";
        } else {
            nextBtn.style.opacity = "1";
            nextBtn.style.pointerEvents = "auto";
        }
    }
}
if (track) setInterval(checkAutoScroll, 100);

// --- B. SMART MANUAL NAVIGATION ---
function moveSlider(direction) {
    if (!track) return;

    // Dynamically get sizes (works for both desktop and mobile)
    const firstCard = track.querySelector('.v-card');
    const cardWidth = firstCard.offsetWidth;
    const gap = parseInt(window.getComputedStyle(track).gap) || 0;
    const step = cardWidth + gap;

    track.style.animation = 'none';
    track.classList.add('manual-mode');

    if (direction === 'next') {
        currentTranslate -= step;
    } else {
        currentTranslate += step;
    }

    // Don't go past start
    if (currentTranslate > 0) currentTranslate = 0;

    // Don't go past end
    const maxScroll = track.scrollWidth - track.parentElement.offsetWidth;
    if (Math.abs(currentTranslate) > maxScroll) {
        currentTranslate = -maxScroll;
    }

    track.style.transform = `translateX(${currentTranslate}px)`;
}

if (nextBtn) nextBtn.addEventListener('click', () => moveSlider('next'));
if (prevBtn) prevBtn.addEventListener('click', () => moveSlider('prev'));

// --- C. MOBILE TOUCH SWIPE ---
let startX = 0;
let isMoving = false;

if (track) {
    track.addEventListener('touchstart', (e) => {
        track.style.animation = 'none';
        track.classList.add('manual-mode');
        startX = e.touches[0].pageX;
        isMoving = true;
    }, { passive: true });

    track.addEventListener('touchmove', (e) => {
        if (!isMoving) return;
        let touchX = e.touches[0].pageX;
        let move = currentTranslate + (touchX - startX);

        // Prevent swiping past the boundaries
        const maxScroll = track.scrollWidth - track.parentElement.offsetWidth;
        if (move > 0) move = 0;
        if (Math.abs(move) > maxScroll) move = -maxScroll;

        track.style.transform = `translateX(${move}px)`;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
        isMoving = false;
        const endX = e.changedTouches[0].pageX;
        currentTranslate += (endX - startX);

        // Snap to boundaries
        const maxScroll = track.scrollWidth - track.parentElement.offsetWidth;
        if (currentTranslate > 0) currentTranslate = 0;
        if (Math.abs(currentTranslate) > maxScroll) currentTranslate = -maxScroll;

        track.style.transform = `translateX(${currentTranslate}px)`;
    });
}

// --- D. MOBILE MENU TOGGLE ---
document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            menuBtn.classList.toggle('is-active');
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuBtn.classList.remove('is-active');
            });
        });

        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('active') && !navLinks.contains(e.target) && e.target !== menuBtn) {
                navLinks.classList.remove('active');
                menuBtn.classList.remove('is-active');
            }
        });
    }
});