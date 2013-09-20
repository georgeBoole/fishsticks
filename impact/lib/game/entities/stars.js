ig.module(
	'game.entities.stars'
).requires(
	'impact.entity'
).defines(function() {
	EntityStars = ig.Entity.extend({
		animSheet: new ig.AnimationSheet('media/starsprite.png', 6, 6),
		size: {x: 6,y: 6},
		maxVel: {x:1000,y:1000},
		pulseTimer: new ig.Timer(3),
		init: function(x,y,settings) {
			this.parent(x,y,settings);
			this.addAnim('idle',1,[Math.floor(Math.random() * 3)]);

		},
		kill: function() {
			this.parent();
		},
		draw: function() {
			this.parent();
		},
		update: function() {
			this.parent();
			var d = this.pulseTimer.delta();
			if(d > 0) {
				this.pulseTimer.reset();
			}
			this.currentAnim.alpha = Math.cos(this.pulseTimer.delta() * Math.random() * Math.PI);

		}
	});
});
