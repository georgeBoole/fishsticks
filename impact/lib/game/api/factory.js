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
	var font = new ig.Font('media/font.png');
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
		if (!p || !c) {
			return;
		}
		p.score += c.value;
		if (p.kills) {
			p.kills += 1;
		}
		var angle = p.angleTo(c);
		var settings = {'angle':angle,'target':c};
		var shot = ig.game.spawnEntity(EntityShot, p.pos.x + (p.size.x/2), p.pos.y + (p.size.y/2), settings);
	};
	makeCart = function(x, y, direction, speed, value, id) {
		var dmap = {'left':-1, 'right':1};
		var c = ig.game.spawnEntity(EntityCart, x, y, {'vel':{'x':dmap[direction] * speed, 'y':0}, 'uuid':id,'value':value});
		cart_lookup[id] = c;
		return c;
	};
	killCart = function(cart_id) {
		if (cart_id in cart_lookup) {
			var cart = cart_lookup[cart_id];
			debug('lookup:'+cart_lookup+'cart_id:'+cart_id+'cart:'+cart);
			cart.kill();
			delete cart_lookup[cart_id];
		}
		else {
			console.log('cannot find cart ' + cart_id + ' and cannot kill it');
		}
	};
	addLocalPlayer = function(name) {
		local_player = name;
		addPlayer(name);
	};
	repositionPlayers = function() {
		if (!ig || !ig.system || !ig.game) {
			return;
		}
		var width = ig.system.width, height = ig.system.height;
		var x_offset = 0.1 * width;
		var y_offset = height - 96;
		var players = ig.game.getEntitiesByType(EntityPlayer);
		if (!players || players.length == 0) {
			return;
		}
		var num = players.length;
		var space_per_player = (width - (2*x_offset)) / num;
		for (var i = 0; i < num; i++) {
			players[i].pos = {'x':x_offset + (i * space_per_player), 'y': y_offset};
		}
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
		repositionPlayers();
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
		repositionPlayers();
	};
	displayMessage = function(msg) {
		console.log(msg);
	};
});