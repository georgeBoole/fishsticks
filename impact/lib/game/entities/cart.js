ig.module(
	'game.entities.cart'
).requires(
	'impact.entity'
).defines(function() {
	EntityCart = ig.Entity.extend({
		animSheet: new ig.AnimationSheet('media/cartSprite.png',32,32),
		size: {x:32,y:32},
		dirs: {'left':-1,'right':1},
		init: function(x,y,settings) {
			this.parent(x,y,settings);
			this.addAnim('idle',1,[0]);
			this.vel = {x: this.dirs[this.direction]*this.speed, y:0};
			if (this.uuid == undefined) {
				// something is really wrong, assign null
				// should never get here
				console.log('Cart created without uuid specified');
				this.uuid = null;
			}
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