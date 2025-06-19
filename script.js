// iOS 9.3.3 compatible layout switcher
function checkLayout() {
    var container = document.querySelector('.container');
    var buttons = document.querySelectorAll('.modern-button');
    var buttonWidth = 160; // px
    var gap = 16; // px
    
    // Old-school width calculation for iOS 9
    var containerWidth = container.offsetWidth - 30; // account for padding
    
    // Switch to vertical if buttons would overlap
    if (containerWidth < (buttonWidth * 2 + gap)) {
        container.className += ' vertical-layout';
        // iOS 9 compatible margin centering
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].style.margin = '0 auto 15px';
            buttons[i].style.width = '80%';
            buttons[i].style.maxWidth = '200px';
        }
    } else {
        container.className = container.className.replace(' vertical-layout', '');
        // Reset to horizontal layout
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].style.margin = '';
            buttons[i].style.width = '';
            buttons[i].style.maxWidth = '';
        }
    }
}

// Old-school event listeners for iOS 9
window.onload = checkLayout;
window.onresize = checkLayout;

// Basic copy function
document.querySelector('.copy-button').onclick = function() {
    prompt('Copy this URL:', 'https://manguy-legend.github.io/cydia/');
};