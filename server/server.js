const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

//Serving static files in express (in the public directory)
app.use(express.static(publicPath));

io.on('connection', (socket) => {
	console.log('New user connected');

	socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat app'));

	//broadcast message to all Client
	socket.broadcast.emit('newUserMessage', generateMessage('Admin', 'New user joined'));

	//Create event Listener with message and callback parameter
	socket.on('createMessage', (message, callback) => {
		console.log(message);
		
		//creating event emiter to every-single connection
		io.emit('newMessage', generateMessage(message.from, message.text));
		callback('this is from Server');
	});

	socket.on('createLocationMessage', (coords) => {
		io.emit('newLocationMessage', generateLocationMessage('Admin', `${coords.latitude}, ${coords.longitude}`));
	});

	socket.on('disconnect', () => {
		console.log('User was disconnected');
	});
});

server.listen(port,() => {
	console.log(`Server is up on port ${port}`)
});