import { nav } from './globals.js';

export function initLogo() {
    function logoColor() {
        const svgElement = nav.querySelector('svg.nav-svg');
        const backgroundElement = document.querySelector('.background img, .background video');
        const logoPosition = svgElement.getBoundingClientRect();
    
        if (svgElement && backgroundElement) {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.width = backgroundElement.videoWidth || backgroundElement.naturalWidth || backgroundElement.clientWidth;
            canvas.height = backgroundElement.videoHeight || backgroundElement.naturalHeight || backgroundElement.clientHeight;
    
            // Ensure the background is loaded or playing before drawing it on canvas
            if (backgroundElement.tagName.toLowerCase() === 'img' && !backgroundElement.complete) {
                backgroundElement.addEventListener('load', logoColor);
                return;
            }
            if (backgroundElement.tagName.toLowerCase() === 'video' && backgroundElement.readyState < 3) {
                backgroundElement.addEventListener('loadeddata', () => {
                    setTimeout(logoColor, 100); // Ensure the video is playing
                });
                return;
            }
    
            // Draw the background element onto the canvas
            context.drawImage(backgroundElement, 0, 0, canvas.width, canvas.height);
    
            // Get the pixel data for the area behind the SVG
            const xStart = Math.floor(logoPosition.left);
            const yStart = Math.floor(logoPosition.top);
            const width = Math.floor(logoPosition.width);
            const height = Math.floor(logoPosition.height);
    
            const imageData = context.getImageData(xStart, yStart, width, height);
            const data = imageData.data;
    
            let totalLuminance = 0;
            const pixelCount = width * height;
    
            for (let i = 0; i < data.length; i += 4) {
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];
    
                // Calculate luminance for each pixel
                const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
                totalLuminance += luminance;
            }
    
            // Average luminance
            const averageLuminance = totalLuminance / pixelCount;
    
            if (averageLuminance < 140) {
                // Dark background
                svgElement.querySelector('#builders').style.fill = '#ffffff';
                // svgElement.querySelector('#jh').style.fill = '#ffffff';
            } else {
                // Light background
                svgElement.querySelector('#builders').style.fill = '#555555';
                // svgElement.querySelector('#jh').style.fill = '#ed3128';
            }
        }
    }
    
    logoColor();
    window.addEventListener('resize', logoColor);
}
