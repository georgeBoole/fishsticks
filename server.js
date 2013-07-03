var app = require('http').createServer(handler);
var io = require('socket.io').listen(app);
io.set('log level', 0);

// var redis = require('redis'),
// 	client = redis.createClient();

var fs = require('fs');





var MAX_NAME_LENGTH=10;

var MAX_PLAYERS=6;

var SERVER_PORT=8080;


// Game rules configuration



var NAME="fishsticks";



var CART_BATCH_SIZE=4;



var GALLERY_OFFSETS={ 'top':0.05, 'bottom':0.15 };



var CART_SPAWN_DELAY=1800;



var CART_SPEED=400;



var CART_UPDATE_DELAY=250;



var CART_TARGET_FACTOR=1.2;



var MIN_CART_SPACING=8;



var NUM_ROWS=5;



var CART_SIZE={ 'x':64, 'y':64 };


var WIDTH=1800;
var HEIGHT=1024;
// Variable declarations hardcoded into template
var playerlist = [];
var carts = {};
var cart_id = 0;
var traffic = [];
var y_to_row = {};
var target_size  = {'x':CART_SIZE.x * CART_TARGET_FACTOR, 'y':CART_SIZE.y * CART_TARGET_FACTOR};
var x_offset = (target_size.x - CART_SIZE.x) / 2;
var y_offset = (target_size.y - CART_SIZE.y) / 2;
app.listen(SERVER_PORT);


function build_create_cart() {
	var base_y = GALLERY_OFFSETS['top'] * HEIGHT;
	var gallery_height = (1.0 - (GALLERY_OFFSETS['top'] + GALLERY_OFFSETS['bottom'])) * HEIGHT;
	var row_height = gallery_height / NUM_ROWS;
	var row_y = [];
	for (var r = 0; r < NUM_ROWS; r++) {
		row_y[r] = base_y + (row_height * r);
		y_to_row[row_y[r]] = r;
		traffic[r] = 0;
	}


	var create = function(qty) {
		var row = Math.floor(Math.random() * NUM_ROWS);
		var d = Math.random() >= 0.5 ? 1 : -1;
		var vx = d * CART_SPEED;
		var cx = d > 0 ? -CART_SIZE.x : WIDTH;
		var dxc = CART_SIZE.x + MIN_CART_SPACING;
		var delta_x = d * dxc;
		var new_carts = [];
		var birth = Date.now() / 1000;
		for (var i = 0; i < qty; i++) {
			var c = {
				uuid: cart_id++,
				x: cx + (delta_x * i),
				y: row_y[row],
				'vx': vx,
				vy: 0,
				val: Math.floor(Math.random() * 2 + 1),
				'birth':birth
			};
			c['ix'] = c['x'];
			c['iy'] = c['y'];
			new_carts.push(c);
			carts[c.uuid] = c;
		}
		io.sockets.emit('spawnCarts', new_carts);
		traffic[row] += d * qty;
	};
	return create;
}
var create_cart = build_create_cart();

function choose(list) {
	return list[Math.round(Math.random() * (list.length-1))];
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
	var tx = cx - x_offset;
	var ty = cy - y_offset;
	var tw = target_size.x;
	var th = target_size.y;
	return (sx >= tx && sx <= tx + tw) && (sy >= ty && sy <= ty + th);
	// return (sx >= (cx - x_offset)) && (sx <= (cx - x_offset) + target_size.x) && (sy >= cy && sy <= cy + CART_SIZE.y);
	// return (sx >= (cx - x_offset) && (sx <= (cx - x_offset) + target_size.x) && (sy >= cy && sy)
}
function spawnCarts() {
	if (playerlist && playerlist.length >= 1) {
		create_cart(Math.floor(Math.random() * 3 + 1));
	}
}
var last_update = null;
function updateCarts() {
	if (carts && playerlist && playerlist.length > 0) {
		var now = Date.now() / 1000;
		var dt = last_update ? now - last_update : 0;
		for (var k in carts) {
			var ct = carts[k];
			ct.x += ct.vx * dt;
			ct.y += ct.vy * dt;
			if ((ct.vx > 0 && ct.x > WIDTH) || (ct.vx <= 0 && ct.x < -CART_SIZE.x)) {
				traffic[y_to_row[ct.y]] -= ct.vx > 0 ? 1: -1;
				io.sockets.emit('deleteCart', ct.uuid);
				delete carts[k];
			}
		}
		last_update = now;
	}
	//io.sockets.emit('message', 'traffic: ' + traffic.join(','));
}
io.sockets.on('connection', function(socket) {

	socket.on('log', function(string) {
		
	});
	socket.on('attemptShot', function(name, x, y, timestamp) {
		var hit = false;
		var hit_index = -1;
		var ct;
		//socket.emit('message', 'attempting a shot server side');
		for (var i in carts) {
			ct = carts[i];
			var client_x = ct.ix + ((timestamp - ct.birth) * ct.vx);
			
			var elapsedTime = (timestamp - last_update) / 1000.0;
			var model_x = ct.x + (elapsedTime * ct.vx);
			//socket.emit('message', 'model_x: ' + model_x + ', cart_x: ' + ct.x);
			//socket.emit('message', 'timestamp: ' + timestamp);
			//socket.emit('message', 'last_update: '+ last_update);
			//socket.emit('message', client_x);
			//socket.emit('message', timestamp);
			//socket.emit('message', (timestamp - ct.birth));
			if (isHit(x, y, model_x, ct.y)) {
				io.sockets.emit('hitCart', name, i);
				traffic[y_to_row[ct.y]] -= ct.vx > 0 ? 1: -1;
				delete carts[i];
				//return;
			}

		}
	});
	socket.on('initializePlayer', function(name) {
		var valid_name = name.length > MAX_NAME_LENGTH ? name.slice(0, MAX_NAME_LENGTH) : name;
		socket.clientname = valid_name;
		socket.emit('registered', valid_name, playerlist && playerlist.length > 0 ? playerlist : []);
		playerlist.push(valid_name);
		socket.broadcast.emit('join', valid_name);
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