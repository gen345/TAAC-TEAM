function sendToWhatsApp(packageName, price) {
    const phoneNumber = "918420565320"; // REPLACe with your WhatsApp number (include 91)
    const message = `Hi! I'm interested in the ${packageName} package priced at ${price}. Can you help me customize this?`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// How to trigger it? 
// In your HTML, you would change your button to: 
// <button onclick="sendToWhatsApp('Manali Backpacking', '₹7,499')">Enquire Now</button>