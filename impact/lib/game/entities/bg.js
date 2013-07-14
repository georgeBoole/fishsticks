ig.module(
	'game.entities.bg'
).requires(
	'impact.entity'
).defines(function() {
	EntityBg = ig.Entity.extend({
		animSheet: new ig.AnimationSheet('media/dynamic_bg.png', 1000, 800),
		size: {x: 32,y: 32},
		maxVel: {x:1000,y:1000},
		init: function(x,y,settings) {
			this.parent(x,y,settings);
			this.addAnim('idle',20,[0,1,2,3,4,5,6,7,8,9,9,10,10,11,11,11,9,6,3]);
		},
		kill: function() {
			this.parent();
		},
		draw: function() {
			this.parent();
		},
		update: function() {
			this.parent();
		}
	});
});
