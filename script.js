async function copyUrl(url) {
  // Function to detect iOS version
  function getIOSVersion() {
    const ua = navigator.userAgent;
    const match = ua.match(/OS (\d+)_/);
    return match ? parseInt(match[1], 10) : null;
  }

  // Check if the device is iOS and get the version
  const iosVersion = getIOSVersion();
  
  // If iOS version is less than 10, use prompt
  if (iosVersion !== null && iosVersion < 10) {
    prompt('Copy this URL manually:', url);
    return false;
  }

  // Modern Clipboard API (iOS 12+, desktop, Android)
  if (navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(url);
      return true;
    } catch (e) {
      console.warn('Clipboard API failed:', e);
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

  // Prompt fallback for unsupported cases
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
