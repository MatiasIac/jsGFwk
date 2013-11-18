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
		//Fondo
		context.drawImage(jsGFwk.ResourceManager.graphics.sprites.image,
			218, 209, 240, 136, 0, 0, 240, 136); 
			
		jsGFwk._gameObjects.fondo.getCurrentGameTypeSprite(context);
		
		/*if (this.ran1 != 1){
			context.drawImage(jsGFwk.ResourceManager.graphics.sprites.image,
				68, 22, 21, 32,	3, 8, 21, 32)
		}; //gato1
		
		if (this.timer > 33 && this.timer <= 66 && this.ran1 == 1){
			context.drawImage(jsGFwk.ResourceManager.graphics.sprites.image,
				99, 23, 53, 39,	3, 9, 53, 39);
		} //gato2
		
		context.drawImage(jsGFwk.ResourceManager.graphics.sprites.image,
			14, 304, 20, 16,
			0, 120, 20, 16); //gato2
		*/
			
		context.fillStyle = "Black";
		context.font = "8px Arial";
		context.fillText("Puntos: " + jsGFwk._gameObjects.controlador.puntos, 5, 6);
	},
};
