// message.js
// this script wraps server/client communication using socket.io
ig.module(
	'game.api.client'
)
.requires(
	'game.api.factory'
)
.defines(function() {
	var messages = [];
	//var HOST = 'http://192.168.1.12:8080';
	var socket = io.connect(HOST);
	var STATUS = 'Y'; // 'R', 'G' (yellow red and green for connecting, failed, connected)

	socket.on('join', function(player_name) {
		addPlayer(player_name);
	});
	socket.on('leave', function(player_name) {
		killPlayer(player_name);
	});
	socket.on('registered', function(name, existing_players) {
		if (existing_players && existing_players.length > 0) {
			existing_players.forEach(function(ep) {
				addPlayer(ep);
			});
		}
		addLocalPlayer(name);
		STATUS = 'G';
	});
	socket.on('message', function(msg) {
		console.log(msg);
	});
	socket.on('spawnCart', function(x, y, direction, speed, value, uuid) {
		if (ig.game) {
			makeCart(x, y, direction, speed, value, uuid);
		}
		else {
			console.log('cannot spawn cart until game object is initialized');
		}
	});
	socket.on('hitCart', function(player_name, cart_id) {
		fireShot(player_name,cart_id);
		killCart(cart_id,player_name);
	});
	socket.on('rejected', function(msg) {
		console.log('CONNECTION REJECTED: ' + msg);
		STATUS = 'R';
	});
	requestShot = function(player_name, x, y) {
		socket.emit('attemptShot', player_name, x, y);
	};
	initializeLocalPlayer = function(player_name) {
		socket.emit('initializePlayer',player_name);
	};
	debug = function(msg) {
		//socket.emit('log', msg);
		console.log(msg);
	};
	getConnectionStatus = function() {
		return STATUS;
	};
});