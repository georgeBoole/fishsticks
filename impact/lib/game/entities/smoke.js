ig.module(
	'game.entities.smoke'
).requires(
	'impact.entity'
).defines(function() {
	var SMOKE_COLORS = ['red', 'purple', 'blue', 'green', 'yellow', 'pink', 'pink2', 'brown'];
	var rand_col = function() {
		return SMOKE_COLORS[Math.floor(Math.random() * SMOKE_COLORS.length)];
	};
	EntitySmoke = ig.Entity.extend({
		animSheet: new ig.AnimationSheet('media/smoke2.png', 2, 2),
		size: {x: 2,y: 2},
		maxVel: {x: 400, y: 400},
		gravityFactor: 1.2,
		timer: new ig.Timer(0.25),
		init: function(x,y,settings) {
			this.parent(x,y,settings);
			this.addAnim('idle', 1, [0]);
			for (var i = 0; i < SMOKE_COLORS.length; i++) {
				this.addAnim(SMOKE_COLORS[i], 0.15, [0, i+1]);
			}
			if (this.color == undefined) {
				this.color = rand_col();
			}
			this.currentAnim = this.anims[this.color];
		},
		kill: function() {
			this.parent();
		},
		draw: function() {
			
			this.parent();
		},
		update: function() {
			if(this.timer.delta() > 0) {
				this.currentAnim.alpha -= 0.5;
				this.timer.reset();
			}
			var x = this.pos.x;
			var y = this.pos.y;
			if(x > ig.system.width || x < 0 || y < 0 || y > ig.system.height){
				this.kill();
			}
			this.parent();
		},
	});
});
