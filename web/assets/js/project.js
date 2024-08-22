import { body, nav } from './globals.js';

export function initProject(container) {
    let magnify = container.querySelector('.magnify'),
        backgroundElement = container.querySelector('.background.gradient'),
        sliderContainer = container.querySelector('.slider-container'),
        buttons = container.querySelector('.project-buttons'),
        close = buttons.querySelector('.close'),
        slides = sliderContainer.querySelectorAll('.project-slide'),
        projectImages = backgroundElement.querySelectorAll('picture'),
        inner = container.querySelector('.inner'),
        timeout = 300;

    let currentImageIndex = 0;

    function showImage(index) {
        projectImages.forEach((img, i) => {
            if (i === index) {
                img.classList.add('active');
                img.classList.remove('previous');
            } else {
                img.classList.remove('active');
                img.classList.add('previous');
            }
        });
    }

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

    function handleArrowClick(direction) {
        if (direction === 'next') {
            currentImageIndex = (currentImageIndex + 1) % projectImages.length;
        } else if (direction === 'prev') {
            currentImageIndex = (currentImageIndex - 1 + projectImages.length) % projectImages.length;
        }
        showImage(currentImageIndex);
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

            slides.forEach((slide, index) => {
                slide.addEventListener('click', function () {
                    const largeImageUrl = slide.getAttribute('data-full-url');
                    if (largeImageUrl) {
                        currentImageIndex = index;
                        showImage(currentImageIndex);
                        closeSlider();
                    }
                });
            });
        });
    }

    close.addEventListener('click', closeSlider);

    const projectArrows = buttons.querySelectorAll('.project-buttons .arrow');

    // arrow button clicks
    projectArrows.forEach(arrow => {
        arrow.addEventListener('click', function () {
            if (arrow.classList.contains('arrow-next')) {
                handleArrowClick('next');
            } else {
                handleArrowClick('prev');
            }
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', function (event) {
        if (event.key === 'ArrowRight') {
            handleArrowClick('next');
        } else if (event.key === 'ArrowLeft') {
            handleArrowClick('prev');
        }
    });

    // Initial display setup
    showImage(currentImageIndex);
}
