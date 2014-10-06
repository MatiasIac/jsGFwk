var cuadradito = {
	id: "cuadradito",
	visible: true,
	
	x: 0,
	y: 0,
	width: 50,
	height: 50,
	energia: 1000,
	
	init: function () { 
		jsGFwk.IO.mouse.registerMove(function (coord) {
			jsGFwk._gameObjects.cuadradito.x = coord.x;
			jsGFwk._gameObjects.cuadradito.y = coord.y;
		});
	},
	update: function (delta) {
		//this.x++;
		if (this.isRectColliding(jsGFwk._gameObjects.enemigo)) {
			this.energia -= 1;
		}
	},
	draw: function (context) {
		context.save();	
			context.fillStyle = "white";
			
			context.font = "20pt arial";
			context.fillText(this.energia, 10, 40);
			
			context.fillRect(this.x, this.y, 50, 50);
		context.restore();
	}
};