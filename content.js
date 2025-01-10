let popup = null;
let selectedText = '';

function createPopup(x, y) {
    // Remove existing popup if any
    if (popup) {
        document.body.removeChild(popup);
    }

    // Create new popup
    popup = document.createElement('div');
    popup.className = 'translate-popup';
    
    const translateButton = document.createElement('img');
    translateButton.className = 'translate-button';
    translateButton.src = chrome.runtime.getURL('icon.png');
    
    translateButton.addEventListener('mousedown', (e) => {
        // Prevent the document mousedown from handling this event
        e.stopPropagation();

        if (selectedText) {
            chrome.runtime.sendMessage({
                type: 'translate',
                text: selectedText
            }, (response) => {
            });
        }
        document.body.removeChild(popup);
        popup = null;
    });

    popup.appendChild(translateButton);
    document.body.appendChild(popup);

    // Position the popup near the mouse
    popup.style.left = `${x}px`;
    popup.style.top = `${y}px`;
}

document.addEventListener('mouseup', function(e) {
    selectedText = window.getSelection().toString().trim();
    if (selectedText) {
        setTimeout(() => {
            if (selectedText === window.getSelection().toString().trim()) {
                createPopup(e.pageX + 5, e.pageY + 5);
            }
        }, 500);
    } else if (popup) {
        document.body.removeChild(popup);
        popup = null;
    }
});

// Close popup when clicking outside
document.addEventListener('mousedown', function(e) {
    if (popup && !popup.contains(e.target)) {
        document.body.removeChild(popup);
        popup = null;
    }
});
