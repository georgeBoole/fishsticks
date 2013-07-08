ig.module(
	'game.entities.bg'
).requires(
	'impact.entity'
).defines(function() {
	EntityBg = ig.Entity.extend({
		animSheet: new ig.AnimationSheet('media/bg_small.png', 1000, 800),
		size: {x: 32,y: 32},
		maxVel: {x:1000,y:1000},
		init: function(x,y,settings) {
			this.parent(x,y,settings);
			this.addAnim('idle',1,[0]);
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
