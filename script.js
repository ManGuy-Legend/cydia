// Device detection
function isMobileDevice() {
    return (('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0));
}

// Mobile copy technique from gist
async function mobileCopy(text) {
    return new Promise((resolve) => {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = 0;
        document.body.appendChild(textarea);
        
        const range = document.createRange();
        range.selectNode(textarea);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        
        try {
            const successful = document.execCommand('copy');
            resolve(successful);
        } catch (err) {
            resolve(false);
        } finally {
            document.body.removeChild(textarea);
            window.getSelection().removeAllRanges();
        }
    });
}

// Fallback manual copy
function fallbackCopy(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
        return document.execCommand('copy');
    } catch (err) {
        console.warn('Fallback copy failed:', err);
        return false;
    } finally {
        document.body.removeChild(textarea);
    }
}

// Copy handler
document.querySelector('.copy-button').addEventListener('click', async function() {
    const url = 'https://manguy-legend.github.io/cydia/';
    let copied = false;
    
    if (isMobileDevice()) {
        // Try mobile-specific technique first
        copied = await mobileCopy(url);
        if (!copied) {
            copied = fallbackCopy(url);
        }
    } else {
        // Try modern API first
        try {
            await navigator.clipboard.writeText(url);
            copied = true;
        } catch (err) {
            copied = fallbackCopy(url);
        }
    }
    
    // Visual feedback
    const copyBtn = this;
    if (copied) {
        const originalHTML = copyBtn.innerHTML;
        copyBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path fill="#4CAF50" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>';
        setTimeout(() => {
            copyBtn.innerHTML = originalHTML;
        }, 2000);
    } else {
        prompt('Copy this URL:', url);
    }
});