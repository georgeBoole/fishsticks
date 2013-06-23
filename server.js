var app = require('http').createServer(handler);
var io = require('socket.io').listen(app);
var fs = require('fs');
var log = require('winston');

var SERVER_PORT = 8080;
var CART_SIZE = {x: 48, y: 32};
var ROW_Y_VALUES = [60, 120, 180];
var CART_SPEEDS = [40, 50, 60];
var cart_id = 0;
var playerlist = [];
var carts = [];
var CART_BATCH_SIZE = 3;
var CART_SPAWN_DELAY = 1000; //ms
var MIN_CART_SPACING = 8;
/* 
	cart = {
		id,
		px, py, vx, vy,
		creation_timestamp,
		value
	}
*/
//var socket;
app.listen(SERVER_PORT);

function choose(list) {
	return list[Math.round(Math.random() * list.length)];
}

function create_cart() {

	var c = {
		id:cart_id++,
		x: Math.random() >= .5 ? 0 : 320 - CART_SIZE.x,
		y: choose(ROW_Y_VALUES),
		direction: choose(['left','right']),
		speed: choose(CART_SPEEDS),
		birth: new Date().getTime(),
		value: Math.round(Math.random() * 2 + 1)
	};
	carts.push(c);
	io.sockets.emit('spawnCart', c.x, c.y, c.direction, c.speed, c.value, c.id)
}

function handler(request, response) {
	fs.readFile(__dirname + '/index.html',
		function (err, data) {
			if (err) {
				res.writeHead(500);
				return res.end('Error loading index.html');
			}
			res.writeHead(200);
			res.end(data);
		});
}

function isHit(sx, sy, cx, cy) {
	return (sx >= cx && sx <= cx + CART_SIZE.x) && (sy >= cy && sy <= cy + CART_SIZE.y);
}

function spawnCarts() {
	if (playerlist && playerlist.length >= 1) {
		for (var i = 0; i < CART_BATCH_SIZE; i++) {
			create_cart();
		}
	}
}

io.sockets.on('connection', function(socket) {

	socket.on('attemptShot', function(name, x, y) {
		var hit = false;
		for (var i=0; i < carts.length; i++) {
			if (isHit(x, y, carts[i].x, carts[i].y)) {
				hit = true;
				break;
			}
		}
		if (hit) {
			socket.broadcast.emit('hitCart', carts[i].id);
			carts.erase(carts[i]);
		}
		else {
			io.sockets.emit('message', name + ' missed his shot');
		}
	});
	socket.on('initializePlayer', function(name) {
		socket.clientname = name;
		playerlist.push(name);
		socket.broadcast.emit('updatePlayers', name,playerlist, {});
	});
	socket.on('disconnect', function() {
		delete playerlist[socket.clientname];
		for (var i in playerlist) {
			if (playerlist[i] == socket.clientname) {
				playerlist.splice(i, 1);
			}
		}
		socket.broadcast.emit('message', socket.clientname + ' has disconnected');
		socket.broadcast.emit('playerLeave', socket.clientname);
	});
});

setInterval(spawnCarts, CART_SPAWN_DELAY);