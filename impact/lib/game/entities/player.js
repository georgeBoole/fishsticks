ig.module(
	'game.entities.player'
).requires(
	'impact.entity'
).defines(function() {
	EntityPlayer = ig.Entity.extend({
		animSheet: new ig.AnimationSheet('media/playerSprite.png',32,32),
		size: {x:32,y:32},
		init: function(x,y,settings){
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