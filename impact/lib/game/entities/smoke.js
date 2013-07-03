ig.module(
	'game.entities.smoke'
).requires(
	'impact.entity'
).defines(function() {
	EntitySmoke = ig.Entity.extend({
		animSheet: new ig.AnimationSheet('media/smoke.png', 2, 2),
		size: {x: 2,y: 2},
		maxVel: {x: 400, y: 400},
		gravityFactor: 1.2,
		timer: new ig.Timer(0.25),
		init: function(x,y,settings) {
			
			if(Math.random() > 0.5) {
				this.addAnim('idle',1,[0]);
				
			} else {
				this.addAnim('fire',0.1,[0,1]);
			}
			this.parent(x,y,settings);
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
