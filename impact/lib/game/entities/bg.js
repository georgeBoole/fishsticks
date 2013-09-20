ig.module(
	'game.entities.bg'
).requires(
	'impact.entity',
	'game.entities.stars'
).defines(function() {
	EntityBg = ig.Entity.extend({
		animSheet: new ig.AnimationSheet('media/dynamic_bg.png', 1000, 800),
		size: {x: 32,y: 32},
		maxVel: {x:1000,y:1000},
		starHeight: 500,
		starNumber: 70,
		init: function(x,y,settings) {
			this.parent(x,y,settings);
			this.addAnim('idle',20,[0,1,2,3,4,5,6,7,8,9,9,10,10,11,11,11,9,7,3]);
		},
		spawnStars: function(left,right,top,bottom,starNumber) {
			for(var i = 0; i < starNumber; i ++) {
				var starX = left + Math.floor(Math.random() * right);
				var starY = top + Math.floor(Math.random() * bottom);
				ig.game.spawnEntity(EntityStars,starX,starY,{});
			}
		},
		kill: function() {
			this.parent();
		},
		draw: function() {
			this.parent();
		},
		update: function() {
			this.parent();
			if(this.currentAnim.frame > 7 && ig.game.getEntitiesByType(EntityStars).length === 0){
				this.spawnStars(0,ig.system.width,0,this.starHeight,this.starNumber);
			} else if(this.currentAnim.frame < 7) {
				stars = ig.game.getEntitiesByType(EntityStars);
				stars.forEach(function(star) {
					star.kill();
				});
			}
		}
	});
});
