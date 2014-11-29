var dracul = {
	id: "dracul",
	visible: true,
	
	isJumping: false, isFalling: true, canFly: false,
	
	isRight: true,
	
	x: 560, y: 30, width: 15, height: 28, xTemp: 560, yTemp: 30,
	
	gravity: 0.1, initialVel: 0, fallVel: 0,
	
	animCounter: 0, animDelay: 0.2,
	
	maxOil: 500, lightOil: 100, minRadiusLight: 50, maxRadiusLight: 50,
	resetMaxMinLight: 50, consumeLight: 0.005,
	lightConsum: 4, lightIncrement: 1,
	diffLight: 0, diffLightSinc: 0,
	oilOffsetX: 20, oilOffsetY: 150,
	
	isDead: false, dieCounter: 0,
	
	sonarRadius: 1, isSonarActive: false,
	
	currentGraphic: {},
	graphicPointer: {},
	
	init: function () {
		this.x = levelsStartingPoint[GLOBAL.currentLevel].x;
		this.y = levelsStartingPoint[GLOBAL.currentLevel].y;
		this.isDead = false;
		this.dieCounter = 0;
		this.lightOil = this.maxOil;
		this.maxRadiusLight = this.resetMaxMinLight;
		this.minRadiusLight = this.resetMaxMinLight;
		jsGFwk.Sprites.die.reset();
		jsGFwk.Sprites.jumpRight.reset();
		jsGFwk.Sprites.jumpLeft.reset();
		jsGFwk.Sprites.actionRight.reset();
		jsGFwk.Sprites.actionLeft.reset();
		jsGFwk.Sprites.walkRight.reset();
		jsGFwk.Sprites.walkLeft.reset();
		jsGFwk.Sprites.idleRight.reset();
		jsGFwk.Sprites.idleLeft.reset();
		jsGFwk.Sprites.oilWave.reset();
		jsGFwk.Sprites.hangedRight.reset();
		jsGFwk.Sprites.hangedLeft.reset();
		this.currentGraphic = jsGFwk.Sprites.idleRight.sprite.image;
		this.graphicPointer = jsGFwk.Sprites.idleRight;
		
		this.updatePointer = this.updateNormal;
		this.drawPointer = this.drawNormal;
	},
	
	kill: function () {
		if (!this.isDead) {
			this.updatePointer = this.updateDead;
			this.drawPointer = this.drawDead;
		}
	},
	
	shakeLight: function (delta) {
		this.diffLight = (Math.sin(this.diffLightSinc) * 1);
		this.diffLightSinc += 0.3;
	},
	
	updateSonar: function (delta) {
		this.sonarRadius+= 20;
		if (this.sonarRadius > 1200) {
			this.sonarRadius = 1;
			this.isSonarActive = false;
			this.updateSonarPointer = function () {};
			this.drawSonarPointer = function () {};
		}
	},
	
	drawSonar: function (context) {
		var gradient = context.createRadialGradient(this.x + 10, this.y + 10,
			this.sonarRadius / 2,
			this.x + 15, this.y + 15, this.sonarRadius);
		gradient.addColorStop(0, "black");
		gradient.addColorStop(0.2, "red");
		gradient.addColorStop(0.9, "transparent");
		gradient.addColorStop(0.99, "red");
		gradient.addColorStop(1, "black");
		context.fillStyle = gradient;
		context.fillRect(0, 0, 640, 480);
	},
	
	drawLigth: function (context) {
		if (!this.isSonarActive) {
			var gradient = context.createRadialGradient(this.x + 10, this.y + 10, 1,
				this.x + 15, this.y + 15, this.maxRadiusLight + this.diffLight);
			gradient.addColorStop(0, "transparent");
			gradient.addColorStop(1, "black");
			context.fillStyle = gradient;
			context.fillRect(0, 0, 640, 480);
		}
	},
	
	/*DEAD STATE*/	
	updateDead: function (delta) {
		this.animCounter += delta;
		if (this.animCounter >= this.animDelay) {
			this.animCounter = 0;
			jsGFwk.Sprites.die.next();
			this.dieCounter++;
		}
		
		if (this.dieCounter === jsGFwk.Sprites.die.spriteBag.length) {
			this.init();
		}
	},
	
	drawDead: function (context) {
		context.save();
			context.drawImage(jsGFwk.Sprites.die.sprite.image,
				this.x, this.y - 4);
		context.restore();
	},
	/*END DEAD*/
	
	/*NORMAL STATE*/
	updateNormal: function (delta) {
		this.animCounter += delta;
		
		// SPACE BAR
		if (jsGFwk.IO.keyboard._activeKey[32] && this.lightOil > 0 && !this.isSonarActive) {
			this.lightOil -= this.lightConsum;
			this.maxRadiusLight += this.lightIncrement;
		} else {
			if (this.maxRadiusLight > this.minRadiusLight) {
				this.maxRadiusLight -= this.lightConsum;
			} else if (this.maxRadiusLight > this.resetMaxMinLight) {
				this.maxRadiusLight -= this.consumeLight;
			}
			
			if (this.lightOil < this.maxOil) {
				this.lightOil += this.lightIncrement;
			}
		}
		
		// Z: Sonar
		if (jsGFwk.IO.keyboard._activeKey[90] && !this.isSonarActive &&
			this.lightOil == this.maxOil) {
			this.lightOil = 0;
			this.isSonarActive = true;
			this.updateSonarPointer = this.updateSonar;
			this.drawSonarPointer = this.drawSonar;
		}
		
		//W: - JUMP
		if (jsGFwk.IO.keyboard._activeKey[87] &&
			!jsGFwk.IO.keyboard._activeKey[67]) {
			if (this.isRight) {
				this.currentGraphic = jsGFwk.Sprites.jumpRight.sprite.image;
				this.graphicPointer = jsGFwk.Sprites.jumpRight;
			} else {
				this.currentGraphic = jsGFwk.Sprites.jumpLeft.sprite.image;
				this.graphicPointer = jsGFwk.Sprites.jumpLeft;
			}
			this.yTemp = this.y;
			this.y -= 0.1;
			this.isJumping = true;
			this.fallVel = this.initialVel;
		} else { 
			this.yTemp = this.y;
			//this.fallVel += this.gravity;
			this.y++ //= this.fallVel;
			this.isJumping = false; 
		}
				
		//A: 65
		if (jsGFwk.IO.keyboard._activeKey[65] && 
			!jsGFwk.IO.keyboard._activeKey[67]) {
			if (!this.isJumping && !this.isFalling) {
				this.currentGraphic = jsGFwk.Sprites.walkLeft.sprite.image;
				this.graphicPointer = jsGFwk.Sprites.walkLeft;
			} else if (!this.isJumping && this.isFalling) {
				this.currentGraphic = jsGFwk.Sprites.hangedLeft.sprite.image;
				this.graphicPointer = jsGFwk.Sprites.hangedLeft;
			}
			this.isRight = false;
			this.xTemp = this.x;
			this.x--;
		} else if (jsGFwk.IO.keyboard._activeKey[68] && 
			!jsGFwk.IO.keyboard._activeKey[67]) {
			if (!this.isJumping && !this.isFalling) {
				this.currentGraphic = jsGFwk.Sprites.walkRight.sprite.image;
				this.graphicPointer = jsGFwk.Sprites.walkRight;
			} else if (!this.isJumping && this.isFalling) {
				this.currentGraphic = jsGFwk.Sprites.hangedRight.sprite.image;
				this.graphicPointer = jsGFwk.Sprites.hangedRight;
			}
			this.isRight = true;
			this.xTemp = this.x;
			this.x++;
		}
		
		if (!jsGFwk.IO.keyboard._activeKey[65] && 
			!jsGFwk.IO.keyboard._activeKey[87] &&
			!jsGFwk.IO.keyboard._activeKey[68]) {
				if (this.isRight) {
					this.currentGraphic = jsGFwk.Sprites.idleRight.sprite.image;
					this.graphicPointer = jsGFwk.Sprites.idleRight;
				} else {
					this.currentGraphic = jsGFwk.Sprites.idleLeft.sprite.image;
					this.graphicPointer = jsGFwk.Sprites.idleLeft;
				}
				this.isJumping = false;
		}
		
		if (jsGFwk.IO.keyboard._activeKey[67] && !this.isFalling && !this.isJumping) {
			if (this.isRight) {
				this.currentGraphic = jsGFwk.Sprites.actionRight.sprite.image;
				this.graphicPointer = jsGFwk.Sprites.actionRight;
			} else {
				this.currentGraphic = jsGFwk.Sprites.actionLeft.sprite.image;
				this.graphicPointer = jsGFwk.Sprites.actionLeft;
			}
			
			jsGFwk._gameObjects.container.eachCloned(function (clon, event) {
				if (clon.tileType >= 7 && clon.leverStatus === 0) {
					if(jsGFwk._gameObjects.dracul.isRectColliding(clon)) {
						clon.leverStatus = 1;
						jsGFwk._gameObjects.container.eachCloned(function (c, e) {
							if (c.actionRelated === clon.tileType) {
								c.triggerUp();
								e.cancel = true;
							}
						});
						event.cancel = true;
					}
				}
			});
		}
		
		/*if (!this.isJumping) {
			//this.yTemp = this.y;
			this.fallVel += this.gravity;
			this.yTemp += this.fallVel;
			//this.y += this.fallVel;
		} /*else {
			if (this.canFly) {
				this.yTemp = this.y;
				this.y -= 0.1;
			}
		}*/
		
		var colliders = [];
		
		jsGFwk._gameObjects.container.eachCloned(function (clon, event) {		
			if (clon.tileType < 4) {
				var collide = jsGFwk._gameObjects.dracul.isRectColliding(clon);
				
				if (collide) {
					colliders.push(clon);
				}
				
				//if (collide) { event.cancel = true; }
				
				/*if (collide && 
				   ((jsGFwk._gameObjects.dracul.yTemp + jsGFwk._gameObjects.dracul.height) < clon.y)
				   && !jsGFwk._gameObjects.dracul.isJumping) {
					jsGFwk._gameObjects.dracul.fallVel = jsGFwk._gameObjects.dracul.initialVel;
					jsGFwk._gameObjects.dracul.isFalling = false;
					jsGFwk._gameObjects.dracul.y = jsGFwk._gameObjects.dracul.yTemp;
				} else {
					jsGFwk._gameObjects.dracul.fallVel = jsGFwk._gameObjects.dracul.initialVel;
					jsGFwk._gameObjects.dracul.isFalling = true;
				}

				if (collide && 
					((jsGFwk._gameObjects.dracul.xTemp > clon.x) || 
					 (jsGFwk._gameObjects.dracul.xTemp + jsGFwk._gameObjects.dracul.width < clon.x))) {
					jsGFwk._gameObjects.dracul.x = jsGFwk._gameObjects.dracul.xTemp;
				}

				if (collide && (jsGFwk._gameObjects.dracul.yTemp < (clon.y + clon.height))
					&& jsGFwk._gameObjects.dracul.isJumping) {
					jsGFwk._gameObjects.dracul.y = jsGFwk._gameObjects.dracul.yTemp;
				    jsGFwk._gameObjects.dracul.canFly = false;
				} else {
					jsGFwk._gameObjects.dracul.canFly = true;
				}*/
			}
		});
		
		var canFall = true;
		var canLeftOrRight = true;
		var canFly = false;
			
		if (colliders.length > 0) {
			var drac = jsGFwk._gameObjects.dracul;
			
			for (var i = 0; i < colliders.length;i++) {
				var clon = colliders[i];
				
				if ((drac.yTemp + drac.height) > clon.y &&
					) {
					canFall = false;
				}
				
				if ((drac.x < clon.x) || (drac.x + drac.width > clon.x) 
					&& !((drac.yTemp + drac.height) < clon.y)) {
					canLeftOrRight = false;
				}
			}			
			//var flying = collide && ()
		}
		
		if (canFall) {
			this.isFalling = true;
		} else {
			this.y = this.yTemp;
			this.fallVel = this.initialVel;
			this.isFalling = false;
		}
		
		if (!canLeftOrRight) {
			this.x = this.xTemp;
		}
			
		if (this.animCounter >= this.animDelay) {
			this.animCounter = 0;
			this.graphicPointer.next();
			jsGFwk.Sprites.oilWave.next();
		}
	},
	
	drawNormal: function (context) {
		context.save();
			context.drawImage(this.currentGraphic, this.x, this.y - 6);
		context.restore();
	},
	/*END NORMAL*/
	
	updateSonarPointer: function () {},
	drawSonarPointer: function () {},
	
	updatePointer: function () {},
	drawPointer: function () {},
	
	drawOil: function (context) {
		context.save();
			var totalOil = (((this.lightOil * 100) / this.maxOil) * 258) / 100;
			totalOil = totalOil < 1 ? 1 : totalOil;
					
			context.drawImage(jsGFwk.Sprites.oil.image,
				0, 0, 25, totalOil,
				576 + this.oilOffsetX, 
				(26 + this.oilOffsetY) + (258 - totalOil),
				25, totalOil);
			context.drawImage(jsGFwk.Sprites.oilWave.sprite.image, 
				576 + this.oilOffsetX, 
				(24 + this.oilOffsetY) + (258 - totalOil));
			context.drawImage(jsGFwk.Sprites.oilPipe.image, 576 + this.oilOffsetX, 25 + this.oilOffsetY);
			context.drawImage(jsGFwk.Sprites.topPipe.image, 570 + this.oilOffsetX, 0 + this.oilOffsetY);
			context.drawImage(jsGFwk.Sprites.lowerPipe.image, 570 + this.oilOffsetX, 283 + this.oilOffsetY);
		context.restore();
	},
	
	update: function (delta) {
		this.updatePointer(delta);
		this.shakeLight(delta);
		this.updateSonarPointer(delta);
	},
	draw: function (context) {
		this.drawPointer(context);
		this.drawLigth(context);
		this.drawSonarPointer(context);
		this.drawOil(context);
	}
};