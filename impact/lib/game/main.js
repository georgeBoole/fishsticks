ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
	'game.api.factory'
)
.defines(function(){

// wrap the builtins, eventually move this out

var pressed = ig.input.pressed;
var mouse = ig.input.mouse;
var mmap = {'left_click':'mouse1', 'right_click':'mouse2'};

var bind = function(action, event) {
	ig.input.bind(key(action), event);
};
var key = function(k) {
	x = k in mmap ? mmap[k] : k;
	return eval('ig.KEY.' + x.toUpperCase());
};

AngryMiner = ig.Game.extend({
	font: new ig.Font( 'media/04b03.font.png' ),
	init: function() {
		this.initPlayer();
		this.initInput();
	},
	initInput: function() {
		bind('left_click', 'shoot');
		bind('space', 'cart');
		ig.input.initMouse();
	},
	initPlayer: function() {
		this.local_player = prompt('Enter your name:');
		initializeLocalPlayer(this.local_player);
	},
	update: function() {
		this.parent();
		if (pressed('shoot')) {
			requestShot(this.local_player, mouse.x, mouse.y);
		}
	}
});

ig.main( '#canvas', AngryMiner, 60, 320, 240, 2 );

});
