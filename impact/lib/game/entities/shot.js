ig.module(
	'game.entities.shot'
).requires(
	'impact.entity'
).defines(function() {
	EntityShot = ig.Entity.extend({
		size: {x:32,y:32},
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