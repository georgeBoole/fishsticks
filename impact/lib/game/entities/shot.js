ig.module(
	'game.entities.shot'
).requires(
	'impact.entity',
	'game.entities.smoke'
).defines(function() {
	EntityShot = ig.Entity.extend({
		//animSheet: new ig.AnimationSheet('media/shot.png', 4, 8),
		animSheet: new ig.AnimationSheet('media/flare.png', 32, 32),
		size: {x: 32,y: 32},
		speed: 5000,
		maxVel: {x:5000,y:5000},
		close_enough: 60,
		OB: 50,
		particle_emit_timer: new ig.Timer(0.04),
		init: function(x,y,settings) {
			this.parent(x,y,settings);
			this.reorient(this.angle);
			this.addAnim('idle',1.5 / 32.0,[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]);
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
			if(this.particle_emit_timer.delta() > 0) {
				//this.emit();
				this.particle_emit_timer.reset();
			}
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
		},
		emit: function() {
			var settings = {vel: {x: -this.vel.x, y: -this.vel.y}};
			ig.game.spawnEntity(EntitySmoke,this.pos.x,this.pos.y, settings)
		}
	});
});
