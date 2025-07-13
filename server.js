// Import necessary modules
const express = require('express');
const http = require('http'); // Node.js built-in module for HTTP server
const socketIo = require('socket.io'); // Socket.IO library

// Initialize Express app
const app = express();
// Create an HTTP server using the Express app
const server = http.createServer(app);
// Attach Socket.IO to the HTTP server, allowing real-time communication
const io = socketIo(server);

// Define the port the server will listen on. Use environment variable or default to 3000.
const PORT = process.env.PORT || 3000;

// Serve static files from the 'public' folder
// This means index.html, script.js, style.css (and any other frontend files)
// will be accessible from http://localhost:3000/
app.use(express.static('public'));

// --- Socket.IO Event Handling ---
// 'connection' event: Fired when a new client connects via WebSocket
io.on('connection', (socket) => {
    console.log('A user connected'); // Log when a user connects

    // 'chat message' event: Listen for messages sent from any client
    socket.on('chat message', (msg) => {
        console.log('Message received: ' + msg); // Log the received message on the server
        // Broadcast the message to ALL connected clients (including the sender)
        io.emit('chat message', msg);
    });

    // 'disconnect' event: Fired when a client disconnects
    socket.on('disconnect', () => {
        console.log('User disconnected'); // Log when a user disconnects
    });
});

// --- Start the Server ---
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Open your browser to http://localhost:${PORT}`);
});