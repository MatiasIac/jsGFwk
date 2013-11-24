var player = {

	id: "player",
	
	visible: true,
	
	posX: 40,
	
	posY: 14*30,
	
	gravity: 0.6,
	
	force: 0,
	
	lives: 3,
	
	stars: 0,
	
	enemies: 0,
	
	falling: true,
		
	init : function(){
	/*	this.right[0] = {x:0, y:0};
		this.right[1] = {x:30, y:0};
		this.right[2] = {x:0, y:30};
		this.right[3] = {x:30, y:30};
		
		this.left[0] = {x:60, y:60};
		this.left[1] = {x:30, y:60};
		this.left[2] = {x:60, y:90};
		this.left[3] = {x:30, y:90};
	
		this.iddleR[0] = {x:60,y:30};
		this.iddleL[0] = {x:0,y:90};
		
		this.show = this.iddleR;*/
	},
	
	update: function(delta){
		//control de coision por laterales, movimiento lateral
		if(this.visible){
		
			var posL = map.getMatrixCoord(this.posX-1, this.posY-2);
			if(jsGFwk.IO.keyboard._activeKey[37] && posL != 1){this.posX-=5;}
				
			var posR = map.getMatrixCoord(this.posX+31, this.posY-2);
			if(jsGFwk.IO.keyboard._activeKey[39] && posR != 1){this.posX+=5;}
	
			//control de colision con enemigo
			var pos = map.getMatrixCoord(this.posX+15, this.posY-5);
			switch(pos){
				case 2:
					//agarrar estrella
					for(var i = 0; i<jsGFwk._gameObjects.map.starArray.length; i++){
						if((Math.floor(jsGFwk._gameObjects.player.posY/30))+1 == Math.floor(jsGFwk._gameObjects.map.starArray[i].posY/30) && Math.floor(jsGFwk._gameObjects.player.posX/30) == Math.floor(jsGFwk._gameObjects.map.starArray[i].posX/30)){
							jsGFwk._gameObjects.map.starArray[i].visible = false;
							jsGFwk._gameObjects.player.stars++;
						}
					}
					//console.log(Math.floor(jsGFwk._gameObjects.map.starArray[0].posX/30));
					break
				case 3:
					//recibir daño de enemigo
					jsGFwk._gameObjects.player.lives--;
					if(jsGFwk._gameObjects.player.lives >= 1){
						jsGFwk._gameObjects.player.respawn();
					}
					else{
						jsGFwk._gameObjects.player.visible = false;
					}
					break;
				case 4:
					//chocar puerta
					jsGFwk._gameObjects.map.finishLevel();
					break;
				default:
					break;
			}

			
			var posU = jsGFwk._gameObjects.map.getMatrixCoord(this.posX+15,this.posY+1);
			switch(posU){
				case 0:
					//caer
					if(this.force <= 3){this.force += this.gravity;};
					this.posY += this.force;
					break;
				case 1:
					//dejar de caer	
					if(jsGFwk.IO.keyboard._activeKey[38]){
						this.force = -7;
						this.posY--;
					}
					else{
						this.force = 0;
					}
					break;
				case 3:
					//eliminar enemigo
					for(var i = 0; i<jsGFwk._gameObjects.map.enemyArray.length; i++){
						if((Math.floor(jsGFwk._gameObjects.player.posY/30)+1) == Math.floor((jsGFwk._gameObjects.map.enemyArray[i].posY)/30) && Math.floor((jsGFwk._gameObjects.player.posX+15)/30) == Math.floor(jsGFwk._gameObjects.map.enemyArray[i].posX/30)){
							jsGFwk._gameObjects.map.enemyArray[i].visible = false;
						}
					}					
					break;	
			}
		}
	},
	
	draw: function(context){
		context.drawImage(jsGFwk.ResourceManager.graphics.playerSprite.image, 0,0,30,30, this.posX, this.posY, 30,30);
	},
	
	respawn: function(){
		this.posX = 40;
		this.posY = 14*30;
	},
	
}