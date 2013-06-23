// factory.js
// this script defines instantation functions for all the
// different entities
ig.module(
	'game.utils.factory'
)
.requires(
	'game.entities.cart',
	'game.entities.shot'
)
.defines(function() {
	createCart = function(x, y, settings) {
		console.log('creating cart');
		ig.game.spawnEntity(EntityCart, x, y, settings);
	};
	spawnCarts = function(cartData){

	};
	createShot = function(x, y, settings) {
		console.log('creating shot');
	};
})