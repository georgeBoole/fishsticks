ig.module(
	'game.entities.track'
).requires(
	'impact.entity'
).defines(function() {
	EntityTrack = ig.Entity.extend({
		animSheet: new ig.AnimationSheet('media/track.png', 1000, 82),
		size: {x: 1000,y: 82},
		maxVel: {x:1000,y:1000},
		init: function(x,y,settings) {
			this.parent(x,y,settings);
			this.addAnim('idle',1,[0]);
			this.zIndex = 100;
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
