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
	var first_player_loc = {x:50,y:200};
	var max_players = 4;
	var player_spacing = 64;
	var spawn_locs = [];
	initializeSpawns = function() {
		//creates the points where players sit
		for(var i = 0; i < max_players; i++) {
			console.log('i=' + i);
			spawn_locs.push(first_player_loc.x + player_spacing * i);
		}
		console.log('spawnLocs:' + spawn_locs);
	};
	
	Object.size = function(obj) { var size = 0, key; for (key in obj) { if (obj.hasOwnProperty(key)) size++; } return size; };
	
	fireShot = function(playerName,cart_id) {
		//Creates a shot entity from the specified player
		//To the specified cart
		var p = player_lookup[playerName];
		var c = cart_lookup[cart_id];
		if (p == undefined || c == undefined) {
			//console.log("CANNOT FIRE: Undefined player name or cart id");
		} else if(local_player == playerName) {
			//console.log("INVALID SHOOTER: ONLY THE LOCAL PLAYER CAN FIRE");
		}else {
			var angle = p.angleTo(c);
			var settings = {'angle':angle,'target':c.pos}
			//console.log('SHOT FROM PLAYER:' + playerName + ' TO CART:' + cart_id + ' AT ANGLE:' + angle);
			ig.game.spawnEntity(EntityShot,
			 p.pos.x + (p.size.x/2),
			 p.pos.y + (p.size.y/2),
			 settings);
		}
	};
	makeCart = function(x, y, direction, speed, value, id) {
		var dmap = {'left':-1, 'right':1};
		cart_lookup[id] = ig.game.spawnEntity(EntityCart, x, y, {'vel':{'x':dmap[direction] * speed, 'y':0}, 'id':id, 'uuid':id,'value':value});
		//console.log('making a cart entity');
	};
	killCart = function(cart_id) {
		if (cart_id in cart_lookup) {
			var cart = cart_lookup[cart_id];
			cart.kill();
			delete cart_lookup[cart_id];
		}
		//console.log('killing cart entity with ' + cart_id);
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
		var px = ox + ((existing_players.length + 1) * player_spacing);
		var py = oy;
		var p = ig.game.spawnEntity(EntityPlayer, px, py, {'name':name});
		console.log('just spawned a new player');
		console.log(p);
	};
	killPlayer = function(playerName) {
		//Kills a player with the specified name and
		//removes them from the player_lookup.
		var player = player_lookup[playerName];
		if(player == undefined) {
			//console.log("Can't find player with the name: " + playerName);
		} else {
			//console.log("Killing player: " + playerName);
			spawn_locs.push(player.pos.x);
			player.kill();
			//console.log("kill key length1:" + Object.size(player_lookup));
			delete player_lookup[playerName];
			//console.log("kill key length2:" + Object.size(player_lookup));
=======
		var players = ig.game.getEntitiesByType(EntityPlayer);
		for (var i in players) {
			if (players[i] && players[i].name == playerName) {
				console.log('killing ' + playerName);
				players[i].kill();
			}
>>>>>>> 0a0f1e422ae0f7dfa0f7600e0e02744eb6c633be
		}
	};
	displayMessage = function(msg) {
		//console logs a passed in message
		//We're doing something else with this later?
		console.log(msg);
	};
})