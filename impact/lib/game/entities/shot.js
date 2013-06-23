ig.module(
	'game.entities.shot'
).requires(
	'impact.entity'
).defines(function() {
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
			if(Math.abs(this.pos.x - this.target.x) < this.close_enough && Math.abs(this.pos.y - this.target.y) < this.close_enough) {
				this.kill();
				console.log("BULLET HIT TARGET");
			} else if(this.pos.x < -this.OB || this.pos.x > ig.system.width + this.OB || this.pos.y < -this.OB || this.pos.y > ig.system.height + this.OB) {
				console.log("BULLET WENT OUT OF BOUNDS");
				this.kill();
			}
		}
	});
});
