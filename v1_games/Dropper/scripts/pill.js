var pill = {
	x: 0, y: 0, aliveTimer: {}, pillType: 0,
	aliveCounter: 100, pillImage: {},
	aliveTimerTick: 0.1, pillBlink: false,
	
	onInit: function (parameters) {
		this.x = parameters.x;
		this.y = parameters.y;
		this.pillType = parameters.pillType;
		
		this.pillImage = this.pillType === 1 ? jsGFwk.Sprites.greenPill.image : {};
		this.pillImage = this.pillType === 2 ? jsGFwk.Sprites.redPill.image : this.pillImage;
		this.pillImage = this.pillType === 3 ? jsGFwk.Sprites.orangePill.image : this.pillImage;
		
		var self = this;
		this.aliveTimer = new jsGFwk.Timer({
			action: function () {
				self.pillBlink = !self.pillBlink;
				self.aliveCounter--;
				if (self.aliveCounter <= 10) {
					self.destroy();
				}
			}, tickTime: self.aliveTimerTick
		});
	},
	onUpdate: function (delta) {
		this.aliveTimer.tick(delta);
		
		var collide = jsGFwk.Collisions._disColliding.call(
			{x: this.x + 13, y: this.y + 13, 
				radius: 20, center: { x: 10, y: 10}},
			{x: jsGFwk._gameObjects.player.asterX, 
			 y: jsGFwk._gameObjects.player.asterY,
			 radius: jsGFwk._gameObjects.player.asterRad, 
			 center: { 
				x: jsGFwk._gameObjects.player.asterRad / 2, 
				y: jsGFwk._gameObjects.player.asterRad / 2}
			});
	
		if (collide) {
			jsGFwk._gameObjects.player.pillEaten(this.pillType, this.aliveCounter);
			this.destroy();
		}
	},
	onDraw: function (context) {
		context.save();
			if (this.pillBlink) {
				context.drawImage(this.pillImage, this.x, this.y);
			}
		context.restore();
	}
};