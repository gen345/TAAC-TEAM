// 1. Navbar Scroll Effect + Logo Swap
(function () {
    const path = window.location.pathname;
    const isSubfolder = path.includes('/packages/') || path.includes('/destinations/');
    const prefix = isSubfolder ? '../' : '';

    const LOGO_WHITE  = prefix + 'assets/logo/logo-w.png';
    const LOGO_COLOUR = prefix + 'assets/logo/logo.png';

    function updateNav() {
        const nav = document.querySelector('.glass-nav');
        const logo = document.getElementById('main-logo');
        if (!nav) return;
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
            if (logo) logo.src = LOGO_COLOUR;
        } else {
            nav.classList.remove('scrolled');
            if (logo) logo.src = LOGO_WHITE;
        }
    }

    window.addEventListener('scroll', updateNav);
    document.addEventListener('DOMContentLoaded', updateNav);
})();

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
    const placeholder = document.getElementById('footer-placeholder');
    if (placeholder) {
        const path = window.location.pathname;
        const isSubfolder = path.includes('/packages/') || path.includes('/destinations/');
        const footerPath = isSubfolder ? '../components/footer.html' : 'components/footer.html';
        const logoPrefix = isSubfolder ? '../' : '';

        fetch(footerPath)
            .then(response => {
                if (!response.ok) throw new Error('Footer not found at ' + footerPath);
                return response.text();
            })
            .then(data => {
                placeholder.innerHTML = data;
                const footerLogo = placeholder.querySelector('.footer-logo');
                if (footerLogo) {
                    footerLogo.src = logoPrefix + 'assets/logo/logo-w.png';
                }
            })
            .catch(err => console.error("Footer load error:", err));
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
});

// 6. UNIVERSAL WHATSAPP ITINERARY LINK
document.addEventListener("DOMContentLoaded", function () {
    const whatsappBtn = document.getElementById('whatsapp-btn');
    const packageName = document.getElementById('package-name');
    if (whatsappBtn && packageName) {
        const phoneNumber = "918420565320";
        const tripTitle = packageName.innerText || packageName.textContent;
        const message = encodeURIComponent(`Hi! I'm interested in the ${tripTitle} package. Please share more details.`);
        whatsappBtn.href = `https://wa.me/${phoneNumber}?text=${message}`;
        whatsappBtn.setAttribute('target', '_blank');
    }
});

// 7. GENERIC LEAFLET MAP — lazy load only when map exists on page
function initGenericMap() {
    const mapEl = document.getElementById('map');
    if (!mapEl) return;

    if (typeof L === 'undefined') {
        const leafletCSS = document.createElement('link');
        leafletCSS.rel = 'stylesheet';
        leafletCSS.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(leafletCSS);

        const leafletJS = document.createElement('script');
        leafletJS.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
        leafletJS.onload = () => renderMap(mapEl);
        document.head.appendChild(leafletJS);
        return;
    }
    renderMap(mapEl);
}

function renderMap(mapEl) {
    if (!mapEl || typeof L === 'undefined') return;

    const spots = JSON.parse(mapEl.dataset.spots);
    const center = JSON.parse(mapEl.dataset.center);
    const zoom = parseInt(mapEl.dataset.zoom);
    const map = L.map('map').setView(center, zoom);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap'
    }).addTo(map);

    const orangeIcon = L.divIcon({
        className: 'custom-pin',
        html: `<div style="background:#E8611A; width:12px; height:12px; border-radius:50%; border:2px solid #fff; box-shadow:0 0 10px #E8611A;"></div>`,
        iconSize: [12, 12]
    });

    const latLngs = [];
    spots.forEach(spot => {
        latLngs.push(spot.coords);
        const marker = L.marker(spot.coords, { icon: orangeIcon }).addTo(map);
        marker.bindPopup(`
            <div style="font-family:'Plus Jakarta Sans',sans-serif; padding:5px;">
                <strong style="color:#E8611A;">${spot.day}</strong><br>
                <span style="color:#333; font-weight:700;">${spot.name}</span>
            </div>
        `);
        marker.on('mouseover', function () { this.openPopup(); });
        marker.on('click', () => { map.flyTo(spot.coords, 13); });
    });

    L.polyline(latLngs, {
        color: '#E8611A',
        weight: 2,
        opacity: 0.5,
        dashArray: '5, 10'
    }).addTo(map);

    const bounds = L.latLngBounds(latLngs);
    map.fitBounds(bounds, { padding: [50, 50] });
}

document.addEventListener('DOMContentLoaded', initGenericMap);