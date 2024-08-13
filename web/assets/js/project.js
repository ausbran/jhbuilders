import { body, nav } from './globals.js';

export function initProject(container) {
    let magnify = container.querySelector('.magnify'),
        backgroundElement = container.querySelector('.background.gradient'),
        sliderContainer = container.querySelector('.slider-container'),
        buttons = container.querySelector('.project-buttons'),
        close = buttons.querySelector('.close'),
        slides = sliderContainer.querySelectorAll('.project-slide'),
        inner = document.querySelector('.inner'),
        timeout = 300;

    function closeSlider() {
        sliderContainer.style.opacity = 0;
        buttons.classList.remove('menu-opened');
        setTimeout(() => {
            sliderContainer.style.display = 'none';
            backgroundElement.style.opacity = 1;
            inner.classList.remove('active');
            body.classList.remove('no-scroll');
            nav.classList.remove('scrolled-without-border');
        }, timeout);
    }

    if (magnify && backgroundElement && sliderContainer) {
        magnify.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            body.classList.add('no-scroll');
            buttons.classList.add('menu-opened');
            nav.classList.add('scrolled-without-border');

            backgroundElement.style.transition = 'opacity 0.5s';
            backgroundElement.style.opacity = 0;

            setTimeout(() => {
                inner.classList.add('active');
                sliderContainer.style.display = 'block';
                sliderContainer.style.opacity = 1;
            }, timeout);

            slides.forEach(slide => {
                slide.addEventListener('click', function () {
                    const largeImageUrl = this.getAttribute('data-full-url');
                    if (largeImageUrl) {
                        backgroundElement.innerHTML = `<img src="${largeImageUrl}" alt="Selected Image" />`;
                        closeSlider();
                    }
                });
            });
        });
    }

    close.addEventListener('click', closeSlider);
}