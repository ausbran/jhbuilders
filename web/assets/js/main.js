import { initNavigation } from './navigation.js';
import { initProjectOverview } from './projectOverview.js';
import { initPress } from './press.js';
import { initSlider } from './slider.js';
import { initLandingFeatured } from './landingFeatured.js';
import { initProject } from './project.js';

document.addEventListener('DOMContentLoaded', function () {
    initNavigation();
    const namespace = document.querySelector('main').dataset.barbaNamespace;
    initializeComponents(document, namespace);
});

function initializeComponents(container, namespace) {
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
        }
    }]
});
