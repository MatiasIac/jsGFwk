var fondo = {
	id: "fondo",

	visible: true,
	angulo: 0.0,

	init: function () {
	
	},

	update: function (delta) {
	
	//console.log (muertes);
	
	},

	draw: function (context) {
		
		//fondo
		context.fillStyle ="84F0EB";
		context.fillRect(0,0,480, 100);
		context.fillStyle = "34FF19";
		context.fillRect(0,110,480,300);
		
		//tablero inferior
		context.fillStyle = "000000";
		context.strokeRect(15,300,400,75);
		context.fillStyle ="88D7DB";
		context.fillRect(15,300,400,75);
		context.fillStyle = "000000";
		context.fillRect(20,305,390,65);
		context.fillStyle ="FFFFFF";
		context.font = "15px Arial";
		context.fillText("1sttry" + "     " + puntosR1,300,335);
		context.fillText("2sttry" + "     " + puntosR2,300,350);
		context.fillText("3sttry" + "     " + puntosR3,300,365);
		context.fillStyle="BC0404";
		context.fillText("Qualify", 350, 320);
		
		//tablero superior
		context.fillStyle = "000000";
		context.strokeRect(15,5,400,85);
		context.fillStyle="FF9D00";
		context.fillRect(15,5,400,85);
		context.fillStyle = "000000";
		context.fillRect(20,10,390,75);
		context.fillStyle ="FFFFFF";
		context.font = "15px Arial";
		context.fillText("Press ENTER to Start the round",30,30);
		context.fillText("Press SPACE to shoot the arrow",30,50);
		context.fillText("Hold down SPACE to set the angle of shoot",30,70);
		
		//guia de la diana
		context.fillStyle = "000000";
		context.fillRect(420,5,30,370);
		
		//cargador de flechas
		context.fillStyle = "000000";
		context.strokeRect(50,115,30,70);
		context.fillStyle ="88D7DB";
		context.fillRect(50,115,30,70);
		context.fillStyle = "000000";
		context.fillRect(52.5,118.5,25,63);
		
		//viento
		context.fillStyle = "000000";
		context.strokeRect(150,260,150,30);
		context.fillStyle ="88D7DB";
		context.fillRect(150,260,150,30);
		context.fillStyle = "000000";
		context.fillRect(152.5,262.5,145,25);
		context.fillStyle = "FFFFFF";
		context.font = "15px Arial";
		context.fillText("WIND", 160, 280);
		if (jsGFwk._gameObjects.diana.wind >= 0){
			context.fillText("N", 240, 280);
		}
		else{
			context.fillText("S", 240, 280);
		}
		context.fillText(jsGFwk._gameObjects.diana.wind, 270, 280);
		
		//puntaje
		context.fillStyle = "000000";
		context.strokeRect(330,240,80,50);
		context.fillStyle ="88D7DB";
		context.fillRect(330,240,80,50);
		context.fillStyle = "000000";
		context.fillRect(332.5,242.5,75,45);
		context.font = "15px Arial";
		context.fillStyle ="FFFFFF";
		context.fillText("SCORE", 345, 260);
		context.fillText(puntaje, 365, 280);
		
		//angulo
		context.fillStyle = "000000";
		context.strokeRect(230,93,80,50);
		context.fillStyle ="88D7DB";
		context.fillRect(230,93,80,50);
		context.fillStyle = "000000";
		context.fillRect(232.5,95.5,75,45);
		context.font = "15px Arial";
		context.fillStyle ="FFFFFF";
		context.fillText("ANGLE", 245, 110);
		context.fillText(this.angulo*10, 245, 130);
		
		context.drawImage(jsGFwk.ResourceManager.graphics.sprites.image,
			0, 0, 30, 50,
			20, 200, 30, 50);
	},
};
