ig.module(
	'game.entities.cursor'
).requires(
	'impact.entity'
).defines(function() {
	EntityCursor = ig.Entity.extend({
		animSheet: new ig.AnimationSheet('media/cursor.png', 64, 64),
		size: {x: 64,y: 64},
		maxVel: {x:1000,y:1000},
		init: function(x,y,settings) {
			this.parent(x,y,settings);
			this.addAnim('idle',1,[0]);
			this.zIndex = 300;
			
		},
		kill: function() {
			this.parent();
		},
		draw: function() {
			this.parent();
		},
		update: function() {
			this.parent();
			var mx = ig.input.mouse.x, my = ig.input.mouse.y;
			this.pos.x = mx - this.size.x/2;
			this.pos.y = my - this.size.y/2;
		}
	});
});
