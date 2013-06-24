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
	var PLAYER_MARGIN = 0.075;
	var cart_lookup = {};
	var player_lookup = {};
	var local_player = undefined;
	var first_player_loc = {x:(640 * PLAYER_MARGIN),y:420};
	var max_players = 4;
	var player_spacing = (640 * (1 - (2 * PLAYER_MARGIN))) / max_players;
	
	Object.size = function(obj) { var size = 0, key; for (key in obj) { if (obj.hasOwnProperty(key)) size++; } return size; };
	
	fireShot = function(playerName,cart_id) {
		var p = player_lookup[playerName];
		var c = cart_lookup[cart_id];
		var angle = p.angleTo(c);
		var settings = {'angle':angle,'target':c.pos}
		console.log('SHOT FROM PLAYER:' + playerName + ' TO CART:' + cart_id + ' AT ANGLE:' + angle);
		ig.game.spawnEntity(EntityShot,
		 p.pos.x + (p.size.x/2),
		 p.pos.y + (p.size.y/2),
		 settings);
	};
	makeCart = function(x, y, direction, speed, value, id) {
		var dmap = {'left':-1, 'right':1};
		cart_lookup[id] = ig.game.spawnEntity(EntityCart, x, y, {'vel':{'x':dmap[direction] * speed, 'y':0}, 'uuid':id,'value':value});
	};
	killCart = function(cart_id) {
		if (cart_id in cart_lookup) {
			var cart = cart_lookup[cart_id];
			cart.kill();
			delete cart_lookup[cart_id];
		}
	};
	synchronize_carts = function(cart_dicts) {
		//var carts = ig.game.getEntitiesByType(EntityCart);
		var carts = player_lookup;
		for(var uuid in carts) {
			debug('uuid:'+uuid);
			var entityCarts = carts[uuid];
			var serverCarts = cart_dicts[uuid];
			debug("ENTITYCART:"+entityCarts);
			debug("SERVER CARTS:"+serverCarts);
			entityCarts.pos.x = serverCarts.x;
			entityCarts.pos.y = serverCarts.y;
		}
		debug('synchronizing_carts');
		debug('entities');
		debug(carts);
		debug('models');
		debug(cart_dicts);
	};
	addLocalPlayer = function(name) {
		local_player = name;
		addPlayer(name);
	};
	addPlayer = function(name) {
		var existing_players = ig.game.getEntitiesByType(EntityPlayer);
		for (var i =0; i < existing_players.length; i++) {
			if (existing_players[i].name == name) {
				console.log('player with that name already logged in');
				return;
			}
		}
		var ox = first_player_loc.x, oy = first_player_loc.y;
		var px = ox + ((existing_players.length) * player_spacing);
		var py = oy;
		var p = ig.game.spawnEntity(EntityPlayer, px, py, {'name':name});
		player_lookup[p.name] = p;
		console.log('just spawned a new player');
		console.log(p);
	};
	killPlayer = function(playerName) {
		//Kills a player with the specified name and
		//removes them from the player_lookup.
		var player = player_lookup[playerName];
		if(player == undefined) {
		} else {
			player.kill();
			delete player_lookup[playerName];
		}
		var players = ig.game.getEntitiesByType(EntityPlayer);
		for (var i in players) {
			if (players[i] && players[i].name == playerName) {
				console.log('killing ' + playerName);
				players[i].kill();
			}
		}
	};
	displayMessage = function(msg) {
		//console logs a passed in message
		//We're doing something else with this later?
		console.log(msg);
	};
});