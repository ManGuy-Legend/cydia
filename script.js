// Simple copy functionality
const copyButton = document.querySelector('.copy-button');
const urlDisplay = document.querySelector('.url-display');

copyButton.addEventListener('click', () => {
    navigator.clipboard.writeText(urlDisplay.textContent);
    copyButton.textContent = 'Copied!';
    setTimeout(() => {
        copyButton.textContent = 'Copy';
    }, 2000);
});