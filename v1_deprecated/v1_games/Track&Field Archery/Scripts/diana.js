var start = false;
var ronda = 1;

var diana = {
	id: "diana",

	visible: true,
	
	delay: 0,
	x: 420,
	y: 0,
	wind: 0,

	init: function () {
	
	},

	update: function (delta) {
		
		if (jsGFwk.IO.keyboard._activeKey[13] && start == false){
			start = true;
			jsGFwk.ResourceManager.sounds.select.audio.play();
			this.wind = Math.floor(Math.random()*11) - 5;
			}
		
		if (start){
			this.delay += delta;
			if (this.delay >= 1.500){
				this.y ++;
				if (this.y >= 320){
					//start = false;
					jsGFwk._gameObjects.flecha.y = 224;
					jsGFwk._gameObjects.flecha.x = 44;
					jsGFwk.ResourceManager.sounds.reload.audio.play();
					jsGFwk._gameObjects.flecha.flechaActiva = false;
					this.y = 0;
					this.delay = 0;
					flechas --;
					}
			}
		}
	//console.log(flechas);
	
		if (flechas <= 0){
			start = false;
			jsGFwk._gameObjects.marcador.puntosRonda = 0; 
			puntaje = 0;
			ronda ++;
			flechas = 5;
		}
	},

	draw: function (context) {
			
		context.drawImage(jsGFwk.ResourceManager.graphics.sprites.image,
			60, 0, 30, 50,
			this.x, this.y, 30, 50);
			
	},
};
