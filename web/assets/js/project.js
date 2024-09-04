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
    let isThumbnailSliderOpen = false; // Track whether the thumbnail slider is open

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
        isThumbnailSliderOpen = false; // Set to false when the slider is closed
    }

    function handleArrowClick(direction) {
        if (isThumbnailSliderOpen) {
            // Handle arrow click for thumbnail slider
            const offset = direction === 'next' ? 1 : -1;
            scrollThumbnailSlider(offset);
        } else {
            // Handle arrow click for main background images
            if (direction === 'next') {
                currentImageIndex = (currentImageIndex + 1) % projectImages.length;
            } else if (direction === 'prev') {
                currentImageIndex = (currentImageIndex - 1 + projectImages.length) % projectImages.length;
            }
            showImage(currentImageIndex);
        }
    }

    function scrollThumbnailSlider(offset) {
        // Find the slider inside the container
        const slider = sliderContainer.querySelector('.slider');

        // Calculate the width of one slide
        const slideWidth = slider.clientWidth / slides.length;

        // Scroll by the offset times the width of one slide
        slider.scrollBy({
            left: offset * slideWidth,
            behavior: 'smooth'
        });

        // Ensure arrows are correctly toggled
        toggleArrows();
    }

    function toggleArrows() {
        const arrowPrev = buttons.querySelector('.arrow-prev');
        const arrowNext = buttons.querySelector('.arrow-next');
        const slider = sliderContainer.querySelector('.slider');

        // Check if slider is at start or end
        const isAtStart = slider.scrollLeft <= 0;
        const isAtEnd = slider.scrollLeft >= slider.scrollWidth - slider.clientWidth;

        if (arrowPrev) arrowPrev.classList.toggle('disabled', isAtStart);
        if (arrowNext) arrowNext.classList.toggle('disabled', isAtEnd);
    }

    if (magnify && backgroundElement && sliderContainer) {
        magnify.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            body.classList.add('no-scroll');
            buttons.classList.add('menu-opened');
            nav.classList.add('scrolled-without-border');

            backgroundElement.style.transition = 'opacity 0.5s';
            backgroundElement.style.opacity = 0;

            sliderContainer.style.display = 'block';
            sliderContainer.style.opacity = 0;
            sliderContainer.style.transition = 'opacity 0.5s';

            setTimeout(() => {
                inner.classList.add('active');
                sliderContainer.style.opacity = 1;
                isThumbnailSliderOpen = true; // Set to true when the slider is opened
                toggleArrows(); // Initialize arrow state when the slider is opened
            }, timeout);
        });
    }

    close.addEventListener('click', closeSlider);

    const projectArrows = buttons.querySelectorAll('.project-buttons .arrow');

    // Arrow button clicks
    projectArrows.forEach(arrow => {
        arrow.addEventListener('click', function () {
            if (arrow.classList.contains('arrow-next')) {
                handleArrowClick('next');
            } else {
                handleArrowClick('prev');
            }
        });
    });

    // Thumbnail click functionality
    slides.forEach((slide, index) => {
        slide.addEventListener('click', function () {
            currentImageIndex = index;
            showImage(currentImageIndex); // Update background image
            if (isThumbnailSliderOpen) {
                closeSlider(); // Close the slider after updating the background image
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