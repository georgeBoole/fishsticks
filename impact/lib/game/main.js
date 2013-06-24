ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
	'game.api.factory'
)
.defines(function(){

AngryMiner = ig.Game.extend({
	font: new ig.Font( 'media/font.png' ),
	big_font: new ig.Font( 'media/big_font.png' ),
	players: [],
	init: function() {
		this.initPlayer();
		this.initInput();
		makePlayerNames();
	},
	initInput: function() {
		ig.input.bind(ig.KEY.MOUSE1, 'shoot');
		ig.input.initMouse();
	},
	initPlayer: function() {
		this.local_player = prompt('Enter your name:');
		initializeLocalPlayer(this.local_player);
	},
	update: function() {
		this.parent();
		if (ig.input.pressed('shoot')) {
			requestShot(this.local_player, ig.input.mouse.x, ig.input.mouse.y);
		}
	}
});

ig.main( '#canvas', AngryMiner, 60, 640, 480, 1 );

});
