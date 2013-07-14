ig.module(
	'game.entities.cartpieces'
).requires(
	'impact.entity'
).defines(function() {
	EntityCartpieces = ig.Entity.extend({
		animSheet: new ig.AnimationSheet('media/cartPieces.png', 23, 23),
		size: {x: 23,y: 23},
		vel:{x: 100, y: 100},
		accel: {x: 100, y: 50},
		maxVel: {x:1000,y:10000},
		init: function(x,y,settings) {
			this.parent(x,y,settings);
			this.animID = settings['animID'] + Math.floor(Math.random() * 4);
			this.addAnim('idle',1,[this.animID]);
			this.accel.x = this.accel.y * Math.cos(this.angleTo(ig.game.getEntitiesByType(EntityPlayer)[0]) * Math.random() * Math.PI);
			this.accel.y = this.accel.y * Math.sin(this.angleTo(ig.game.getEntitiesByType(EntityPlayer)[0]) * Math.random() * Math.PI);
		},
		kill: function() {
			this.parent();
		},
		draw: function() {
			this.parent();
		},
		update: function() {
			this.parent();
			if(this.pos.y > ig.system.height + this.size.y) {
				this.kill();
			}
		}
	});
});
