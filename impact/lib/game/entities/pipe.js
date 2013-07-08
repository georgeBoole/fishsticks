ig.module(
	'game.entities.pipe'
).requires(
	'impact.entity'
).defines(function() {
	EntityPipe = ig.Entity.extend({
		animSheet: new ig.AnimationSheet('media/pipe.png', 1000, 163),
		size: {x: 1000,y: 163},
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
