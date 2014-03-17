var metter = {
	id: "metter",
	zOrder: 10,
	visible: true,

	speed: 0,
	barWidth: 0,
	
	init: function () {	},
	
	update: function (delta) { 
		var p = (this.speed * 100) / 6;
		this.barWidth = Math.min((375 * p) / 100, 375);		
	},
	
	draw: function (context) { 
		context.save();
			context.drawImage(jsGFwk.Sprites.metter.spriteBag[0].image, 
				0, 0, this.barWidth, 37,
				11, 341, this.barWidth, 37);
			context.drawImage(jsGFwk.Sprites.metter.spriteBag[1].image, 10, 340);
		context.restore();
	}
}