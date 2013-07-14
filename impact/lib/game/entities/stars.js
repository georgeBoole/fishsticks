ig.module(
	'game.entities.stars'
).requires(
	'impact.entity'
).defines(function() {
	EntityStars = ig.Entity.extend({
		animSheet: new ig.AnimationSheet('media/starsprite.png', 6, 6),
		size: {x: 6,y: 6},
		maxVel: {x:1000,y:1000},
		init: function(x,y,settings) {
			this.parent(x,y,settings);
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
