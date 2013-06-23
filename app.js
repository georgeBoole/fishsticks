var app = require('http').createServer(handler);
var io = require('socket.io').listen(app);
var fs = require('fs');
var log = require('winston');

var SERVER_PORT = 8080;
var CART_SIZE = {x: 48, y: 32};

var cart_id = 0;
var playerlist = [];
var carts = [];
var socket;
app.listen(SERVER_PORT);

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
		io.sockets.emit('playerJoin', name, getID(name), {});
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

