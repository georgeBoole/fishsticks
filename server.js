var app = require('http').createServer(handler);
var io = require('socket.io').listen(app);
var fs = require('fs');
var bunyan = require('bunyan');

var log = bunyan.createLogger({
	name: 'angryMinerServer',
	streams: [
		{
			level: 'info',
			stream: process.stdout,
		},
		{
			level: 'debug',
			path: '/var/log/angry_miner.log'
		}
	]
});

var SERVER_PORT = 8080;
var CART_SIZE = {x: 48, y: 32};
var ROW_Y_VALUES = [40, 100, 160, 220];
var ROW_DIRECTIONS = ROW_Y_VALUES.map(function(r) { return Math.random() >= .5 ? 1 : -1; });
var CART_SPEEDS = [40, 50, 60];
var cart_id = 0;
var playerlist = [];
var carts = {};
var CART_BATCH_SIZE = 3;
var CART_SPAWN_DELAY = 8000; //ms
var CART_UPDATE_DELAY = 17; //ms
var MIN_CART_SPACING = 8;

log.info('Starting game server, listening on port ' + SERVER_PORT);
app.listen(SERVER_PORT);


function choose(list) {
	return list[Math.round(Math.random() * (list.length-1))];
}
function create_cart() {

	var c = {
		uuid:cart_id++,
		x: Math.random() >= .5 ? 0 : 320 - CART_SIZE.x,
		y: choose(ROW_Y_VALUES),
		direction: choose(['left','right']),
		speed: choose(CART_SPEEDS),
		birth: new Date().getTime(),
		value: Math.round(Math.random() * 2 + 1),
	};
	c['vx'] = c.direction == 'left' ? c.speed * -1 : c.speed;
	c['vy'] = 0;
	carts[c.uuid] = c;
	io.sockets.emit('spawnCart', c.x, c.y, c.direction, c.speed, c.value, c.uuid);
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
	//return(Math.abs(sx - cx) < CART_SIZE*5 && Math.abs(sy-cy) < CART_SIZE*5);
}
function spawnCarts() {
	if (playerlist && playerlist.length >= 1) {
		for (var i = 0; i < CART_BATCH_SIZE; i++) {
			create_cart();
		}
	}
}
var last_update = null;
function updateCarts() {
	if (carts && playerlist && playerlist.length > 0) {
		var now = Date.now() / 1000;
		var dt = last_update ? now - last_update : 0;
		//log.debug('dt: ' + dt);
		for (var k in carts) {
			var ct = carts[k];
			ct.x += ct.vx * dt;
			ct.y += ct.vy * dt;
		}
		
		last_update = now;
	}
	io.sockets.emit('updateCarts', carts);
}
io.sockets.on('connection', function(socket) {

	socket.on('log', function(string) {
		log.debug(string);
	});
	socket.on('attemptShot', function(name, x, y) {
		var hit = false;
		var ct;
		for (var i in carts) {
			ct = carts[i];
			//var age = (new Date().getTime() - ct.birth) / 1000;
			//log.debug('age is ' + age);
			//log.debug(ct);
			//log.debug('calculating cart to be at (' + cx + ', ' + ct.y + ')');
			if (isHit(x, y, ct.x, ct.y)) {
				io.sockets.emit('message',name);
				hit = true;
				break;
			}
		}
		if (hit) {
			io.sockets.emit('hitCart', name, ct.uuid);
			delete ct;
		}
		else {
			io.sockets.emit('message', (name != undefined ? name.toString() : 'some player') + ' missed his shot');
		}
	});
	socket.on('initializePlayer', function(name) {
		socket.clientname = name;
		socket.emit('registered', name, playerlist && playerlist.length > 0 ? playerlist : []);
		playerlist.push(name);
		socket.broadcast.emit('join', name);
	});
	socket.on('disconnect', function() {
		delete playerlist[socket.clientname];
		for (var i in playerlist) {
			if (playerlist[i] == socket.clientname) {
				playerlist.splice(i, 1);
			}
		}
		socket.broadcast.emit('message', socket.clientname + ' has disconnected');
		socket.broadcast.emit('leave', socket.clientname);
	});
});

setInterval(spawnCarts, CART_SPAWN_DELAY);
setInterval(updateCarts, CART_UPDATE_DELAY);
