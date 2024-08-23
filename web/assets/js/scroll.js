export function initScroll() {
    const SCROLL_ANIMATION_TRIGGER_CLASSNAME = 'fade-in';
    const SCROLL_ANIMATION_OFFSCREEN_CLASSNAME = 'fade-in--offscreen';

    // Scroll in animation logic
    function onIntersection(entries, observer) {
        entries.forEach((entry, index) => {
            const element = entry.target;

            if (entry.isIntersecting) {
                element.classList.add('visible');
                element.classList.remove(SCROLL_ANIMATION_OFFSCREEN_CLASSNAME);
                if (element.hasAttribute('data-cascade')) {
                    element.style.setProperty('--animation-order', index);
                }
                observer.unobserve(element);
            }
        });
    }

    function initializeScrollAnimations() {
        const animationElements = document.querySelectorAll(`.${SCROLL_ANIMATION_TRIGGER_CLASSNAME}`);

        if (animationElements.length === 0) return;

        const observer = new IntersectionObserver(onIntersection, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px',
        });

        animationElements.forEach((element) => {
            element.classList.add(SCROLL_ANIMATION_OFFSCREEN_CLASSNAME);
            observer.observe(element);
        });
    }

    initializeScrollAnimations();
}
