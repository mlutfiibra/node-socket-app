const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

//Serving static files in express (in the public directory)
app.use(express.static(publicPath));

io.on('connection', (socket) => {
	console.log('New user connected');

	// socket.emit('welcomeMessage', {
	// 	from:'Admin',
	// 	text: 'Welcome to chat app'
	// });

	socket.emit('welcomeMessage', generateMessage('Admin', 'Welcome to chat app'));

	//broadcast message to all Client
	socket.broadcast.emit('welcomeMessage', generateMessage('Admin', 'New user joined'));

	socket.on('createMessage', (message) => {
		console.log('createMessage', message)
		
		//creating event to every-single connection
		io.emit('newMessage', generateMessage(message.from, message.text));

		// socket.broadcast.emit('newMessage', {
		// 	from: message.from,
		// 	text: message.text,
		// 	createdAt: new Date().getTime()
		// });
	});

	socket.on('disconnect', () => {
		console.log('User was disconnected');
	});
});

server.listen(port,() => {
	console.log(`Server is up on port ${port}`)
});