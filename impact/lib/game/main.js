ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
	'game.api.client'
)
.defines(function(){

AngryMiner = ig.Game.extend({
	font: new ig.Font( 'media/gilSans.png'),
	big_font: new ig.Font( 'media/big_font.png' ),
	players: [],
	status: null,
	init: function() {
		this.initPlayer();
		this.initInput();
	},
	initInput: function() {
		ig.input.bind(ig.KEY.MOUSE1, 'shoot');
		ig.input.initMouse();
	},
	initPlayer: function() {
		this.local_player = prompt('Enter your name:');
		initializeLocalPlayer(this.local_player);
	},
	switchStatus: function() {
		var ents = ig.game.entities;
	},
	update: function() {
		var status = getConnectionStatus();
		if (status == 'G') {
			this.parent();
			if (ig.input.pressed('shoot')) {
				requestShot(this.local_player, ig.input.mouse.x, ig.input.mouse.y);
			}
		}
		this.status = status;
	},
	draw: function() {
		if (this.status == 'G') {
			this.parent();
		}
		else if (this.status == 'R') {
			this.big_font.draw('LOGON FAILED! (try again later)', (ig.system.width / 2) - 64, ig.system.height/2, ig.Font.ALIGN.CENTER);
		}
		else if (this.status == 'Y') {

		}
	}
});

ig.main( '#canvas', AngryMiner, FPS, WIDTH, HEIGHT, SCALE);

});
