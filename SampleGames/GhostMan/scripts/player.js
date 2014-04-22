var player = {
	id: "player",
	zOrder: 1,
	visible: true,
	
	cellX: 0,
	cellY: 0,
	x: 0,
	y: 0,
	
	movingTo: 4,
	finalImage: {},
	
	pacmanDeltaEat: 0,
	pacmanDeltaMovement: 0,
	pacmanSpeedX: 1,
	pacmanSpeedY: 0,
	
	commonSpeed: 6,
	
	init: function () {
		this.cellX = 13;
		this.cellY = 23;
		this.x = 13 * 12;
		this.y = 23 * 12;
		jsGFwk.Sprites.leftPacman.reset();
		jsGFwk.Sprites.rightPacman.reset();
		jsGFwk.Sprites.upPacman.reset();
		jsGFwk.Sprites.downPacman.reset();
	},
	
	convertCoordsToCell: function() {
		this.cellX = parseInt(Math.ceil(this.x / 12));
		this.cellY = parseInt(Math.ceil(this.y / 12));
	},
	
	update: function (delta) {
		this.pacmanDeltaEat += delta;
		this.pacmanDeltaMovement += delta;
		
		var tempSprite;
		
		switch (this.movingTo) {
			case 4:
				tempSprite = jsGFwk.Sprites.leftPacman;
				this.pacmanSpeedX = this.commonSpeed * -1;
				this.pacmanSpeedY = 0;
				break;
			case 8:
				tempSprite = jsGFwk.Sprites.upPacman;
				this.pacmanSpeedX = 0;
				this.pacmanSpeedY = this.commonSpeed * -1;
				break;
			case 6:
				tempSprite = jsGFwk.Sprites.rightPacman;
				this.pacmanSpeedX = this.commonSpeed;
				this.pacmanSpeedY = 0;
				break;
			case 2:
				tempSprite = jsGFwk.Sprites.downPacman;
				this.pacmanSpeedX = 0;
				this.pacmanSpeedY = this.commonSpeed;
				break;
		}
		
		if (this.pacmanDeltaEat > 0.05) {
			this.pacmanDeltaEat = 0;
			tempSprite.next();
		}
		this.finalImage = tempSprite.sprite.image;
		
		if (this.pacmanDeltaMovement > 0.02) {
			this.pacmanDeltaMovement = 0;
			this.x += this.pacmanSpeedX;
			this.y += this.pacmanSpeedY;
			this.convertCoordsToCell.call(this);
		}
	},
	
	draw: function (context) { 
		context.save();
			context.drawImage(this.finalImage, this.x, this.y);
		context.restore();
	}
}