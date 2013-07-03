ig.module(
	'game.entities.cart'
).requires(
	'impact.entity',
	'game.entities.smoke',
	'game.entities.explosion'
).defines(function() {
	EntityCart = ig.Entity.extend({
		animSheet: new ig.AnimationSheet('media/cartSpriteSheetLargeFlat.png',CART_SIZE.x,CART_SIZE.y),
		size: {x:CART_SIZE.x,y:CART_SIZE.y},
		dirs: {'left':-1,'right':1},
		points: 5,
		smoke_multiplier: 25,
		smoke_speed: 400,
		accel_magnitude: 100,
		maxVel: {x:1024, y:1024},
		init: function(x,y,settings) {
			this.parent(x,y,settings);
			var animID = Math.floor(Math.random()*5);
			this.points *= animID + 1;
			if(animID === 4) {
				this.addAnim('ticker',0.25,[4,5,6,7,6,5,4]);
			} else {
				this.addAnim('idle',1,[animID]);
			}
			if (this.val == undefined) {
				this.val = 1;
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
		getShot: function(player) {
			if(this.points < 20) {
				this.explode();
				this.emitSmoke(player);
			}
			this.kill();
		},
		draw: function() {
			this.parent();
		},
		update: function() {
			this.parent();
			if (this.pos.x < -3*WIDTH || this.pos.x > 3*WIDTH) {
				this.kill();
			}
		}
	});
});