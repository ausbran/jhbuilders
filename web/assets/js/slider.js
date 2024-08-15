export function initSlider() {
    var sliders = document.querySelectorAll('.slider');

    sliders.forEach(function(slider) {
        var visibleCards = parseInt(slider.getAttribute('data-visible-cards'), 10);
        var slides = slider.querySelectorAll('.slide');
        var totalSlides = slides.length;
        var slideWidthPercentage = 100 / visibleCards;
        var currentScrollLeft = 0;
        var maxScrollWidth = slider.scrollWidth - slider.clientWidth;

        // Set the width of each slide based on visibleCards
        slides.forEach(function(slide) {
            slide.style.width = slideWidthPercentage + '%';
        });

        // Find the previous and next arrow buttons, and check if they exist
        var arrowPrev = slider.closest('.slider-container').querySelector('.arrow-prev');
        var arrowNext = slider.closest('.slider-container').querySelector('.arrow-next');

        // Scroll the slider to the next/previous set of cards
        function scrollSlider(offset) {
            currentScrollLeft = slider.scrollLeft + offset;

            slider.scrollTo({
                left: currentScrollLeft,
                behavior: 'smooth'
            });

            toggleArrows();
        }

        // Toggle arrow buttons based on scroll position
        function toggleArrows() {
            if (arrowPrev && arrowNext) {
                arrowPrev.classList.toggle('disabled', slider.scrollLeft <= 0);
                arrowNext.classList.toggle('disabled', slider.scrollLeft >= maxScrollWidth);
            }
        }

        // Add event listeners only if the arrows are present
        if (arrowPrev && arrowNext) {
            arrowPrev.addEventListener('click', function() {
                if (!arrowPrev.classList.contains('disabled')) {
                    scrollSlider(-2 * slider.clientWidth / visibleCards);  // Scroll back by two cards
                }
            });

            arrowNext.addEventListener('click', function() {
                if (!arrowNext.classList.contains('disabled')) {
                    scrollSlider(2 * slider.clientWidth / visibleCards);  // Scroll forward by two cards
                }
            });

            // Initial setup
            toggleArrows();
        }

        // Handle manual scroll interactions
        slider.addEventListener('scroll', function() {
            toggleArrows();
        });
    });

    // accordion
    const accordionTriggers = document.querySelectorAll('.accordion-trigger');
    const closeButtons = document.querySelectorAll('.slide-out .close');
    const navHeight = document.querySelector('nav').offsetHeight; // Get the height of the navigation element

    accordionTriggers.forEach(trigger => {
        trigger.addEventListener('click', function (e) {
            e.preventDefault();
            const slide = trigger.closest('.accordion-slide');

            // Add active class to trigger animations
            slide.classList.add('active');

            // Calculate the position to scroll to, considering the navigation height
            const slideTop = slide.getBoundingClientRect().top + window.scrollY;
            const scrollToPosition = slideTop - ((window.innerHeight - slide.offsetHeight) / 2) - (navHeight / 1.9 );

            // Scroll the slide into the center of the viewport, minus the nav height
            window.scrollTo({
                top: scrollToPosition,
                behavior: 'smooth'
            });
        });
    });

    closeButtons.forEach(close => {
        close.addEventListener('click', function (e) {
            e.preventDefault();
            const slide = close.closest('.accordion-slide');

            // Reverse the animation by removing the active class
            slide.classList.remove('active');
        });
    });
}
