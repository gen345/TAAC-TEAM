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

// 4. GLOBAL FOOTER LOADER (Use this exact code)
document.addEventListener('DOMContentLoaded', () => {
    const placeholder = document.getElementById('footer-placeholder');
    if (placeholder) {
        // Remove the leading slash so it looks in the same folder as main.js
        fetch('components/footer.html') 
            .then(response => {
                if (!response.ok) throw new Error('Footer not found');
                return response.text();
            })
            .then(data => {
                placeholder.innerHTML = data;
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
}); //6 <--- THIS WAS MISSING AND BREAKING EVERYTHING

/* --- UNIVERSAL WHATSAPP ITINERARY LINK --- */
document.addEventListener("DOMContentLoaded", function() {
    const whatsappBtn = document.getElementById('whatsapp-btn');
    const packageName = document.getElementById('package-name');

    if (whatsappBtn && packageName) {
        // 1. Replace with your actual phone number (include country code, no +)
        const phoneNumber = "918420565320"; 
        
        // 2. Get the text from the H3 tag (e.g., "Kashmir: Heaven on Earth")
        const tripTitle = packageName.innerText || packageName.textContent;
        
        // 3. Create the encoded message
        const message = encodeURIComponent(`Hi! I'm interested in the ${tripTitle} package. Please share more details.`);
        
        // 4. Set the link
        whatsappBtn.href = `https://wa.me/${phoneNumber}?text=${message}`;
        
        // 5. Ensure it opens in a new tab
        whatsappBtn.setAttribute('target', '_blank');
    }
});
// 7. GENERIC LEAFLET MAP INITIALIZATION
function initGenericMap() {
    const mapEl = document.getElementById('map');
    if (!mapEl || typeof L === 'undefined') return;

    // 1. Parse Data
    const spots = JSON.parse(mapEl.dataset.spots);
    
    // 2. Initialize Map (Start at center provided)
    const center = JSON.parse(mapEl.dataset.center);
    const zoom = parseInt(mapEl.dataset.zoom);
    const map = L.map('map').setView(center, zoom);

    // 3. Dark Theme Tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap'
    }).addTo(map);

    // 4. Custom Icon (Orange Glow)
    const orangeIcon = L.divIcon({
        className: 'custom-pin',
        html: `<div style="background:#ff4d00; width:12px; height:12px; border-radius:50%; border:2px solid #fff; box-shadow:0 0 10px #ff4d00;"></div>`,
        iconSize: [12, 12]
    });

    const latLngs = []; // To store coordinates for the route line

    // 5. Place Markers
    spots.forEach(spot => {
        latLngs.push(spot.coords); // Add to route
        
        const marker = L.marker(spot.coords, { icon: orangeIcon }).addTo(map);
        
        // Premium Popup
        marker.bindPopup(`
            <div style="font-family:'Inter',sans-serif; padding:5px;">
                <strong style="color:#ff4d00;">${spot.day}</strong><br>
                <span style="color:#333; font-weight:700;">${spot.name}</span>
            </div>
        `);

        marker.on('mouseover', function() { this.openPopup(); });
        marker.on('click', () => { map.flyTo(spot.coords, 13); });
    });

    // 6. Draw the Travel Route (Polyline)
    L.polyline(latLngs, {
        color: '#ff4d00',
        weight: 2,
        opacity: 0.5,
        dashArray: '5, 10' // Makes it a dashed line for travel feel
    }).addTo(map);

    // 7. AUTO-FIT (The Map will zoom to fit all 15 pins automatically)
    const bounds = L.latLngBounds(latLngs);
    map.fitBounds(bounds, { padding: [50, 50] });
}

// Call the function
document.addEventListener('DOMContentLoaded', initGenericMap);