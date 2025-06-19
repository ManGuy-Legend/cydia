// Improved copy function for older iOS devices
function copyToClipboard(text) {
    return new Promise((resolve) => {
        // Method 1: Modern clipboard API
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text)
                .then(() => resolve(true))
                .catch(() => tryFallbackCopy(text, resolve));
            return;
        }
        
        // Method 2: Legacy execCommand
        tryFallbackCopy(text, resolve);
    });
}

function tryFallbackCopy(text, resolve) {
    // Create invisible textarea
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = 0;
    textarea.style.left = '-9999px';
    textarea.setAttribute('readonly', '');
    
    document.body.appendChild(textarea);
    
    try {
        // iOS specific selection magic
        const range = document.createRange();
        range.selectNodeContents(textarea);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        textarea.setSelectionRange(0, 999999);
        
        const result = document.execCommand('copy');
        resolve(result);
    } catch (err) {
        resolve(false);
    } finally {
        document.body.removeChild(textarea);
    }
}

// Copy button handler
document.querySelector('.copy-button').addEventListener('click', async function() {
    const url = 'https://manguy-legend.github.io/cydia/';
    const copyBtn = this;
    const originalHTML = copyBtn.innerHTML;
    
    const success = await copyToClipboard(url);
    
    if (success) {
        copyBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path fill="#4CAF50" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>';
        setTimeout(() => {
            copyBtn.innerHTML = originalHTML;
        }, 2000);
    } else {
        // Fallback for very old devices
        const input = document.createElement('input');
        input.value = url;
        document.body.appendChild(input);
        input.select();
        
        try {
            document.execCommand('copy');
            copyBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path fill="#4CAF50" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>';
            setTimeout(() => {
                copyBtn.innerHTML = originalHTML;
            }, 2000);
        } catch (err) {
            // Ultimate fallback
            prompt('Copy this URL:', url);
        } finally {
            document.body.removeChild(input);
        }
    }
});

// Detect if we're on iOS < 10
function isOldIOS() {
    return /iP(hone|od|ad).*OS [1-9]_\d/.test(navigator.userAgent);
}

// Add old iOS specific styles if needed
if (isOldIOS()) {
    document.documentElement.classList.add('old-ios');
}