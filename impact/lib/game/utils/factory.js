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
	};
	createShot = function(x, y, settings) {
		console.log('creating shot');
	};
})