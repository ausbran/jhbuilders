export function initLoad() {
    if (!localStorage.getItem('visited')) {
        localStorage.setItem('visited', 'true');
        const loadingScreen = document.getElementById('loading-screen');
        const lottiePlayer = document.querySelector('dotlottie-player');

        loadingScreen.style.display = 'block';

        lottiePlayer.addEventListener('complete', function() {
            loadingScreen.style.transition = 'opacity 1s ease-out';
            loadingScreen.style.opacity = 0;
            setTimeout(() => loadingScreen.style.display = 'none', 1000); // Match this duration with the transition
        });

    } else {
        document.getElementById('loading-screen').style.display = 'none';
    }
}
