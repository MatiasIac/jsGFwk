function enemy(){
	var self = this;

	this.visible = false;
	this.posX = 0;
	this.posY = 0;
	
	var dir = 1,
		show = 0,
		cont = 0,
		topL = 0,
		topR = 0,
		undL = 0,
		undR = 0;
	
	this.initiate = function(x, y){
		self.posX = x;
		self.posY = y;
		self.visible = true;
	};
	
	this.update = function(delta){
		if(self.visible){
			topL = jsGFwk._gameObjects.map.getMatrixCoord(self.posX, self.posY-2);
			undL = jsGFwk._gameObjects.map.getMatrixCoord(self.posX, self.posY+2);
			topR = jsGFwk._gameObjects.map.getMatrixCoord(self.posX+20, self.posY-2);
			undR = jsGFwk._gameObjects.map.getMatrixCoord(self.posX+20, self.posY+2);
			if(topL == 1 || topR == 1 || undL == 0 || undR == 0){
				dir *= -1;
			}
			self.posX += dir;
			
			cont++;
			if(cont>3){
			
				if(dir>0){
					if(show !=0){
						show = 0;
					}
					else{
						show = 1;
					}
				}
				else{
					if(show != 2){
						show = 2;
					}
					else{
						show = 3;
					}
				}
			
				cont = 0;
			}
			if(jsGFwk._gameObjects.map.newArray[Math.floor(self.posY/30)][Math.floor(self.posX/30)] == 0){
				jsGFwk._gameObjects.map.newArray[Math.floor(self.posY/30)][Math.floor(self.posX/30)] = 3;
			}
			if(jsGFwk._gameObjects.map.newArray[Math.floor(self.posY/30)][Math.floor((self.posX+31)/30)] == 3){
				jsGFwk._gameObjects.map.newArray[Math.floor(self.posY/30)][Math.floor((self.posX+31)/30)] = 0;
			}
			if(jsGFwk._gameObjects.map.newArray[Math.floor(self.posY/30)][Math.floor((self.posX-30)/30)] == 3){
				jsGFwk._gameObjects.map.newArray[Math.floor(self.posY/30)][Math.floor((self.posX-30)/30)] = 0;
			}
		}
		else{
			jsGFwk._gameObjects.map.newArray[Math.floor(self.posY/30)][Math.floor(self.posX/30)] = 0;
		}	
	};
	
	this.draw = function(context){
		context.drawImage(jsGFwk.ResourceManager.graphics.enemySprite.image,show*20,0,20,30, self.posX,self.posY,30,30);
	};
	
}