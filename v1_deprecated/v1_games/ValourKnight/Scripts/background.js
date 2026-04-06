var background = {
	id: "background",
	zOrder: 0,
	visible: true,
	
	init: function () {	},
	
	update: function (delta) {},
	
	draw: function (context) {
		context.save()
			context.drawImage(jsGFwk.Sprites.floor.spriteBag[1].image, 0, 200);
			
			for (var i = 1; i <= 10; i++) {
				context.drawImage(jsGFwk.Sprites.floor.spriteBag[0].image, 30 * i, 200);
			}
		context.restore();
	}
}