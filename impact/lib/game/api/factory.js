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
	'game.entities.shot',
	'game.entities.reward',
	'game.entities.cursor'
)
.defines(function() {
	var PLAYER_MARGIN = 0.075;
	var font = new ig.Font('media/font.png');
	var cart_lookup = {};
	var player_lookup = {};
	var local_player = undefined;
	var high_score = 0;
	var high_score_player = undefined
	var first_player_loc = {x:(640 * PLAYER_MARGIN),y:420};
	var max_players = 4;
	var player_spacing = (640 * (1 - (2 * PLAYER_MARGIN))) / max_players;
	var open_player_colors = [0,1,2,3,4];
	var occupied_player_colors = [];
	Object.size = function(obj) { var size = 0, key; for (key in obj) { if (obj.hasOwnProperty(key)) size++; } return size; };
	last_updated = null;
	updatePlayerState = function(name, score, progress) {
		var player = player_lookup[name];
		player.score = score;
		player.setProgress(progress);
		if(player.score > high_score && player != high_score_player) {
			high_score = player.score;
			var reward = ig.game.getEntitiesByType(EntityReward);
			if(reward.length === 0) {
				ig.game.spawnEntity(EntityReward,player.pos.x,player.pos.y,{});
			}
			reward[0].relocate(player.pos);
		}
	};
	makeCursor = function() {
		ig.game.spawnEntity(EntityCursor,0,0,{});
	};
	fireShot = function(playerName,cart_id) {
		var p = player_lookup[playerName];
		//var elapsed_time = (timestamp - last_updated)/1000;
		var c = cart_lookup[cart_id];
		//c.pos.x = c.pos.x + (elapsed_time * -c.vel.x);
		if (!p || !c) {
			return;
		}
		//p.score += c.points;
		if (p.kills) {
			p.kills += 1;
		}
		var angle = p.angleTo(c);
		var settings = {'angle':angle,'target':c};
		var shot = ig.game.spawnEntity(EntityShot, p.pos.x + (p.size.x/2), p.pos.y + (p.size.y/2), settings);

	};
	makeCart = function(x, y, vx, vy, val, id) {
		var c = ig.game.spawnEntity(EntityCart, x, y, {'vel':{'x':vx, 'y':vy}, 'uuid':id,'val':val});
		cart_lookup[id] = c;
		last_updated = Date.now()/1000;
		return c;
	};
	killCart = function(cart_id,player_name) {
		if (cart_id in cart_lookup) {
			var p = player_lookup[player_name];
			var cart = cart_lookup[cart_id];
			cart.getShot(p);
			delete cart_lookup[cart_id];
		}
		else {
			console.log('cannot find cart ' + cart_id + ' and cannot kill it');
		}
	};
	destroyCart = function(cart_id) {
		if (cart_id in cart_lookup) {
			var cart = cart_lookup[cart_id];
			cart.kill();
			delete cart_lookup[cart_id];
		}
		else {
			console.log('cannot find cart ' + cart_id + ' and cannot destroy it');
		}
	};
	addLocalPlayer = function(name) {
		local_player = name;
		addPlayer(name);
		makeCursor();
	};
	repositionPlayers = function() {
		if (!ig || !ig.system || !ig.game) {
			return;
		}
		var width = ig.system.width, height = ig.system.height;
		var x_offset = 0.06 * width;
		var y_offset = height - 64;
		var players = ig.game.getEntitiesByType(EntityPlayer);
		if (!players || players.length == 0) {
			return;
		}
		var num = players.length;
		var space_per_player = (width - (2*x_offset)) / num;
		for (var i = 0; i < num; i++) {
			var new_x = 2*x_offset + (i * space_per_player);
			var p = players[i];
			p.pos = {'x': new_x, 'y': y_offset};
			p.moveProgressBar();
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
		//assigning player color here
		var player_color;
		if(open_player_colors.length > 0){
			player_color = open_player_colors.shift();
		} else {
			console.log("There are no more open colors. Beginning to recycle");
			player_color = 0;
		}
		var p = ig.game.spawnEntity(EntityPlayer, px, py, {'name':name, 'color':player_color});
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
	// decrementPlayerCombos = function(ammount) {
	// 	var players = ig.game.getEntitiesByType(EntityPlayer);
	// 	for(var p in players){
	// 		if(players[p] != undefined){
	// 			if (players[p].progress_bar == undefined && players[p].pos != undefined) {
	// 				players[p].progress_bar = ig.game.spawnEntity(EntityProgress, players[p].pos.x, players[p].pos.y - 25, {});
	// 			}
	// 			if (players[p].progress_bar != undefined) {
	// 				players[p].progress_bar.updateProgress(-ammount);
	// 			}
	// 		}
	// 	}
	// };
	displayMessage = function(msg) {
		console.log(msg);
	};
});