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
	socket.on('spawnCarts', function(carts) {
		if (ig.game != undefined) {
			carts.forEach(function(c) {
				makeCart(c.x, c.y, c.vx, c.vy, c.val, c.uuid);
			});
			ig.game.sortEntitiesDeferred();
		}
	});
	socket.on('hitCart', function(player_name, cart_id) {
		fireShot(player_name,cart_id);
		killCart(cart_id,player_name);
	});
	socket.on('deleteCart', function(cart_id) {

	});
	socket.on('rejected', function(msg) {
		console.log('CONNECTION REJECTED: ' + msg);
		STATUS = 'R';
	});
	socket.on('decrementCombo', function(ammount) {
		console.log("DECREENT");
		decrementPlayerCombos(ammount);
	});
	requestShot = function(player_name, x, y, ts) {
		//console.log(player_name + ' requesting a shot');
		socket.emit('attemptShot', player_name, x, y, ts);
	};
	initializeLocalPlayer = function(player_name) {
		socket.emit('initializePlayer',player_name);
		STATUS = 'Y';
	};
	debug = function(msg) {
		//socket.emit('log', msg);
		//console.log(msg);
	};
	getConnectionStatus = function() {
		return STATUS;
	};
});