ig.module(
	'game.entities.effect'
).requires(
	'impact.entity',
	'impact.timer'
).defines(function() {
	var rng = function(n) {
		var arr = [];
		for (var i=0; i < n; i++) {
			arr.push(i);
		}
		return arr;
	};
	EntityEffect = ig.Entity.extend({
		animSheet: new ig.AnimationSheet('media/particles1.png',32,32),
		size: {x:32,y:32},
		lifespan: 5, // seconds
		init: function(x,y,settings){
			this.parent(x,y,settings);
			this.addAnim('idle', 32.0 / lifespan,rng(32));
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