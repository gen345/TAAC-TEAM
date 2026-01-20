{
    // Wrapping in { } fixes the "Already Declared" error
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('heroPrev');
    const nextBtn = document.getElementById('heroNext');
    let currentIndex = 0;
    let autoScrollTimer;

    const showSlide = (index) => {
        if (!slides.length) return;
        
        slides.forEach(s => s.classList.remove('active'));
        slides[index].classList.add('active');

        // Logic for hiding/showing arrows
        if (prevBtn) {
            prevBtn.style.opacity = (index === 0) ? "0" : "1";
            prevBtn.style.pointerEvents = (index === 0) ? "none" : "auto";
        }
    };

    const nextSlide = () => {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
        resetTimer();
    };

    const prevSlide = () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(currentIndex);
        resetTimer();
    };

    const resetTimer = () => {
        clearInterval(autoScrollTimer);
        autoScrollTimer = setInterval(nextSlide, 5000); 
    };

    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

    // Initial start
    showSlide(0);
    resetTimer();
}