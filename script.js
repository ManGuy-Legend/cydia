async function copyUrl(url) {
  // Modern Clipboard API (iOS 12+, desktop, Android)
  if (navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(url);
      return true;
    } catch (e) {
      // fallback to execCommand
    }
  }

  // ExecCommand for iOS 10–11 and most legacy browsers
  const textarea = document.createElement('textarea');
  textarea.value = url;
  textarea.style.position = 'absolute';
  textarea.style.top = '0';
  textarea.style.left = '0';
  textarea.style.width = '1px';
  textarea.style.height = '1px';
  textarea.style.opacity = '0.01';
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();

  let success = false;
  try {
    success = document.execCommand('copy');
  } catch (err) {
    console.warn('execCommand copy failed', err);
    success = false; 
  }
  document.body.removeChild(textarea);

  // Prompt fallback for iOS ≤9.3.3 and older unsupported cases
  if (!success) {
    prompt('Copy this URL manually:', url);
  }
  return success;
}

// Usage:
document.querySelector('.copy-button').onclick = async function () {
  const url = 'https://manguy-legend.github.io/cydia/';
  const copied = await copyUrl(url);

  if (copied) {
    const orig = this.innerHTML;
    this.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path fill="#4CAF50" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>';
    setTimeout(() => (this.innerHTML = orig), 2000);
  }
};
