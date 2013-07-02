ig.module(
	'game.entities.player'
).requires(
	'impact.entity',
	'impact.font'
).defines(function() {
	EntityPlayer = ig.Entity.extend({
		animSheet: new ig.AnimationSheet('media/playerSpriteSheet.png',32,32),
		size: {x:32,y:32},
		name: 'John Doe',
		slot: undefined,
		kills: 0,
		score: 0,
		color: null,
		init: function(x,y,settings){
			this.parent(x,y,settings);
			this.addAnim('idle',1,[this.color]);
		},
		kill: function() {
			this.parent();
		},
		draw: function() {
			this.parent();
			ig.game.big_font.draw(this.name, this.pos.x + this.size.x / 2, this.pos.y - (this.size.y * 2.0), ig.Font.ALIGN.CENTER);
			ig.game.big_font.draw(this.score, this.pos.x + this.size.x / 2, this.pos.y - (this.size.y * 2.0) - 20, ig.Font.ALIGN.CENTER);
		},
		update: function() {
			this.parent();
		}
	});
});