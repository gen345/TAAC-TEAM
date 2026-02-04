/* --- DESTINATIONS PAGE LOGIC --- */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. SEARCH FILTER LOGIC
    const searchInput = document.getElementById('stateSearch');
    const stateItems = document.querySelectorAll('.state-item');

    if (searchInput) {
        searchInput.addEventListener('input', () => {
            const filter = searchInput.value.toLowerCase();
            
            stateItems.forEach(item => {
                const stateName = item.querySelector('h3').textContent.toLowerCase();
                
                // If match found, show card, otherwise hide it
                if (stateName.includes(filter)) {
                    item.style.display = "block"; 
                } else {
                    item.style.display = "none"; 
                }
            });
        });
    }

    // 2. FUTURE LOGIC (You can add smooth scroll or hover effects here)
    console.log("Destinations JS Loaded Successfully");
});