ig.module(
	'game.entities.cursor'
).requires(
	'impact.entity'
).defines(function() {
	EntityCursor = ig.Entity.extend({
		animSheet: new ig.AnimationSheet('media/cursor.png', 64, 64),
		size: {x: 64,y: 64},
		maxVel: {x:1000,y:1000},
		checkAgainst: ig.Entity.TYPE.A,
		lastHit: undefined,
		init: function(x,y,settings) {
			this.parent(x,y,settings);
			this.addAnim('idle',1,[0]);
			this.addAnim('active',1,[1]);
			this.zIndex = 300;
		},
		check: function(other) {
			this.currentAnim = this.anims.active;
			this.lastHit = other;
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
			this.pos.x = mx - this.size.x/3;
			this.pos.y = my - this.size.y/4;
			if(this.currentAnim == this.anims.active && !this.touches(this.lastHit)) {
				this.currentAnim = this.anims.idle;
			}
		}
	});
});
