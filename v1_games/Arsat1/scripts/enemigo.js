var enemigo = {
	onInit: function (initializationParameters) {
		this.x = initializationParameters.x;
		this.y = initializationParameters.y;
		this.ySpeed = Math.random() * 2;
		this.isDead = false;
		this.direction = initializationParameters.direction;
		this.deltaCount = 0;
		this.drawPointer = this.flappingDraw;
		this.updatePointer = this.flappingUpdate;
		this.width = 50;
		this.height = 50;		
	},
	
	deadDraw: function (context) {
		context.drawImage(jsGFwk.Sprites.deadVulture.image, 
			this.x, this.y, 50, 50);
	},
	flappingDraw: function (context) {
		if (this.direction !== 1) {
			context.drawImage(jsGFwk.Sprites.flappingVulture.sprite.image, 
				this.x, this.y, 50, 50);
		} else {
			context.drawImage(jsGFwk.Sprites.flappingVultureInverted.sprite.image, 
				this.x, this.y, 50, 50);
		}
	},
	drawPointer: function () { },
	
	deadUpdate: function (delta) {
		this.y+= this.ySpeed;
		this.ySpeed += 0.4;
		if (this.x < -50 || this.x > 640 ||	this.y > 480) {
			this.destroy();
		}
	},
	flappingUpdate: function (delta) {
		this.x += this.direction === 1 ? 1 : - 1;
		this.y += this.ySpeed;
		
		if (!GLOBALS.lost) {
			if (jsGFwk._gameObjects.arsat.isRectColliding(this)) {
				GLOBALS.lives--;
				if (GLOBALS.lives <= 0) {
					GLOBALS.lost = true;
					jsGFwk.ResourceManager.sounds.marcha.audio.pause();
					jsGFwk.ResourceManager.sounds.estratosfera.audio.play();
				}
				this.drawPointer = this.deadDraw;
				this.updatePointer = this.deadUpdate;
				return;
			}
		}
		
		if (this.x < -50 || this.x > 640 ||	this.y > 480) {
			this.destroy();
		}
	},
	updatePointer: function () { },
	
	onUpdate: function (delta) {
		this.updatePointer(delta);
	},
	onDraw: function (context) {
		this.drawPointer(context);
	}
};