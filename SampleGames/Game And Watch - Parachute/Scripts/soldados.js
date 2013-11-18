var soldados = {
	id: "soldados",

	visible: true,
	
	reiniciar: false,
	gameover: false,
	
	
	delay1: 0,
	delay2: 0,	
	delay3: 0,
	
	muerte1: false,
	muerte2: false,
	muerte3: false,
	
	pausa: false,
	
	puntos: 0,
	apuntos: 0,
	
	
	init: function () {
	},

	update: function (delta) {
	
		/// GAMEOVER Y REINICIO DEL JUEGO
		if (this.gameover == true){
			this.reiniciar = true;
			if (this.reiniciar == true){
				this.delay1 = 0;
				this.delay2 = 0;
				this.delay3 = 0;
				jsGFwk._gameObjects.hud.vida3 = 1;
				jsGFwk._gameObjects.hud.vida2 = 1;
				jsGFwk._gameObjects.hud.vida1 = 1;
				this.puntos = 0;
				this.reiniciar = false;
				this.gameover = false;
			}
		}
		
		
		/// RESETO DE LOS DELTA
		this.delay1 += delta;
		if (this.delay1 > 10000){
			this.delay1 = 0;
		}
		this.delay2 += delta;
		if (this.delay2 > 10000){
			this.delay2 = 0;
		}
		this.delay3 += delta;
		if (this.delay3 > 10000){
			this.delay3 = 0;
		}
		
		/// DIFICULTAD
		if (this.puntos >= 0){
			this.delay1 += 0.025;
			this.delay2 += 0.025;
			this.delay3 += 0.025;			
		}
		
		if (this.puntos >= 20){
			this.delay1 += 0.035;
			this.delay2 += 0.035;
			this.delay3 += 0.035;			
		}
		if (this.puntos >= 50 ){
			this.delay1 += 0.05;
			this.delay2 += 0.05;
			this.delay3 += 0.05;			
		}
		
		//console.log (this.gameover + " " + this.reiniciar);
						
	},

	draw: function (context) {
			
			//soldado de la izquierda
			if (this.delay1 >= 3 && this.delay1 <= 4){
			context.drawImage(jsGFwk.ResourceManager.graphics.sprites.image,
					116, 11, 13, 14,
					192, 30, 13, 14); //sd1			
			}
			if (this.delay1 >= 4 && this.delay1 <= 5){
			context.drawImage(jsGFwk.ResourceManager.graphics.sprites.image,
					114, 30, 17, 24,
					170, 36, 17, 24); //sd2
			}
			if (this.delay1 >= 5 && this.delay1 <= 6){
			context.drawImage(jsGFwk.ResourceManager.graphics.sprites.image,
					106, 63, 23, 26,
					147, 50, 23, 26); //sd3
			}
			if (this.delay1 >= 6 && this.delay1 <= 7){
			context.drawImage(jsGFwk.ResourceManager.graphics.sprites.image,
					106, 97, 25, 28,
					135, 65, 25, 28); //sd4
			}
			if (this.delay1 >= 7 && this.delay1 <= 8){
					context.drawImage(jsGFwk.ResourceManager.graphics.sprites.image,
					109, 133, 28, 28,
					135, 90, 28, 28); //sd5
					if (jsGFwk._gameObjects.barco.contador == 2){
							this.puntos = this.puntos + 1;
							this.delay1 = 0;
					}else{
						if (jsGFwk._gameObjects.hud.vida3 == 1){
							jsGFwk._gameObjects.hud.vida3 = 0;						
						}else{
							if(jsGFwk._gameObjects.hud.vida2 == 1){
								jsGFwk._gameObjects.hud.vida2 = 0;
							}else{
								jsGFwk._gameObjects.hud.vida1 = 0;
								this.gameover = true;
							}
							
						}
						
						this.delay1 = 0;
						
					}
					
			}
						
			
			//soldado del medio		
			
			if (this.delay2 >= 4 && this.delay2 <= 5){
			context.drawImage(jsGFwk.ResourceManager.graphics.sprites.image,
					80, 12, 14, 15,
					180, 18, 14, 15); //sm1
			}
			if (this.delay2 >= 5 && this.delay2 <= 6){
			context.drawImage(jsGFwk.ResourceManager.graphics.sprites.image,
					75, 36, 21, 16,
					155, 20, 21, 16); //sm2
			}
			if (this.delay2 >= 6 && this.delay2 <= 7){			
			context.drawImage(jsGFwk.ResourceManager.graphics.sprites.image,
					72, 62, 18, 33,
					135, 25, 18, 33); //sm3
			}
			if (this.delay2 >= 7 && this.delay2 <= 8){
			context.drawImage(jsGFwk.ResourceManager.graphics.sprites.image,
					66, 99, 23, 28,
					110, 45, 23, 28); //sm4
			}
			if (this.delay2 >= 8 && this.delay2 <= 9){
			context.drawImage(jsGFwk.ResourceManager.graphics.sprites.image,
					69, 135, 24, 29,
					95, 60, 24, 29); //sm5
			}
			if (this.delay2 >= 9 && this.delay2 <= 10){
			context.drawImage(jsGFwk.ResourceManager.graphics.sprites.image,
					68, 172, 28, 29,
					87, 90, 28, 29); //sm6
					if (jsGFwk._gameObjects.barco.contador == 1){
						this.puntos = this.puntos + 1;
						this.delay2 = 0;
					}else{if (jsGFwk._gameObjects.hud.vida3 == 1){
							jsGFwk._gameObjects.hud.vida3 = 0;						
						}else{
							if(jsGFwk._gameObjects.hud.vida2 == 1){
								jsGFwk._gameObjects.hud.vida2 = 0;
							}else{
								jsGFwk._gameObjects.hud.vida1 = 0
								this.gameover = true;
							}
							
						}
						this.delay2 = 0;
					}
		
			}
			
			//soldado de la izquierda
			
			if (this.delay3 >= 5 && this.delay3 <= 6){
			context.drawImage(jsGFwk.ResourceManager.graphics.sprites.image,
					45, 11, 14, 15,
					175, 2, 14, 15); //si1
			}
			if (this.delay3 >= 6 && this.delay3 <= 7){
			context.drawImage(jsGFwk.ResourceManager.graphics.sprites.image,
					43, 37, 20, 17,
					150, 5, 20, 17); //si2
			}
			if (this.delay3 >= 7 && this.delay3 <= 8){
			context.drawImage(jsGFwk.ResourceManager.graphics.sprites.image,
					36, 64, 22, 26,
					120, 10, 22, 26); //si3
			}
			if (this.delay3 >= 8 && this.delay3 <= 9){
			context.drawImage(jsGFwk.ResourceManager.graphics.sprites.image,
					33, 100, 17, 31,
					100, 15, 17, 31); //si4
			}
			if (this.delay3 >= 9 && this.delay3 <= 10){
			context.drawImage(jsGFwk.ResourceManager.graphics.sprites.image,
					30, 137, 22, 27,
					75, 35, 22, 27); //si5
			}
			if (this.delay3 >= 10 && this.delay3 <= 11){
			context.drawImage(jsGFwk.ResourceManager.graphics.sprites.image,
					27, 173, 26, 27,
					50, 60, 26, 27); //si6
			}
			if (this.delay3 >= 11 && this.delay3 <= 12){
			context.drawImage(jsGFwk.ResourceManager.graphics.sprites.image,
					31, 210, 28, 28,
					35, 90, 28, 28); //si7
					if (jsGFwk._gameObjects.barco.contador == 0){
						this.puntos = this.puntos + 1;
						this.delay3 = 0;
					}else { if (jsGFwk._gameObjects.hud.vida3 == 1){
							jsGFwk._gameObjects.hud.vida3 = 0;						
						}else{
							if(jsGFwk._gameObjects.hud.vida2 == 1){
								jsGFwk._gameObjects.hud.vida2 = 0;
							}else{
								jsGFwk._gameObjects.hud.vida1 = 0
								this.gameover = true;
							}
							
						}
						this.delay3 = 0;
					}
			}
			
				
				
			}
	};
	
