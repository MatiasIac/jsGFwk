var player = {
	id: "player",
	visible: true,
	x: 10,
	y: 10,
	width: 40,
	height: 32,
	
	areaRecorteX: 40,
	
	disparoIntervalo: 0.5,
	disparoTimer: null,
	
	velX: 0,
	velY: 0,
	friccion: 0.95,
	velocidad: 20,
	
	init: function () {
		var self = this;
		
		self.disparoTimer = new jsGFwk.Timer({
			action: function () {
				
				jsGFwk._gameObjects.bala.cloneObject({ x: self.x + 25, y: self.y + 15});
				jsGFwk.ResourceManager.sounds.disparo.audio.play();
				
			}, tickTime: self.disparoIntervalo
		});
	},
	
	update: function (delta) {
		//D
		if (jsGFwk.IO.keyboard._activeKey[68]) { 
			if (this.velX < this.velocidad) {
				this.velX++;
			}
		}
		
		//A
		if (jsGFwk.IO.keyboard._activeKey[65]) { 
			if (this.velX > -this.velocidad) {
				this.velX--;
			}
		}
		
		//W
		if (jsGFwk.IO.keyboard._activeKey[87]) { 
			this.areaRecorteX = 0;
			if (this.velY > -this.velocidad) {
				this.velY--;
			}
		}
		
		//S
		if (jsGFwk.IO.keyboard._activeKey[83]) {
			this.areaRecorteX = 80;
			if (this.velY < this.velocidad) {
				this.velY++;
			}
		}
		
		if (!jsGFwk.IO.keyboard._activeKey[83] && !jsGFwk.IO.keyboard._activeKey[87]) {
			this.areaRecorteX = 40;
		}
		
		//SPACEBAR
		if (jsGFwk.IO.keyboard._activeKey[32]) {
			this.disparoTimer.tick(delta);
		}
		
		this.velY *= this.friccion;
		this.y += this.velY;
		this.velX *= this.friccion;
		this.x += this.velX;
	},
	draw: function (context) {
		context.save();			
			context.drawImage(jsGFwk.ResourceManager.graphics.nave.image,
				this.areaRecorteX, 0, 40, 32,
				this.x, this.y, this.width, this.height);
		context.restore();
	}
};