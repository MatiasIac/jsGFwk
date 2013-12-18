var puntaje = 0;
var puntosR1 = 0;
var puntosR2 = 0;
var puntosR3 = 0;

var marcador = {
	id: "marcador",

	visible: true,
	
	datoX: 0,
	datoY: 0,
	radio: 0,
	puntosRonda: 0,

	init: function () {
	
	},

	update: function (delta) {
	
		if (ronda > 3){
			ronda = 1;
			puntosR1 = 0;
			puntosR2 = 0;
			puntosR3 = 0;
		}
		switch (ronda){
			case 1: puntosR1 = this.puntosRonda;
			break
			case 2: puntosR2 = this.puntosRonda;
			break
			case 3: puntosR3 = this.puntosRonda;
			break
		}
		
	//console.log(ronda);
	
	},

	draw: function (context) {
		
		//blanco
		context.fillStyle = "000000";
		context.strokeRect(312.5,92.5,100,100);
		context.fillStyle="FF9D00";
		context.fillRect(312.5,92.5,100,100);
		
		context.fillStyle="0000FF";
		context.beginPath();
		context.arc(362.5,142.5,50,0,2*Math.PI);
		context.fill();
		
		context.fillStyle="FF0000";
		context.beginPath();
		context.arc(362.5,142.5,30,0,2*Math.PI);
		context.fill();
		
		context.fillStyle="F3FF00";
		context.beginPath();
		context.arc(362.5,142.5,10,0,2*Math.PI);
		context.fill();
		
		
		context.drawImage(jsGFwk.ResourceManager.graphics.sprites.image,
			0, 0, 30, 50,
			20, 200, 30, 50);
			
		if (this.datoX != 0){
				context.fillStyle = "000000";
				context.font = "10px Arial Black";
				context.fillText("X", this.datoX, this.datoY);
		}
	},

	calculoPosicion: function(x, y) {
		this.datoX = 302.5 - ((x/40)*100);
		this.datoY = 192.5 - (y*100);
		this.radio = Math.sqrt(Math.pow((this.datoX - 362.5), 2) + Math.pow((this.datoY - 142.5), 2));
		this.calculoPuntos(this.radio);
	},
	
	calculoPuntos: function(radio){
		if (radio <= 10){
			puntaje = 1000;
		}
		else{
			if (radio <= 30){
				puntaje = 500;
			}
			else{
				if (radio <= 50){
					puntaje = 200;
				}
			}
		}
	},
};
