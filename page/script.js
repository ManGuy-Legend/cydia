// Aspect ratio detection and layout switching
function checkAspectRatio() {
    const container = document.querySelector('.container');
    const aspectRatio = window.innerWidth / window.innerHeight;
    
    // Switch to vertical layout if portrait orientation (aspect ratio < 1)
    // or if very narrow screen (aspect ratio < 0.85)
    if (aspectRatio < 0.65) {
        container.classList.add('vertical-layout');
    } else {
        container.classList.remove('vertical-layout');
    }
}

// Initial check
checkAspectRatio();

// Update on resize or orientation change
window.addEventListener('resize', checkAspectRatio);
window.addEventListener('orientationchange', checkAspectRatio);

// Copy functionality
document.querySelector('.copy-button').addEventListener('click', () => {
    navigator.clipboard.writeText('https://manguy-legend.github.io/cydia/');
});