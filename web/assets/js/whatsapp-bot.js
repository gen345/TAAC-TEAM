// ============================================
// THE ADVENTURE AWAITS CO — WHATSAPP-BOT.JS
// ============================================

const WA_NUMBER = "918420565320"; // Your WhatsApp number

/**
 * Opens WhatsApp with a pre-filled message for a specific package.
 * Usage: onclick="sendToWhatsApp('Manali Backpacking', '₹7,499')"
 */
function sendToWhatsApp(packageName, price) {
    const message = `Hi! I'm interested in the *${packageName}* package (${price}). Can you share more details and help me book?`;
    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

/**
 * Floating WhatsApp button — injected automatically on every page.
 */
document.addEventListener("DOMContentLoaded", function () {

    // ── Floating WhatsApp Button ──
    const waBtn = document.createElement('a');
    waBtn.href = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hi! I found your website and would like to know more about your tour packages.")}`;
    waBtn.target = "_blank";
    waBtn.rel = "noopener noreferrer";
    waBtn.title = "Chat with us on WhatsApp";
    waBtn.className = "wa-float";
    waBtn.innerHTML = `<img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" width="28" height="28" alt="WhatsApp">`;
    waBtn.style.cssText = `
        position: fixed;
        bottom: 28px;
        right: 28px;
        z-index: 9999;
        width: 58px;
        height: 58px;
        border-radius: 50%;
        background: #25D366;
        display: flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        box-shadow: 0 4px 20px rgba(37,211,102,0.45);
        transition: transform 0.3s ease;
    `;
    waBtn.addEventListener('mouseenter', () => waBtn.style.transform = 'scale(1.1)');
    waBtn.addEventListener('mouseleave', () => waBtn.style.transform = 'scale(1)');
    document.body.appendChild(waBtn);

    // ── Itinerary Page WhatsApp Button ──
    const whatsappBtn = document.getElementById('whatsapp-btn');
    const packageName = document.getElementById('package-name');
    if (whatsappBtn && packageName) {
        const tripTitle = packageName.innerText || packageName.textContent;
        const message = encodeURIComponent(`Hi! I'm interested in the *${tripTitle}* package. Please share more details.`);
        whatsappBtn.href = `https://wa.me/${WA_NUMBER}?text=${message}`;
        whatsappBtn.setAttribute('target', '_blank');
    }
});
