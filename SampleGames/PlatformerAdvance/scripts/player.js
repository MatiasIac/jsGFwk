var player = {
	id: "player",
	visible: true,
	x: 10,
	y: 10,
	width: 40,
	height: 47,
	
	velX: 0,
	velY: 0,
	friccion: 0.95,
	velocidad: 20,
	
	init: function () {
		jsGFwk.Sprites.guyRight.reset();
	},
	
	update: function (delta) {
		//D
		if (jsGFwk.IO.keyboard._activeKey[68]) { 
			if (this.velX < this.velocidad) {
				this.velX++;
				jsGFwk.Sprites.guyRight.next();
			}
		}
		
		//A
		if (jsGFwk.IO.keyboard._activeKey[65]) { 
			if (this.velX > -this.velocidad) {
				this.velX--;
			}
		}
		
		var goingDown = true;
		
		jsGFwk._gameObjects.plataforma.eachCloned(function (p) { 
			if (jsGFwk._gameObjects.player.isRectColliding(p)) {
				goingDown = false;
			}
		});
		
		if (goingDown) { 
			if (this.velY < this.velocidad) {
				this.velY++;
			}
		} else { this.velY = 0; }
		
		this.velY *= this.friccion;
		this.y += this.velY;
		this.velX *= this.friccion;
		this.x += this.velX;
	},
	draw: function (context) {
		context.save();			
			context.drawImage(jsGFwk.Sprites.guyRight.sprite.image, this.x, this.y);
		context.restore();
	}
};