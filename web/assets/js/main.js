// 1. Navbar Scroll Effect
window.addEventListener('scroll', function () {
    const nav = document.querySelector('.glass-nav');
    if (nav) {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
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

// 3. CAROUSEL LOGIC
const track = document.getElementById('scrollTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let currentTranslate = 0;

if (track && prevBtn && nextBtn) {
    function checkAutoScroll() {
        const style = window.getComputedStyle(track);
        const matrix = new WebKitCSSMatrix(style.transform);
        if (matrix.m41 < -10) {
            prevBtn.classList.add('active');
            prevBtn.style.opacity = "1";
            prevBtn.style.pointerEvents = "auto";
        } else {
            prevBtn.classList.remove('active');
            prevBtn.style.opacity = "0";
            prevBtn.style.pointerEvents = "none";
        }
        const maxScroll = track.scrollWidth - track.parentElement.offsetWidth;
        if (Math.abs(matrix.m41) >= maxScroll - 10) {
            nextBtn.style.opacity = "0";
            nextBtn.style.pointerEvents = "none";
        } else {
            nextBtn.style.opacity = "1";
            nextBtn.style.pointerEvents = "auto";
        }
    }
    setInterval(checkAutoScroll, 100);

    function moveSlider(direction) {
        const firstCard = track.querySelector('.v-card');
        if (!firstCard) return;
        const cardWidth = firstCard.offsetWidth;
        const gap = parseInt(window.getComputedStyle(track).gap) || 0;
        const step = cardWidth + gap;
        track.style.animation = 'none';
        track.classList.add('manual-mode');
        if (direction === 'next') currentTranslate -= step;
        else currentTranslate += step;
        if (currentTranslate > 0) currentTranslate = 0;
        const maxScroll = track.scrollWidth - track.parentElement.offsetWidth;
        if (Math.abs(currentTranslate) > maxScroll) currentTranslate = -maxScroll;
        track.style.transform = `translateX(${currentTranslate}px)`;
    }
    nextBtn.addEventListener('click', () => moveSlider('next'));
    prevBtn.addEventListener('click', () => moveSlider('prev'));

    // --- MOBILE TOUCH SWIPE ---
    let startX = 0;
    let isMoving = false;
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
        const maxScroll = track.scrollWidth - track.parentElement.offsetWidth;
        if (move > 0) move = 0;
        if (Math.abs(move) > maxScroll) move = -maxScroll;
        track.style.transform = `translateX(${move}px)`;
    }, { passive: true });
    track.addEventListener('touchend', (e) => {
        isMoving = false;
        const endX = e.changedTouches[0].pageX;
        currentTranslate += (endX - startX);
        const maxScroll = track.scrollWidth - track.parentElement.offsetWidth;
        if (currentTranslate > 0) currentTranslate = 0;
        if (Math.abs(currentTranslate) > maxScroll) currentTranslate = -maxScroll;
        track.style.transform = `translateX(${currentTranslate}px)`;
    });
}

// 4. GLOBAL FOOTER LOADER
document.addEventListener('DOMContentLoaded', () => {
    if (!document.querySelector('.main-site-footer')) {
        fetch('components/footer.html') 
            .then(response => {
                if (!response.ok) throw new Error('Footer not found');
                return response.text();
            })
            .then(data => {
                document.body.insertAdjacentHTML('beforeend', data);
            })
            .catch(err => console.error("Footer fetch error:", err));
    }

    // 5. MOBILE MENU TOGGLE
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
    }
}); // <--- THIS WAS MISSING AND BREAKING EVERYTHING