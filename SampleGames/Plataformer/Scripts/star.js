function star(){
	var self = this;
	
	this.visible = true;
	this.posX = 0;
	this.posY = 0;
	
	this.initiate = function(x,y){
		self.posX = x;
		self.posY = y;
	};
	
	this.update = function(delta){
		if(self.visible){
			jsGFwk._gameObjects.map.newArray[Math.floor(self.posY/30)][Math.floor(self.posX/30)] = 2;
		}
		else{
			jsGFwk._gameObjects.map.newArray[Math.floor(self.posY/30)][Math.floor(self.posX/30)] = 0;
		}
	};
	
	this.draw = function(context){
		if(self.visible){
			context.drawImage(jsGFwk.ResourceManager.graphics.elementsSprite.image, 0,0,100,100, self.posX,self.posY,30,30);
		}
	};
	
}