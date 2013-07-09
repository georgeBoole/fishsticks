ig.module(
	'game.entities.reward'
).requires(
	'impact.entity'
).defines(function() {
	EntityReward = ig.Entity.extend({
		animSheet: new ig.AnimationSheet('media/reward.png', 59, 59),
		size: {x: 59,y: 59},
		maxVel: {x:1000,y:1000},
		init: function(x,y,settings) {
			this.parent(x,y,settings);
			this.addAnim('idle',1,[0]);
			this.zIndex = 150;
		},
		relocate: function(loc) {
			this.pos = {x:loc.x,y:loc.y};
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
