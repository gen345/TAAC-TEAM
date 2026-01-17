// 1. Navbar Scroll Effect
window.addEventListener('scroll', function() {
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

// 3. CAROUSEL LOGIC (Arrows + Swipe + Auto-Monitor)
const track = document.getElementById('scrollTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentTranslate = 0;
const cardStep = 350; 

// --- A. THE AUTO-MONITOR (Fixes Left Arrow Appearance) ---
function checkAutoScroll() {
    // We only check if we AREN'T in manual mode yet
    if (!track.classList.contains('manual-mode')) {
        const style = window.getComputedStyle(track);
        const matrix = new WebKitCSSMatrix(style.transform);
        
        if (matrix.m41 < -20) {
            prevBtn.classList.add('active');
        } else {
            prevBtn.classList.remove('active');
        }
    }
}
setInterval(checkAutoScroll, 100);

// --- B. MANUAL NAVIGATION (Fixes Click Not Working) ---
function moveSlider(direction) {
    // 1. COMPLETELY STOP CSS ANIMATION
    track.style.animation = 'none'; 
    track.classList.add('manual-mode'); 
    
    // 2. Calculate New Position
    if (direction === 'next') {
        currentTranslate -= cardStep;
    } else {
        currentTranslate += cardStep;
    }

    // 3. Set Boundaries
    if (currentTranslate > 0) currentTranslate = 0;
    
    // 4. Apply Transform
    track.style.transform = `translateX(${currentTranslate}px)`;

    // 5. Toggle Prev Button manually once in manual mode
    if (currentTranslate < -20) {
        prevBtn.classList.add('active');
    } else {
        prevBtn.classList.remove('active');
    }
}

nextBtn.addEventListener('click', () => moveSlider('next'));
prevBtn.addEventListener('click', () => moveSlider('prev'));

// --- C. MOBILE TOUCH SWIPE ---
let startX = 0;
let isMoving = false;

track.addEventListener('touchstart', (e) => {
    track.style.animation = 'none';
    track.classList.add('manual-mode');
    startX = e.touches[0].pageX;
    isMoving = true;
}, {passive: true});

track.addEventListener('touchmove', (e) => {
    if(!isMoving) return;
    let touchX = e.touches[0].pageX;
    let move = currentTranslate + (touchX - startX);
    
    if (move <= 0) {
        track.style.transform = `translateX(${move}px)`;
    }
}, {passive: true});

track.addEventListener('touchend', (e) => {
    isMoving = false;
    currentTranslate += (e.changedTouches[0].pageX - startX);
    if (currentTranslate > 0) currentTranslate = 0;
    
    if (currentTranslate < -20) prevBtn.classList.add('active');
    else prevBtn.classList.remove('active');
});