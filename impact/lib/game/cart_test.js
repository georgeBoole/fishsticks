ig.module( 
	'game.carttest' 
)
.requires(
	'impact.game',
	'impact.font',
	'game.api.factory'
)
.defines(function(){

CartTest = ig.Game.extend({
	
	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),
	
	
	init: function() {
		// Initialize your game here; bind keys etc.
		this.initInput();
	}, 
	initInput: function() {
		ig.input.bind(ig.KEY.MOUSE1,'shoot');
		ig.input.bind(ig.KEY.SPACE,'cart');
		ig.input.initMouse();
	},
	update: function() {
		// Update all entities and backgroundMaps
		this.parent();
		if (ig.input.pressed('shoot')) {
			createShot(ig.input.mouse.x, ig.input.mouse.y, {});
			killCart(5);
		}
		if (ig.input.pressed('cart')) {
			createCart(ig.input.mouse.x, ig.input.mouse.y, 'left',20, 5);
		}
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
ig.main( '#canvas', CartTest, 60, 320, 240, 2 );

});
