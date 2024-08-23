import { initNavigation } from './navigation.js';
import { initProjectOverview } from './projectOverview.js';
import { initPress } from './press.js';
import { initSlider } from './slider.js';
import { initLandingFeatured } from './landingFeatured.js';
import { initProject } from './project.js';
import { initLoad } from './load.js';
import { initScroll } from './scroll.js';

// Ensure the loading screen is visible and content is hidden immediately on DOMContentLoaded
window.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const body = document.body;
    loadingScreen.classList.add('visible'); // Make sure loading screen is visible
    body.classList.add('hidden-content');  // Hide the main content
});

document.addEventListener('DOMContentLoaded', function () {
    initNavigation();
    initLoad(); // Handle the loading screen hide after video ends
    const namespace = document.querySelector('main').dataset.barbaNamespace;
    initializeComponents(document, namespace);
});

function initializeComponents(container, namespace) {
    initScroll();
    const body = document.body;
    body.classList.remove('red');

    switch (namespace) {
        case 'projectCategory':
            initProjectOverview();
            break;
        case 'project':
            initProject(container);
            initSlider();
            break;
        case 'magazine':
            const pdfViewer = container.querySelector('#pdf-viewer');
            if (pdfViewer) {
                const pdfUrl = pdfViewer.dataset.url;
                initPress(pdfUrl);
            }
            break;
        case 'Career':
            body.classList.add('red');
            break;
        case 'story':
            initSlider();
            const video = container.querySelector('.background video');
            if (video) {
                video.play();
            }
            break;
        default:
            const carousel = container.querySelector('.carousel');
            const slider = container.querySelector('.slider');
            if (carousel) {
                initLandingFeatured('.carousel', '.progress-bar .progress');
            }
            if (slider) {
                initSlider();
            }
            break;
    }
}

barba.init({
    transitions: [{
        name: 'opacity-transition',
        leave(data) {
            return gsap.to(data.current.container, { opacity: 0 });
        },
        enter(data) {
            return gsap.from(data.next.container, { opacity: 0 });
        },
        afterEnter(data) {
            const namespace = data.next.container.dataset.barbaNamespace;
            initializeComponents(data.next.container, namespace);

            // Reset scroll position and re-initialize scroll animations
            window.scrollTo(0, 0);
            initScroll(); // Ensure animations are initialized on the new page
        }
    }]
});

