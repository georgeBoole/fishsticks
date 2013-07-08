ig.module(
	'plugins.progress'
)
.requires(
	'impact.entity'
).defines(function(){ "use strict";

var EntityProgress = ig.Entity.extend({
	color: [0,179,255],
	borderColor: [255,204,0],
	barColor: [51,255,0],
	size: {'x':28, 'y':4},
	margin: 29,
	opacity: .85,
	borderWidth: 1,
	progress: 0.0,
	init: function(x,y,settings) {
		this.parent(x,y,settings);
		this._context = ig.system.context;
	},
	setProgress: function(progress) {
		this.progress = progress;
	},
	updateProgress: function(delta) {
		this.progress += delta;
	},
	draw: function() {
		this._context.save();
		this._context.fillStyle = 'rgba(' + this.color[0] + ',' + this.color[1] + ',' + this.color[2] + ', '+ this.opacity + ')';
		if ( this.borderColor ) {
			this._context.strokeStyle = 'rgba(' + this.borderColor[0] + ',' + this.borderColor[1] + ',' + this.borderColor[2] + ',' + this.opacity + ')';
			this._context.lineWidth = this.borderWidth;
		}
		var x = SCALE * (this.pos.x - ig.game.screen.x);
		var y = SCALE * (this.pos.y - ig.game.screen.y);

		this._context.fillRect(x,y,this.size.x, this.size.y);
		if (this.borderColor) {
			this._context.strokeRect(x,y,this.size.x, this.size.y);
		}
		this._context.fillStyle = 'rgba(' + this.barColor[0] + ','+ this.barColor[1] + ','+ this.barColor[2] + ',' + this.opacity + ')';
		this._context.fillRect(x,y,this.size.x * this.progress, this.size.y);
		this._context.restore();
	}
});
});