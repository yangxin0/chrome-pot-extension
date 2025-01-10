chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'translate') {
        fetch('http://127.0.0.1:60828/translate', {
            method: 'POST',
            body: message.text,
            headers: {
                'Content-Type': 'text/plain'
            }
        })
        .then(response => response.text())
        .catch(error => console.error('Error:', error));
    }
});
