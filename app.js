var app = require('http').createServer(handler);
var io = require('socket.io').listen(app);
var fs = require('fs');

var SERVER_PORT = 8080;
app.listen(SERVER_PORT);

var CART_SIZE = {x: 48, y: 32};

var playerlist = [];
var carts = [];

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

io.sockets.on('connection', function(socket) {
	socket.on('request_shot', function(x, y, player_id) {
		for (var i=0; i < carts.length; i++) {
			if isHit(x, y, carts[i].x, carts[i].y) {
				socket.broadcast.emit('hit', carts[i].id);
				carts.erase(carts[i]);
				break;
			}
		}
	});
	socket.on('playerjoin', function(name) {
		socket.clientname = name;
		playerlist.push(name);
		io.sockets.emit('addplayer', playerlist, name);
	});
	socket.on('disconnect', function() {
		delete playerlist[socket.clientname];
		for (var i in playerlist) {
			if (playerlist[i] == socket.clientname) {
				playerlist.splice(i, 1);
			}
		}
		socket.broadcast.emit('message', socket.clientname);
		socket.broadcast.emit('players', playerlist);
	});

});