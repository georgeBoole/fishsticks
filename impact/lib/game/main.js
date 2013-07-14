ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
	'game.api.client',
	'game.entities.cart',
	'game.entities.bg',
	'game.entities.track'
)
.defines(function(){

AngryMiner = ig.Game.extend({
	font: new ig.Font( 'media/gilSans.png'),
	big_font: new ig.Font( 'media/big_font.png' ),
	players: [],
	status: null,
	music1: new ig.Sound('media/music1.mp3',false),
	music2: new ig.Sound('media/music2.mp3',false),
	music3: new ig.Sound('media/music3.mp3',false),
	music4: new ig.Sound('media/music4.mp3',false),
	music5: new ig.Sound('media/music5.mp3',false),
	init: function() {
		this.initPlayer();
		this.initInput();
		this.initBackground();
	},
	initInput: function() {
		ig.input.bind(ig.KEY.MOUSE1, 'shoot');
		ig.input.initMouse();
	},
	initPlayer: function() {
		this.local_player = prompt('Enter your name:');
		initializeLocalPlayer(this.local_player);
	},
	initTracks: function() {
		var base_y = (GALLERY_OFFSETS['x'] * HEIGHT) - 8;
		var gallery_height = (1.0 - (GALLERY_OFFSETS['x'] + GALLERY_OFFSETS['x'])) * HEIGHT;
		var row_height = (gallery_height / NUM_ROWS) - 18;
		for(var i = 0; i < NUM_ROWS; i++) {
			var track_y = base_y + (row_height * i) + i;
			ig.game.spawnEntity(EntityTrack,0,track_y);
		}
	},
	initBackground: function() {
		this.spawnEntity(EntityBg,0,0);
		//this.initTracks();
	},
	switchStatus: function() {
		var ents = ig.game.entities;
	},
	update: function() {
		var status = getConnectionStatus();
		if (status == 'G') {
			this.parent();
			// if (ig.input.pressed('shoot')) {
			// 	var mx = ig.input.mouse.x, my = ig.input.mouse.y;
			// 	var carts = ig.game.getEntitiesByType(EntityCart);
			// 	for (var i = 0; i < carts.length; i++) {
			// 		var cart = carts[i];
			// 		var cx = cart.pos.x, cy = cart.pos.y;
			// 		var cw = cart.size.x, ch = cart.size.y;
			// 		if ((mx >= cx && mx <= (cx + cw)) && (my >= cy && my <= (cy + ch))) {
			// 			requestShot(this.local_player, mx, my);
			// 			break;
			// 		}
			// 	}
				
			// }
			if (ig.input.pressed('shoot')) {
				var now = Date.now() / 1000;
				var mx = ig.input.mouse.x, my = ig.input.mouse.y;
				requestShot(this.local_player, mx, my, now);
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
