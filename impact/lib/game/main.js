ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font'
)
.defines(function(){

// wrap the builtins, eventually move this out
bind = ig.input.bind;
key = function(k) {
	return eval('ig.KEY.' + k.toUpperCase());
}

AngryMiner = ig.Game.extend({

	font: new ig.Font( 'media/04b03.font.png' ),
	
	init: function() {
		var name = prompt('Enter your name:');
		this.initInput();
	},
	initInput: function() {
		bind(key('mouse1'), 'shoot');
		bind(key('space'), 'cart');
		ig.input.initMouse();
	},
	update: function() {
		// Update all entities and backgroundMaps
		this.parent();
		
		// Add your own, additional update code here
	},
	
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
		
		
		// Add your own drawing code here
		var x = ig.system.width/2,
			y = ig.system.height/2;
		
		this.font.draw( 'It Works!', x, y, ig.Font.ALIGN.CENTER );
	}
});


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', AngryMiner, 60, 320, 240, 2 );

});
