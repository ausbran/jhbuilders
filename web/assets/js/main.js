import { initNavigation } from './navigation.js';
import { initLogo } from './logo.js';
import { initProjectOverview } from './projectOverview.js';
import { initPress } from './press.js';
import { initSlider } from './slider.js';
import { initLandingFeatured } from './landingFeatured.js';
import { initProject } from './project.js';
import { initLoad } from './load.js';
import { initScroll } from './scroll.js';
import { body, nav } from './globals.js';

// loading screen
window.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loading-screen');
    loadingScreen.classList.add('visible');
    body.classList.add('hidden-content');
});

document.addEventListener('DOMContentLoaded', function () {
    initNavigation();
    initLogo();
    initLoad();
    const namespace = document.querySelector('main').dataset.barbaNamespace;
    initializeComponents(document, namespace);
});

function initializeComponents(container, namespace) {
    initScroll();
    body.classList.remove('red');
    const video = container.querySelector('video');

    if (video) {
        video.play();
        video.addEventListener('playing', () => {
            setTimeout(initLogo, 100); // Ensure logo color adjustment after video starts
        });
    } else {
        setTimeout(initLogo, 100); // Delay to ensure content is fully loaded
    }

    switch (namespace) {
        case 'projectCategory':
            initProjectOverview();
            break;
        case 'project':
            initProject(container);
            initSlider();
            break;
        case 'blog':
            nav.classList.add('border');
            break;
        case 'magazine':
            nav.classList.add('border');
            const pdfViewer = container.querySelector('#pdf-viewer');
            if (pdfViewer) {
                const pdfUrl = pdfViewer.dataset.url;
                initPress(pdfUrl);
            }
            break;
        case 'career':
            nav.classList.add('border');
            body.classList.add('red');
            if (typeof craft !== 'undefined' && craft.formie) {
                const forms = container.querySelectorAll('form[data-fui-form]');
                forms.forEach((form) => {
                    const formHandle = form.getAttribute('data-fui-form-handle');
                    craft.formie.renderFormJs(formHandle);
                });
            }
            break;
        case 'story':
            nav.classList.add('border');
            initSlider();
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
            setTimeout(initLogo, 100); // Delay to ensure content is fully loaded
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
            window.scrollTo(0, 0);
            initScroll(); 
            initLogo();
        }
    }]
});