var player = {
	id: "player",
	visible: true,
	x: 10,
	y: 10,
	width: 40,
	height: 32,
	
	areaRecorteX: 40,
	
	disparoAcumulador: 0,
	disparoIntervalo: 0.5,
	
	velX: 0,
	velY: 0,
	friccion: 0.95,
	velocidad: 20,
	
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
		this.disparoAcumulador += delta;
		
		if (jsGFwk.IO.keyboard._activeKey[32]) {
			if (this.disparoAcumulador >= this.disparoIntervalo) {
				jsGFwk._gameObjects.bala.cloneObject({
					x: this.x + 50,
					y: this.y + 20
				});
				this.disparoAcumulador = 0;
			}
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