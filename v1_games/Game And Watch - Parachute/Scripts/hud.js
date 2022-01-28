var hud = {
	id: "hud",

	visible: true,
	
	vida1: 1,
	vida2: 1,
	vida3: 1,

	init: function () {
	},

	update: function (delta) {
	
			
	},

	draw: function (context) {
			
			context.drawImage(jsGFwk.ResourceManager.graphics.sprites.image,
				14, 358, 240, 161,
				0, 0, 240, 161); // fondo
			context.drawImage(jsGFwk.ResourceManager.graphics.sprites.image,
				162, 18, 54, 32,
				186, 0, 54, 32); // helicoptero
			context.drawImage(jsGFwk.ResourceManager.graphics.sprites.image,
				282, 20, 32, 7,
				186, 108, 32, 7); // miss
			if (this.vida1 == 1){
			context.drawImage(jsGFwk.ResourceManager.graphics.sprites.image,
				294, 32, 19, 15,
				221, 120, 19, 15); // vida1
			}	
			if (this.vida2 == 1){
			context.drawImage(jsGFwk.ResourceManager.graphics.sprites.image,
				294, 32, 19, 15,
				202, 120, 19, 15); // vida2
			}
			if (this.vida3 == 1){
			context.drawImage(jsGFwk.ResourceManager.graphics.sprites.image,
				294, 32, 19, 15,
				183, 120, 19, 15); // vida3
			}
			context.fillStyle="Black";
			context.font="8px Arial";
			context.fillText("Rescatados:" + " " + jsGFwk._gameObjects.soldados.puntos,5,15);
			
	},
};
