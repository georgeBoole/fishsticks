// message.js
// this script wraps server/client communication using socket.io
ig.module(
	'game.api.client'
)
.requires(
)
.defines(function() {
	var messages = [];
	var HOST = 'http://192.168.1.12:8080';
	var socket = io.connect('http://localhost:3700');

	var socket = io.connect(HOST);

	socket.on('playerJoin', function(name, uuid, settings) {

	});
	socket.on('playerLeave', function(player_id) {

	});
	socket.on('message', function(msg) {

	});
	socket.on('spawnCart', function(x, y, direction, speed, value, uuid) {

	});
	socket.on('hitCart', function(player_id, cart_id) {

	});


	requestShot = function(x, y, player_id) {
		socket.emit('attemptShot', player_id, x, y);
	};

});