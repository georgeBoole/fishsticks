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
			this.reorient(this.angle);
			this.addAnim('idle',1,[0]);
			this.currentAnim.angle = this.angle + Math.PI/2;
			console.log('firing on ' + this.target);
		},
		kill: function() {
			this.parent();
		},
		draw: function() {
			this.parent();
		},
		update: function() {
			this.parent();
			if (this.distanceTo(this.target) <= this.close_enough ||
				(this.pos.x > ig.system.width || this.pos.x < -this.size.x || this.pos.y > ig.system.height || this.pos.y < -this.size.y)) {
				this.kill();
			}
			else {
				this.reorient(this.angleTo(this.target));
			}
		},
		reorient: function(angle) {
			this.vel.x = this.speed * Math.cos(angle);
			this.vel.y = this.speed * Math.sin(angle);
		}
	});
});
