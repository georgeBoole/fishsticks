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
			console.log("CANNOT FIRE: Undefined player name or cart id");
		} else if(local_player == playerName) {
			console.log("INVALID SHOOTER: ONLY THE LOCAL PLAYER CAN FIRE");
		}else {
			var angle = p.angleTo(c);
			var settings = {'angle':angle,'target':c.pos}
			console.log('SHOT FROM PLAYER:' + playerName + ' TO CART:' + cart_id + ' AT ANGLE:' + angle);
			ig.game.spawnEntity(EntityShot,
			 p.pos.x + (p.size.x/2),
			 p.pos.y + (p.size.y/2),
			 settings);
		}
	};
	makeCart = function(x, y, direction, speed, value, id) {
		var dmap = {'left':-1, 'right':1};
		cart_lookup[id] = ig.game.spawnEntity(EntityCart, x, y, {'vel':{'x':dmap[direction] * speed, 'y':0}, 'id':id, 'value':value});
		console.log('making a cart entity');
	};
	killCart = function(cart_id) {
		if (cart_id in cart_lookup) {
			var cart = cart_lookup[cart_id];
			cart.kill();
			delete cart_lookup[cart_id];
		}
		console.log('killing cart entity with ' + cart_id);
	};
	setLocalPlayer = function(playerName){
		local_player = playerName;
	};
	drawPlayers = function(playerNames) {
		//Mutates the player_lookup to match server data
		//Creates player entities at the right spots
		for(var i in playerNames) {
			var name = playerNames[i];
			var xSpawnCord = spawn_locs[i];
			var player = ig.game.spawnEntity(EntityPlayer,xSpawnCord, first_player_loc.y, {});
			player_lookup[name] = player;
		}
	};
	killPlayer = function(playerName) {
		//Kills a player with the specified name and
		//removes them from the player_lookup.
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
		//console logs a passed in message
		//We're doing something else with this later?
		console.log(msg);
	};
})