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
	var first_player_loc = {x:10,y:200};
	var player_spacing = 64;
	createCart = function(x, y, direction, speed,uuid) {
		console.log('creating cart');
		settings = {'direction':direction,'speed':speed,'uuid':uuid};
		var cart = ig.game.spawnEntity(EntityCart, x, y, settings);
		cart_lookup[uuid] = cart;
	};
	spawnCarts = function(cartData){

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
		var angle = p.angleTo(c);
		var settings = {'angle':angle,'target':c.pos}
		console.log('SHOT FROM PLAYER:' + playerName + ' TO CART:' + cart_id + ' AT ANGLE:' + angle);
		ig.game.spawnEntity(EntityShot,
		 p.pos.x + (p.size.x/2),
		 p.pos.y + (p.size.y/2),
		 settings);
	};
	spawnPlayer = function(playerName,settings) {
		console.log("Spawning player: " + playerName);
		var xPos = first_player_loc.x + Object.keys(player_lookup).length*player_spacing;
		var player = ig.game.spawnEntity(EntityPlayer,xPos,first_player_loc.y,settings);
		player_lookup[playerName] = player;
	};
	killPlayer = function(playerName) {
		var player = player_lookup[playerName];
		if(player == undefined) {
			console.log("Can't find player with the name: " + playerName);
		} else {
			console.log("Killing player: " + playerName);
			player.kill();
			delete player_lookup[playerName];
		}
	};
	displayMessage = function(msg) {
		console.log(msg);
	};
})