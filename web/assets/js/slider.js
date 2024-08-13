export function initSlider() {
    // slider
    var sliders = document.querySelectorAll('.slider');

    sliders.forEach(function(slider) {
        var visibleCards = slider.getAttribute('data-visible-cards');
        var slideWidth = 100 / visibleCards;
        slider.querySelectorAll('.slide').forEach(function(slide) {
            slide.style.width = slideWidth + '%';
        });
    });

    // accordion
    const accordionTriggers = document.querySelectorAll('.accordion-trigger'),
    closeButtons = document.querySelectorAll('.slide-out .close')

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
