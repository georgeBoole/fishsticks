ig.module(
	'game.entities.shot'
).requires(
	'impact.entity'
).defines(function() {
	var dst = function(x1, y1, x2, y2) {
		return Math.sqrt(Math.pow(x2-x1, 2) + Math.pow(y2-y1, 2));
	}
	EntityShot = ig.Entity.extend({
		animSheet: new ig.AnimationSheet('media/shot.png', 4, 8),
		size: {x: 4,y: 8},
		speed: 1000,
		maxVel: {x:1000,y:1000},
		close_enough: 20,
		OB: 50,
		init: function(x,y,settings) {
			this.parent(x,y,settings);
			this.vel.x = this.speed*Math.cos(this.angle);
			this.vel.y = this.speed*Math.sin(this.angle);
			this.addAnim('idle',1,[0]);
			this.currentAnim.angle = this.angle + Math.PI/2;
		},
		kill: function() {
			this.parent();
		},
		draw: function() {
			this.parent();
		},
		update: function() {
			this.parent();
			if (dst(this.pos.x, this.pos.y, this.target.x, this.target.y) <= this.close_enough ||
				(this.pos.x > ig.system.width || this.pos.x < -this.size.x || this.pos.y > ig.system.height || this.pos.y < -this.size.y)) {
				this.kill();
			}
		}
	});
});
