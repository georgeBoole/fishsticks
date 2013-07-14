ig.module(
	'game.entities.player'
).requires(
	'impact.entity',
	'impact.font',
	'plugins.progress'
).defines(function() {
	EntityPlayer = ig.Entity.extend({
		animSheet: new ig.AnimationSheet('media/playerSpriteSheet.png',32,32),
		size: {x:32,y:32},
		name: 'John Doe',
		slot: undefined,
		kills: 0,
		score: 0,
		color: null,
		zIndex: 100,
		progressOffset:25,
		hasPrize: false,
		testBool: true,
		level_up_sound: new ig.Sound('media/Pickup_Coin.mp3',false),
		init: function(x,y,settings){
			this.parent(x,y,settings);
			this.level_up_sound.volume = 0.1;
			this.addAnim('idle',1,[this.color]);
			this.progress_bar = ig.game.spawnEntity(EntityProgress, x, y);
			this.progress_bar.setProgress(0.5);
		},
		setProgress: function(prog) {
			if(this.progress_bar.progress >= 0.85) {
				//SCORE A COIN LEVEL
				this.level_up_sound.play();
				this.progress_bar.setProgress(0.0);
			} else {
				this.progress_bar.setProgress(prog);
			}
			//this.progress_bar.setProgress(prog); 
			
		},
		moveProgressBar: function() {
			this.progress_bar.pos = {x:this.pos.x ,y:this.pos.y - this.progressOffset};
		},
		kill: function() {
			this.progress_bar.kill();
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