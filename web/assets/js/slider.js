import { navHeight } from './globals.js';

export function initSlider() {
    var sliders = document.querySelectorAll('.slider');

    sliders.forEach(function(slider) {
        var slides = slider.querySelectorAll('.slide');
        var arrowPrev = slider.closest('.slider-container').querySelector('.arrow-prev');
        var arrowNext = slider.closest('.slider-container').querySelector('.arrow-next');

        function scrollSlider(offset) {
            const currentScrollLeft = slider.scrollLeft + offset;

            slider.scrollTo({
                left: currentScrollLeft,
                behavior: 'smooth'
            });

            toggleArrows();
        }

        function toggleArrows() {
            const maxScrollLeft = slider.scrollWidth - slider.clientWidth;
            const nearStart = slider.scrollLeft <= 1;
            const nearEnd = slider.scrollLeft >= (maxScrollLeft - 1); 

            if (arrowPrev && arrowNext) {
                arrowPrev.classList.toggle('disabled', nearStart);
                arrowNext.classList.toggle('disabled', nearEnd);
            }
        }

        if (arrowPrev && arrowNext) {
            arrowPrev.addEventListener('click', function() {
                if (!arrowPrev.classList.contains('disabled')) {
                    scrollSlider(-1 * slider.clientWidth);
                }
            });

            arrowNext.addEventListener('click', function() {
                if (!arrowNext.classList.contains('disabled')) {
                    scrollSlider(1 * slider.clientWidth);
                }
            });

            toggleArrows();
        }

        slider.addEventListener('scroll', function() {
            toggleArrows();
        });

        window.addEventListener('resize', function () {
            toggleArrows();
        });

        // Accordion functionality
        const accordionTriggers = document.querySelectorAll('.accordion-trigger');
        const closeButtons = document.querySelectorAll('.slide-out .close');

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
    });
}