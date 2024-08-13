export function initSlider() {
    // slider
    var sliders = document.querySelectorAll('.slider');

    sliders.forEach(function(slider) {
        var visibleCards = parseInt(slider.getAttribute('data-visible-cards'), 10);
        var slideWidth = 100 / visibleCards;
        var slides = slider.querySelectorAll('.slide');
        var totalSlides = slides.length;
        var currentIndex = 0;

        // Set the width of each slide based on visibleCards
        slides.forEach(function(slide) {
            slide.style.width = slideWidth + '%';
        });

        // Find the previous and next arrow buttons
        var arrowPrev = slider.closest('.slider-container').querySelector('.arrow-prev');
        var arrowNext = slider.closest('.slider-container').querySelector('.arrow-next');

        // Update slider position and button states
        function updateSlider() {
            var newTransform = -currentIndex * slideWidth;
            slider.style.transform = `translateX(${newTransform}%)`;

            arrowPrev.classList.toggle('disabled', currentIndex === 0);
            arrowNext.classList.toggle('disabled', currentIndex >= totalSlides - visibleCards);
        }

        // Arrow button click events
        arrowPrev.addEventListener('click', function() {
            if (currentIndex > 0) {
                currentIndex -= 2; // Move back by 2 slides
                updateSlider();
            }
        });

        arrowNext.addEventListener('click', function() {
            if (currentIndex < totalSlides - visibleCards) {
                currentIndex += 2; // Move forward by 2 slides
                updateSlider();
            }
        });

        // Initial setup
        updateSlider();
    });

    // accordion
    const accordionTriggers = document.querySelectorAll('.accordion-trigger'),
    closeButtons = document.querySelectorAll('.slide-out .close');

    accordionTriggers.forEach(trigger => {
        trigger.addEventListener('click', function (e) {
            e.preventDefault();
            const slide = trigger.closest('.accordion-slide'),
            text = trigger.closest('.text');

            slide.classList.toggle('active');
            // text.classList.toggle('hidden');
        });
    });

    closeButtons.forEach(close => {
        close.addEventListener('click', function (e) {
            e.preventDefault();
            const slide = close.closest('.accordion-slide'),
            text = close.closest('.text');

            slide.classList.toggle('active');
            // text.classList.toggle('hidden');
        });
    });
}
