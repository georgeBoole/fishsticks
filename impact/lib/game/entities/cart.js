ig.module(
	'game.entities.cart'
).requires(
	'impact.entity'
).defines(function() {
	EntityCart = ig.Entity.extend({
		animSheet: new ig.AnimationSheet('media/cartSprite.png',32,32),
		size: {x:32,y:32},
		speed: 20,
		init: function(x,y,settings) {
			this.addAnim('idle',1,[0]);
			direction = settings.direction;
			this.vel = {x:direction*x, y:0};
			this.parent(x,y,settings);
		},
		kill: function() {
			this.parent();
		},
		draw: function() {
			this.parent();
		},
		update: function() {
			this.parent();
		}
	});
});