// factory.js
// this script defines instantation functions for all the
// different entities
ig.module(
	'game.api.factory'
)
.requires(
	'game.entities.cart',
	'game.entities.shot'
)
.defines(function() {
	var id_lookup = {};
	createCart = function(x, y, direction, speed,uuid) {
		console.log('creating cart');
		settings = {'direction':direction,'speed':speed,'uuid':uuid};
		var cart = ig.game.spawnEntity(EntityCart, x, y, settings);
		id_lookup[uuid] = cart;
	};
	spawnCarts = function(cartData){

	};
	killCart = function(uuid) {
		var cart = id_lookup[uuid];
		if(cart == undefined) {
			console.log("Can't find cart with uuid: " + uuid);
		} else {
			console.log('killing cart');
			cart.kill();
			delete id_lookup[uuid];
		}
		
	};
	createShot = function(x, y, settings) {
		console.log('creating shot');
	};
})