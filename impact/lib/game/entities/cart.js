ig.module(
	'game.entities.cart'
).requires(
	'impact.entity',
	'game.entities.smoke',
	'game.entities.explosion'
).defines(function() {
	var SMOKE_COLORS = ['red', 'purple', 'blue', 'green', 'yellow', 'pink', 'pink2', 'brown'];
	var rand_col = function() {
		return SMOKE_COLORS[Math.floor(Math.random() * SMOKE_COLORS.length)];
	};
	EntityCart = ig.Entity.extend({
		animSheet: new ig.AnimationSheet('media/cartSpriteDetailed.png',CART_SIZE.x,CART_SIZE.y),
		size: {x:CART_SIZE.x,y:CART_SIZE.y},
		dirs: {'left':-1,'right':1},
		points: 5,
		smoke_multiplier: 1,
		smoke_speed: 400,
		accel_magnitude: 100,
		maxVel: {x:1024, y:1024},
		init: function(x,y,settings) {
			this.parent(x,y,settings);
			console.log(FPS);
			var animID = Math.floor(Math.random()*5) * 3;
			this.points *= (animID/3) + 1;
			// if(animID === 4) {
			// 	this.addAnim('ticker',0.25,[4,5,6,7,6,5,4]);
			// } else {
			// 	this.addAnim('idle',1,[animID]);
			// }
			// if (this.val == undefined) {
			// 	this.val = 1;
			// }
			this.addAnim('idle', 0.1, [animID, animID + 1, animID + 2]);
		},
		emitSmoke: function(player) {
			//console.log(player);
			var color = rand_col();
			for(var i = 0; i < Math.pow(this.points, 2)*this.smoke_multiplier*Math.random(); i++) {
				var nx = Math.random() <= 0.5 ? 1 : -1;
				var ny = Math.random() > 0.2 ? -1 : 1;
				var vx = nx*this.smoke_speed*Math.cos(Math.random()*Math.PI);
				var vy = ny*this.smoke_speed*Math.sin(Math.random()*Math.PI);
				var angle = this.angleTo(player) + ((Math.random() - 0.5) * Math.PI/2);
				var ax = this.accel_magnitude*Math.cos(angle);
				var ay = this.accel_magnitude*Math.sin(angle);
				var settings = {vel: {x:vx, y: vy}, accel: {x:ax, y:ay}, 'color':color};
				ig.game.spawnEntity(EntitySmoke,this.pos.x,this.pos.y,settings);
			}
		},
		explode: function() {
			ig.game.spawnEntity(EntityExplosion,this.pos.x - 16,this.pos.y - 16,{});
		},
		getShot: function(player) {
			// if(this.points < 20) {
			// 	this.explode();
			// 	this.emitSmoke(player);
			// }
			this.explode();
			this.emitSmoke(player);
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