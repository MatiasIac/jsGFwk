var fondo = {
	id: "fondo",
	visible: true,
	gameA: true,
		
	getCurrentGameTypeSprite: function(context) {
		if (jsGFwk._gameObjects.fondo.gameA){
			context.drawImage(jsGFwk.ResourceManager.graphics.sprites.image, 209, 19, 24, 6, 210, 0, 24, 6);
		} else {
			context.drawImage(jsGFwk.ResourceManager.graphics.sprites.image, 209, 27, 24, 6, 210, 0, 24, 6);
		}
	},
	
	init: function () {
	},
	
	update: function (delta) {
	
	},

	draw: function (context) {
		context.drawImage(jsGFwk.ResourceManager.graphics.sprites.image,
			218, 209, 240, 136, 0, 0, 240, 136); 
			
		jsGFwk._gameObjects.fondo.getCurrentGameTypeSprite(context);
					
		context.fillStyle = "Black";
		context.font = "8px Arial";
		context.fillText("Puntos: " + jsGFwk._gameObjects.controlador.puntos, 5, 6);
	},
};
