// message.js
// this script wraps server/client communication using socket.io
ig.module(
	'game.api.client',
	'game.api.factory'
)
.requires(
)
.defines(function() {
	var messages = [];
	var HOST = 'http://192.168.1.12:8080';
	var socket = io.connect(HOST);

	socket.on('updatePlayers', function(players) {
		// players is a list of all the players including my local player
	});
	socket.on('message', function(msg) {
		console.log('SERVER MESSAGE: ' + msg);
	});
	socket.on('spawnCart', function(x, y, direction, speed, value, uuid) {

	});
	socket.on('hitCart', function(player_name, cart_id) {
		console.log(player_name + ' hit cart #' + cart_id);
		fireShot(player_name,cart_id);
		killCart(cart_id);
	});


	requestShot = function(player_name, x, y) {
		socket.emit('attemptShot', player_name, x, y);
	};
	initializeLocalPlayer = function(player_name) {
		console.log('Initializing local player:' + player_name);
		socket.emit('initalizePlayer',player_name);
	};

});