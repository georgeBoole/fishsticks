ig.module(
	'game.entities.explosion'
).requires(
	'impact.entity'
).defines(function() {
	EntityExplosion = ig.Entity.extend({
		animSheet: new ig.AnimationSheet('media/bigExplosion.png', 64, 64),
		size: {x: 64,y: 64},
		maxVel: {x:1000,y:1000},
		init: function(x,y,settings) {
			this.addAnim('boom',0.03,[0,1,2,3,4,5,6,7,8,9]);
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
			if(this.currentAnim.loopCount > 1) {
				this.kill();
			}
		}
	});
});
