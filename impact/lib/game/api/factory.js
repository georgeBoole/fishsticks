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
	createCart = function(x, y, direction, speed) {
		console.log('creating cart');
		settings = {'direction':direction,'speed':speed};
		ig.game.spawnEntity(EntityCart, x, y, settings);
	};
	spawnCarts = function(cartData){

	};
	createShot = function(x, y, settings) {
		console.log('creating shot');
	};
})