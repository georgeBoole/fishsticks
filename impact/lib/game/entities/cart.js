ig.module(
	'game.entities.cart'
).requires(
	'impact.entity',
	'game.entities.smoke',
	'game.entities.explosion'
).defines(function() {
	EntityCart = ig.Entity.extend({
		animSheet: new ig.AnimationSheet('media/cartSpriteSheetFlat.png',32,32),
		size: {x:32,y:32},
		dirs: {'left':-1,'right':1},
		points: 5,
		smoke_multiplier: 5,
		smoke_speed: 400,
		accel_magnitude: 100,
		init: function(x,y,settings) {
			this.parent(x,y,settings);
			var animID = Math.floor(Math.random()*5);
			this.points *= animID + 1;
			if(animID === 4) {
				this.addAnim('ticker',0.25,[4,5,6,7,6,5,4]);
			} else {
				this.addAnim('idle',1,[animID]);
			}
			if (this.uuid == undefined) {
				// something is really wrong, assign null
				// should never get here
				//console.log('Cart created without uuid specified');
				this.uuid = null;
			}
		},
		emitSmoke: function(player) {
			console.log(player);
			for(var i = 0; i < this.points*this.smoke_multiplier*3*Math.random(); i++) {
				var nx = Math.random() <= 0.5 ? 1 : -1;
				var ny = Math.random() > 0.2 ? -1 : 1;
				var vx = nx*this.smoke_speed*Math.cos(Math.random()*Math.PI);
				var vy = ny*this.smoke_speed*Math.sin(Math.random()*Math.PI);
				var angle = this.angleTo(player);
				var ax = this.accel_magnitude*Math.cos(angle);
				var ay = this.accel_magnitude*Math.sin(angle);
				var settings = {vel: {x:vx, y: vy}, accel: {x:ax, y:ay}};
				ig.game.spawnEntity(EntitySmoke,this.pos.x,this.pos.y,settings);
			}
		},
		explode: function() {
			ig.game.spawnEntity(EntityExplosion,this.pos.x - 16,this.pos.y - 16,{});
		},
		kill: function(player) {
			if(this.points > 20) {
				this.explode();
				this.emitSmoke(player);
			}
			this.parent();
		},
		draw: function() {
			this.parent();
		},
		update: function() {
			this.parent();
			//kills cart if it goes off screen
			if((this.vel.x < 0 && this.pos.x < -this.size.x) || (this.vel.x > 0 && this.pos.x > ig.system.width + this.size.x)) {
				this.points = 0;
				this.kill();
			}
		}
	});
});