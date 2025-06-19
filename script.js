// Function to copy text using execCommand
function execCopyText(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    textarea.setAttribute('readonly', '');
    document.body.appendChild(textarea);
    textarea.select();

    let success = false;
    try {
        success = document.execCommand('copy');
    } catch (err) {
        console.warn('Copy failed:', err);
        success = false;
    }

    document.body.removeChild(textarea);
    return success;
}

// Click event for copy button
document.querySelector('.copy-button').addEventListener('click', function () {
    const url = 'https://manguy-legend.github.io/cydia/';
    const copied = execCopyText(url);

    const copyBtn = this;
    if (copied) {
        const originalHTML = copyBtn.innerHTML;
        copyBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path fill="#4CAF50" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>';
        setTimeout(() => {
            copyBtn.innerHTML = originalHTML;
        }, 2000);
    } else {
        prompt('Copy this URL manually:', url);
    }
});
