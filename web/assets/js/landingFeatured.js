export function initLandingFeatured(carouselSelector, progressBarSelector) {
    const carousel = document.querySelector(carouselSelector);
    const progressBar = document.querySelector(progressBarSelector);
    if (!carousel || !progressBar) return;

    const slideTime = parseInt(carousel.dataset.slideTime, 10) * 1000 || 15000;
    const pauseTime = 400; // Adjust as necessary
    const items = carousel.querySelectorAll('.carousel-item');
    let index = 0;

    function showNextImage() {
        items[index].classList.remove('active');
        index = (index + 1) % items.length;
        items[index].classList.add('active');

        // Reset and animate the progress bar
        progressBar.style.transition = 'none'; // Remove transition to reset
        progressBar.style.width = '0%'; // Reset width to 0
        setTimeout(() => {
            progressBar.style.transition = `width ${slideTime}ms linear`; // Reapply transition for animation
            progressBar.style.width = '100%'; // Animate to full width
        }, 50); // Timeout to allow DOM update
    }

    function startCarousel() {
        showNextImage(); // Show the initial image
        setInterval(() => {
            showNextImage();
        }, slideTime + pauseTime); // Change image after slideTime + pauseTime
    }

    // Initial setup
    items[index].classList.add('active');
    progressBar.style.transition = `width ${slideTime}ms linear`;
    progressBar.style.width = '100%';

    startCarousel(); // Start the carousel
}
