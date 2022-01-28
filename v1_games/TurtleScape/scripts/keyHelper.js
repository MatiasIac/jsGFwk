var keyHelper = {
	id: "keyHelper",
	zOrder: 10,
	visible: true,

	isPressed: false,
	x: 440,
	y: 265,
	width: 133,
	height: 133,
	
	init: function () {	
		this.isPressed = false;
	},
	
	update: function (delta) { },
	
	draw: function (context) { 
		context.save();
			if (!this.isPressed) {
				context.drawImage(jsGFwk.Sprites.redButton.spriteBag[0].image, 440, 265);
			} else {
				context.drawImage(jsGFwk.Sprites.redButton.spriteBag[1].image, 440, 265);
			}
		context.restore();
	}
}