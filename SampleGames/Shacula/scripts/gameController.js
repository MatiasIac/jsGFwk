var gameController = {
	id: 'gameController',
	visible: false,
	init: function () {
		jsGFwk.Container.createContainer("container", {
			width: 30, height: 30,
			onInit: function (initializationParameters) {
				this.x = initializationParameters.x;
				this.y = initializationParameters.y;
				this.wallImage = initializationParameters.image;
				this.tileType = initializationParameters.tileType;
				
				if (this.tileType === 4) {
					//Spikes
					this.height = 7;
					this.spikeAcc = 0;
					this.spikeWait = initializationParameters.initTime;
					this.spikePos = 0;
					jsGFwk.Sprites.spike.reset();
					this.onUpdate = this.onSpikeUpdate;
					this.onDraw = this.onSpikeDraw;
				} else if (this.tileType === 3) {
					//Doors
					this.actionRelated = initializationParameters.action;
					this.doorAcc = 0;
					this.doorWait = 0.1;
					this.doorEnds = this.y - 30;
				} else if (this.tileType >= 7 && this.tileType <= 50) {
					//Lever action
					this.leverStatus = 0;
					this.onUpdate = this.onLeverUpdate;
					this.onDraw = this.onLeverDraw;
				} else if (this.tileType === 100) {
					//Power up
					this.powerUpPointer = 0;
					this.powerUpAcc = 0;
					this.powerUpWait = 0.2;
					this.height = 30;
					this.width = 12;
					this.onUpdate = this.onPowerUpUpdate;
					this.onDraw = this.onPowerUpDraw;
				}
			},
			
			onPowerUpUpdate: function (delta) {
				if (jsGFwk._gameObjects.dracul.isRectColliding(this)) {
					jsGFwk._gameObjects.dracul.minRadiusLight += 20;
					jsGFwk._gameObjects.dracul.maxRadiusLight += 20;
					this.destroy();
				}
			
				this.powerUpAcc += delta;
				if (this.powerUpAcc >= this.powerUpWait) {
					this.powerUpAcc = 0;
					this.powerUpPointer++;
					if (this.powerUpPointer >= jsGFwk.Sprites.powerUp.spriteBag.length) {
						this.powerUpPointer = 0;;
					}
				}
			},
			onPowerUpDraw: function (context) {
				context.save();
					context.drawImage(jsGFwk.Sprites.powerUp.spriteBag[this.powerUpPointer].image,
						this.x, this.y);
				context.restore();
			},
			
			onDoorUpdate: function (delta) {
				this.doorAcc += delta;
				if (this.doorAcc >= this.doorWait) {
					this.doorAcc = 0;
					this.y--;
					if (this.y <= this.doorEnds) { this.destroy(); }
				};
			},
			triggerUp: function () {
				this.onUpdate = this.onDoorUpdate;
			},
			
			onLeverUpdate: function (delta) { },
			onLeverDraw: function (context) {
				context.save();
					context.drawImage(jsGFwk.Sprites.lever.spriteBag[this.leverStatus].image,
						this.x, this.y);
				context.restore();
			},
			
			onSpikeUpdate: function (delta) {
				this.spikeAcc += delta;
				if (this.spikeAcc >= this.spikeWait) {
					this.spikeAcc = 0;
					this.spikePos++;
					if (this.spikePos > 1) { this.spikePos = 0; }
				}
				
				if (this.spikePos === 0) {
					//Kill vamp if is in me
					if (jsGFwk._gameObjects.dracul.isRectColliding({ 
						width: this.width, height: this.height,
						x: this.x, y: this.y + 23})) {
						jsGFwk._gameObjects.dracul.kill();
					}
				}
			},
			onSpikeDraw: function (context) {
				context.save();
					context.drawImage(jsGFwk.Sprites.spike.spriteBag[this.spikePos].image,
						this.x, this.y + 23);
				context.restore();
			},
			
			onUpdate: function (delta) { },
			onDraw: function (context) {
				context.save();
					context.drawImage(this.wallImage, this.x, this.y);
				context.restore();
			}
		});
		
		this.nextLevel();
	},
	nextLevel: function() {
		GLOBAL.currentLevel++;
		jsGFwk._gameObjects.container.clearAll();
		createLevel(levels[GLOBAL.currentLevel]);
	}
};

function createLevel(l) {
	for (var i = 0; i < l.length; i++) {
		for (var j = 0; j < l[i].length; j++) {
			//Walls
			if (l[i][j] === 1 ||
				l[i][j] === 2) {
				jsGFwk._gameObjects.container.cloneObject({
					x: j * 30, y: i * 30,
					image: jsGFwk.Sprites["wall" + l[i][j]].image,
					tileType: l[i][j]
				});
			}
			
			if (isNaN(l[i][j]) && l[i][j][0] !== 4) {
				//DOOR
				jsGFwk._gameObjects.container.cloneObject({
					x: j * 30, y: i * 30,
					image: jsGFwk.Sprites["wall" + l[i][j][0]].image,
					tileType: l[i][j][0],
					action: l[i][j][1]
				});
			}
			
			if (l[i][j] >= 7 && l[i][j] <= 50) {
				//LEVER ACTION
				jsGFwk._gameObjects.container.cloneObject({
					x: j * 30, y: i * 30, tileType: l[i][j]});
			}
			
			//Spikes
			if (isNaN(l[i][j]) && l[i][j][0] === 4) {
				jsGFwk._gameObjects.container.cloneObject({
					x: j * 30, y: i * 30, 
					tileType: 4, initTime: l[i][j][1]});
			}
			
			//Power up
			if (l[i][j] === 100) {
				jsGFwk._gameObjects.container.cloneObject({
					x: j * 30, y: i * 30, tileType: l[i][j]});
			}
			
			//Coffin
			if (l[i][j] === 5) {
				coffin.x = j * 30;
				coffin.y = i * 30;
				jsGFwk.createObject(coffin);
			}
		}
	}
}