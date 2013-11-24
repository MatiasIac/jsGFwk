/*
aqui se representara la cantidad de vidas que le quedan al personaje, 
el nivel en el que se encuentra, y la cantidad de estrellas recogidas
*/

var hud = {
	id:"hud",
	
	visible: true,
		
	draw: function(context){
		context.fillStyle="#FFFFFF";
		context.font="15px Georgia";
		context.fillText("Vidas: "+jsGFwk._gameObjects.player.lives,100,10);
		context.fillText("Nivel: "+jsGFwk._gameObjects.map.level,200,10);
		context.fillText("Estrelas: "+jsGFwk._gameObjects.player.stars+"/3",0,10);	
	}
}