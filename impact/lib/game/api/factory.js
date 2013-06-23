// factory.js
// this script defines instantation functions for all the
// different entities
ig.module(
	'game.api.factory'
)
.requires(
	'game.entities.cart',
	'game.entities.shot',
	'game.entities.player',
	'game.entities.shot'
)
.defines(function() {
	var cart_lookup = {};
	var player_lookup = {};
	var local_player = undefined;
	var first_player_loc = {x:10,y:200};
	var max_players = 4;
	var player_spacing = 64;
	var spawn_locs = [];
	initializeSpawns = function() {
		for(var i = 0; i < max_players; i++) {
			console.log('i=' + i);
			spawn_locs.push(first_player_loc.x + player_spacing * i);
		}
		console.log('spawnLocs:' + spawn_locs);
	};
	Object.size = function(obj) { var size = 0, key; for (key in obj) { if (obj.hasOwnProperty(key)) size++; } return size; };
	createCart = function(x, y, direction, speed,uuid,value) {
		console.log('creating cart');
		settings = {'direction':direction,'speed':speed,'uuid':uuid, 'value':value};
		var cart = ig.game.spawnEntity(EntityCart, x, y, settings);
		cart_lookup[uuid] = cart;
	};
	spawnCarts = function(cartData){
		//Makes multiple, appropriately spaced carts
	};
	killCart = function(uuid) {
		var cart = cart_lookup[uuid];
		if(cart == undefined) {
			console.log("Can't find cart with uuid: " + uuid);
		} else {
			console.log('killing cart');
			cart.kill();
			delete cart_lookup[uuid];
		}
	};
	fireShot = function(playerName,cart_id) {
		var p = player_lookup[playerName];
		var c = cart_lookup[cart_id];
		if (p == undefined || c == undefined) {
			console.log("CANNOT FIRE: Undefined player name or cart id");
		} else {
			var angle = p.angleTo(c);
			var settings = {'angle':angle,'target':c.pos}
			console.log('SHOT FROM PLAYER:' + playerName + ' TO CART:' + cart_id + ' AT ANGLE:' + angle);
			ig.game.spawnEntity(EntityShot,
			 p.pos.x + (p.size.x/2),
			 p.pos.y + (p.size.y/2),
			 settings);
		}
	};
	spawnPlayer = function(playerName,settings) {
		if(spawn_locs.length == 0){
			console.log("CANNOT SPAWN ANOTHER PLAYER: NO MORE OPEN SPAWN POINTS");
		} else {
			var xPos = spawn_locs.shift();
			console.log('XPOS:' + xPos);
			var player = ig.game.spawnEntity(EntityPlayer,xPos,first_player_loc.y,settings);
			local_player = player;
			player_lookup[playerName] = player;
		}
	};
	killPlayer = function(playerName) {
		var player = player_lookup[playerName];
		if(player == undefined) {
			console.log("Can't find player with the name: " + playerName);
		} else {
			console.log("Killing player: " + playerName);
			spawn_locs.push(player.pos.x);
			player.kill();
			console.log("kill key length1:" + Object.size(player_lookup));
			delete player_lookup[playerName];
			console.log("kill key length2:" + Object.size(player_lookup));
		}
	};
	displayMessage = function(msg) {
		console.log(msg);
	};
})