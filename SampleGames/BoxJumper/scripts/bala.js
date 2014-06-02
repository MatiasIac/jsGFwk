var bala = {
	x: 0,
	y: 0,
	width: 6,
	height: 6,
	onInit: function (parameters) {
		this.x = parameters.x;
		this.y = parameters.y;
	},
	onUpdate: function (delta) {
		this.x+= 5;
		
		if (this.x > 640) {
			this.destroy();
		}
		
		if (jsGFwk._gameObjects.enemigo.isRectColliding(this) && 
			!jsGFwk._gameObjects.enemigo.isDestruido) {
			jsGFwk._gameObjects.enemigo.destruido();
			GLOBALS.score += 10;
			this.destroy();
		}
	},
	onDraw: function (context) {
		context.save();
			context.drawImage(jsGFwk.ResourceManager.graphics.nave.image,
				3, 32, 6, 6,
				this.x, this.y, this.width, this.height);
		context.restore();
	}
};