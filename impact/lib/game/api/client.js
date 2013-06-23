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
	var socket = io.connect(HOST);

	socket.on('playerJoin', function(name, uuid, settings) {

	});
	socket.on('playerLeave', function(player_id) {

	});
	socket.on('message', function(msg) {
		console.log('SERVER MESSAGE: ' + msg);
	});
	socket.on('spawnCart', function(x, y, direction, speed, value, uuid) {

	});
	socket.on('hitCart', function(player_name, cart_id) {
		console.log(player_name + ' hit cart #' + cart_id);
	});


	requestShot = function(player_name, x, y) {
		socket.emit('attemptShot', player_name, x, y);
	};

});