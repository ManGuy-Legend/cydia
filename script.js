function copyText(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;

    // iOS Safari: Element must be editable, visible, and added to DOM
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'absolute';
    textarea.style.left = '-9999px'; // offscreen but visible enough
    document.body.appendChild(textarea);

    // iOS requires select() inside the same call stack as user interaction
    textarea.select();

    let successful = false;
    try {
        successful = document.execCommand('copy');
    } catch (err) {
        console.warn('Copy failed:', err);
        successful = false;
    }

    document.body.removeChild(textarea);
    return successful;
}

// Click handler: must be direct user interaction
document.querySelector('.copy-button').onclick = function () {
  // Your copy logic here
  copyToClipboard('https://manguy-legend.github.io/cydia/');
  alert('Copied!');
};

    if (copied) {
        const originalHTML = this.innerHTML;
        this.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path fill="#4CAF50" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>';
        setTimeout(() => {
            this.innerHTML = originalHTML;
        }, 2000);
    } else {
        prompt('Copy this URL:', url);
}