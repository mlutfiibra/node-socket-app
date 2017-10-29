//Client Side
var socket = io();

socket.on('connect', function() {
    console.log('Connected to server');

    socket.emit('createEmail', {
    	to: 'mlutfiibra@outlook.com',
    	text: 'Chat from client side'
    });

    socket.emit('createMessage', {
    	from: 'mlutfiibra@outllok.com',
    	text: 'Lunch, today. 10am'
    });
});

//custom event
socket.on('newEmail', function(email) {
	console.log('New email', email);
});

socket.on('newMessage', function(message) {
	console.log('New message', message);
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});