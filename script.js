const chatBox = document.getElementById('chat-box');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

const socket = new WebSocket('ws://localhost:3000');

socket.onopen = () => {
    console.log('WebSocket connection opened');
};

socket.onmessage = (event) => {
    displayMessage(event.data);
};

socket.onclose = () => {
    console.log('WebSocket connection closed');
};

sendButton.addEventListener('click', () => {
    const message = messageInput.value.trim();
    if (message !== '') {
        socket.send(message);
        displayMessage(`You: ${message}`);
        messageInput.value = '';
    }
});

function displayMessage(message) {
    const messageElement = document.createElement('p');

    if (typeof message === 'string') {
        messageElement.textContent = message;
    } else if (message instanceof Blob) {
        // Handle Blob messages (if any)
        const reader = new FileReader();
        reader.onloadend = () => {
            messageElement.textContent = reader.result;
        };
        reader.readAsText(message);
    }

    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

