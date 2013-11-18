var barco = {
	id: "barco",

	visible: true,
	
	contador: 0,
	
	derecha: false,
	
	izquierda: false,
	
	delay: 0,

	init: function () {
	},

	update: function (delta) {
			
		this.delay += delta;
		
		if (this.delay >= .100){
			if (jsGFwk.IO.keyboard._activeKey[39] && this.contador <= 1){
				this.contador = this.contador + 1;
				this.delay = 0;
			}
					
				
			if (jsGFwk.IO.keyboard._activeKey[37] && this.contador >= 1){
				this.contador = this.contador - 1;
				this.delay = 0;
			}
		}
		
	},

	draw: function (context) {
			
			
			
			if (this.contador == 0){
				context.drawImage(jsGFwk.ResourceManager.graphics.sprites.image,
					7, 249, 41, 25,
					20, 100, 41, 25); // barco 1
			}else { if (this.contador == 1){
						context.drawImage(jsGFwk.ResourceManager.graphics.sprites.image,
							64, 248, 41, 25,
							71, 100, 41, 25); // barco 2
		
			}else {context.drawImage(jsGFwk.ResourceManager.graphics.sprites.image,
						119, 248, 41, 25,
						119, 100, 41, 25); // barco 3
			}}
	},
};
