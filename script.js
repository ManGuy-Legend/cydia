// Simple copy functionality
const copyButton = document.querySelector('.copy-button');
const urlDisplay = document.querySelector('.url-display');

copyButton.addEventListener('click', () => {
    navigator.clipboard.writeText(urlDisplay.textContent);
})