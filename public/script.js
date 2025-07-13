// Establish a connection to the Socket.IO server
// By default, it connects to the host that served the page (http://localhost:3000)
const socket = io();

// Get references to HTML elements
const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

// Handle form submission (when user sends a message)
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent default form submission (page reload)
    if (input.value) { // If input field is not empty
        socket.emit('chat message', input.value); // Emit 'chat message' event to the server
        input.value = ''; // Clear the input field
    }
});

// Listen for 'chat message' events from the server
socket.on('chat message', (msg) => {
    const item = document.createElement('li'); // Create a new list item
    item.textContent = msg; // Set its text content to the received message
    messages.appendChild(item); // Add it to the messages list
    window.scrollTo(0, document.body.scrollHeight); // Scroll to the bottom
});