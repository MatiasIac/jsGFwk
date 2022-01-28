var shark = {
	id: "shark",

	visible: true,

	delay1: 0,
	delay2: 0,
	
	init: function () {
	},

	update: function (delta) {
	
	//console.log (this.delay1 + " " + this.delay2);
	
	this.delay1 += delta;
	if (this.delay1 > 10000){
			this.delay1 = 0;
		}
	
	this.delay2 += delta;
	if (this.delay2 > 10000){
			this.delay2 = 0;
		}
		
			
	},

	draw: function (context) {
			
			//shark
			if (this.delay1 >= 10 && this.delay1 <= 11){
			context.drawImage(jsGFwk.ResourceManager.graphics.sprites.image,
				135, 192, 10, 8,
				130, 125, 10, 8); // shark1
			}	
			if (this.delay1 >= 11 && this.delay1 <= 12){	
			context.drawImage(jsGFwk.ResourceManager.graphics.sprites.image,
				176, 191, 10, 8,
				80, 125, 10, 8); // shark2
			}	
			if (this.delay1 >= 12 && this.delay1 <= 13){	
			context.drawImage(jsGFwk.ResourceManager.graphics.sprites.image,
				112, 213, 11, 9,
				50, 142, 11, 9); // shark3
			}
			if (this.delay1 >= 13 && this.delay1 <= 14){	
			context.drawImage(jsGFwk.ResourceManager.graphics.sprites.image,
				147, 211, 12, 10,
				97, 142, 12, 10); // shark4
			}
			if (this.delay1 >= 14 && this.delay1 <= 15){	
			context.drawImage(jsGFwk.ResourceManager.graphics.sprites.image,
				189, 202, 37, 20,
				145, 134, 37, 20); // shark5	
			}
			if (this.delay1 >= 16){
					this.delay1 = 0;
				}
			
			
			//soldado ahogandose
			if(jsGFwk._gameObjects.soldados.delay1 >= 8 && jsGFwk._gameObjects.barco.contador != 2){
				
				if (this.delay2 >= 0 && this.delay2 <= 1){
				context.drawImage(jsGFwk.ResourceManager.graphics.sprites.image,
					26, 296, 30, 12,
					145, 123, 30, 12); // smuerto
				}
				if (this.delay2 >= 1 && this.delay2 <= 2){	
				this.delay1 = 10;	
				context.drawImage(jsGFwk.ResourceManager.graphics.sprites.image,
					72, 294, 30, 13,
					95, 125, 30, 13); // smuerto1
				}
				if (this.delay2 >= 2 && this.delay2 <= 3){	
				context.drawImage(jsGFwk.ResourceManager.graphics.sprites.image,
					116, 290, 30, 15,
					45, 125, 30, 15); // smuerto2
				}
				if (this.delay2 >= 3 && this.delay2 <= 4){	
				context.drawImage(jsGFwk.ResourceManager.graphics.sprites.image,
					20, 324, 19, 10,
					70, 142, 18, 12); // smuerto3
				}
				if (this.delay2 >= 4 && this.delay2 <= 5){	
				context.drawImage(jsGFwk.ResourceManager.graphics.sprites.image,
					77, 322, 18, 12,
					117, 142, 18, 12); // smuerto4
				}
				if (this.delay2 >= 5 && this.delay2 <= 6){	
				context.drawImage(jsGFwk.ResourceManager.graphics.sprites.image,
					129, 317, 17, 17,
					185, 137, 17, 17); // smuerto5
				}
			}	
			
			
	},
};
