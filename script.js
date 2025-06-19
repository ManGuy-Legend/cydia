// iOS-compatible clipboard function
function copyToClipboard(text) {
    // Create hidden text element
    var textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';  // Prevent scrolling to bottom
    document.body.appendChild(textarea);
    
    // Try clipboard methods
    try {
        // Select and copy
        textarea.select();
        textarea.setSelectionRange(0, 99999); // For mobile devices
        
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Copying text was ' + msg);
        
        // Visual feedback
        var copyBtn = document.querySelector('.copy-button');
        var originalHTML = copyBtn.innerHTML;
        copyBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path fill="#4CAF50" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>';
        
        // Revert after 2 seconds
        setTimeout(function() {
            copyBtn.innerHTML = originalHTML;
        }, 2000);
        
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
        prompt('Copy to clipboard: Ctrl+C, Enter', text);
    } finally {
        document.body.removeChild(textarea);
    }
}

// Attach click handler
document.querySelector('.copy-button').addEventListener('click', function() {
    copyToClipboard('https://manguy-legend.github.io/cydia/');
});