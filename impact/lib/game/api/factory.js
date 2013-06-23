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
		ig.game.spawnEntity(EntityCart, x, y, settings);
	};
	spawnCarts = function(cartData){

	};
	killCart = function(uuid) {

	};
	createShot = function(x, y, settings) {
		console.log('creating shot');
	};
})