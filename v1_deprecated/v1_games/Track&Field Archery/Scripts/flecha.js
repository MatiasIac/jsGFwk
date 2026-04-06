var flechas = 5;

var flecha = {
	id: "flecha",

	visible: true,
	flechaActiva: false,
	x: 44,
	y: 224,
	diferencia: 0,
	angulo: 0.0,
	
	init: function () {
	
	},

	update: function (delta) {
	
		//console.log (this.angulo);
		
		if (jsGFwk.IO.keyboard._activeKey[32] && this.flechaActiva == false && start == true && this.x < 45){
			this.angulo += delta;
			if (this.angulo >= 1.00 ){
				this.flechaActiva = true;
				jsGFwk._gameObjects.fondo.angulo = this.angulo;
				jsGFwk.ResourceManager.sounds.shoot.audio.play();
			}
		} else{
			if (this.angulo != 0 && this.x < 45){
				this.flechaActiva = true;
				jsGFwk._gameObjects.fondo.angulo = this.angulo;
				jsGFwk.ResourceManager.sounds.shoot.audio.play();
			}
		}
		
		if (this.flechaActiva){
			this.x +=5;
			this.y -= jsGFwk._gameObjects.diana.wind*0.05;
		}

		if (this.x >= 435){
			
			if (this.x >= 480){
					flechaActiva = false;
					//jsGFwk.ResourceManager.sounds.hit.audio.play();
					this.x = 480;
					this.y += jsGFwk._gameObjects.diana.wind*0.05;
					this.angulo = 0;
				}
			else{
				if (this.y >= (jsGFwk._gameObjects.diana.y + 5) && this.y <= (jsGFwk._gameObjects.diana.y + 40)){
					//jsGFwk.ResourceManager.sounds.hit.audio.play();
					this.flechaActiva = false;
					this.diferencia = jsGFwk._gameObjects.diana.y - this.y;
					this.y = jsGFwk._gameObjects.diana.y - this.diferencia;
					jsGFwk._gameObjects.marcador.calculoPosicion(this.diferencia, this.angulo);
					//console.log(this.diferencia);
					this.y ++;
					if (this.y >= 320 - this.diferencia){
						this.flechaActiva = false;
						jsGFwk._gameObjects.marcador.puntosRonda += puntaje;
						jsGFwk.ResourceManager.sounds.reload.audio.play();
						this.y = 224;
						this.x = 44;
						this.angulo = 0;
					}
				}
			}
		}
	},

	draw: function (context) {
			
		context.drawImage(jsGFwk.ResourceManager.graphics.sprites.image,
			30, 0, 30, 50,
			this.x - 24, this.y -24, 30, 50);
		for(var i = 0; i < flechas; i++){
			context.drawImage(jsGFwk.ResourceManager.graphics.sprites.image,
			42, 22, 12, 5, 59, 125 + i*10, 12, 5);
		}
			
	},
	
};