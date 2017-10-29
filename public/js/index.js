//Client Side
var socket = io();

socket.on('connect', function() {
    console.log('Connected to server');
});

socket.on('welcomeMessage', function(message) {
	console.log('Welcome Message', message);
});

socket.on('newMessage', function(message) {
	console.log('New Message', message);
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});