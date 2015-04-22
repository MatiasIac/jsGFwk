var dracul = {
	id: "dracul", visible: true,
		
	isRight: true, movementSpeed: 1,
	
	x: 560, y: 30, width: 15, height: 30,
	
    targetPosition: { up: false, right: true, left: false },
    
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
        context.drawImage(jsGFwk.Sprites.die.sprite.image, this.x, this.y - 4);
	},
	/*END DEAD*/
	
	/*NORMAL STATE*/
	updateNormal: function (delta) {
        var isUpPressed = false;
        
        this.targetPosition.up = false;
        this.targetPosition.right = false;
        this.targetPosition.left = false;
        
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
            isUpPressed = true;
            this.targetPosition.up = true;
		} else {
            isUpPressed = false;
            this.targetPosition.up = false;
		}
				
		//A: 65
		if (jsGFwk.IO.keyboard._activeKey[65] && 
			!jsGFwk.IO.keyboard._activeKey[67]) {
            
			if (!isUpPressed) {
				this.currentGraphic = jsGFwk.Sprites.walkLeft.sprite.image;
				this.graphicPointer = jsGFwk.Sprites.walkLeft;
			}

            this.targetPosition.right = false;
            this.targetPosition.left = true;
            this.isRight = false;
            
		} else if (jsGFwk.IO.keyboard._activeKey[68] && 
			!jsGFwk.IO.keyboard._activeKey[67]) {
            //D: 68
            
			if (!isUpPressed) {
				this.currentGraphic = jsGFwk.Sprites.walkRight.sprite.image;
				this.graphicPointer = jsGFwk.Sprites.walkRight;
			}
			
            this.targetPosition.right = true;
            this.targetPosition.left = false;
            this.isRight = true;
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
				isUpPressed = false;
                this.targetPosition.right = false;
                this.targetPosition.left = false;
		}
		
        //Action
		if (jsGFwk.IO.keyboard._activeKey[67]) {
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
		
        this.validateMovement();
                
		if (this.animCounter >= this.animDelay) {
			this.animCounter = 0;
			this.graphicPointer.next();
			jsGFwk.Sprites.oilWave.next();
		}
	},
	
	drawNormal: function (context) {
        context.drawImage(this.currentGraphic, this.x, this.y - 6);
	},
	/*END NORMAL*/
	
    validateMovement: function () {
        var self = this;
        var target = { 
            x: this.x, 
            y: this.y,
            width: 15,
            height: 28,
            collider: jsGFwk.Collisions._rectColliding
        };
        
        if (this.targetPosition.up) {
            target.y -= this.movementSpeed;
            if (this.notCollide(target)) {
                this.y = target.y;
            }
        } else {
            target.y += this.movementSpeed;
            if (this.notCollide(target)) {
                this.y = target.y;
            } else {
                this.y = this.clonFound.y - this.clonFound.height;
            }
        }
        
        if (this.targetPosition.left) {
            target.x -= this.movementSpeed;
            if (this.notCollide(target)) {
                this.x = target.x;
            }
        } else if (this.targetPosition.right) {
            target.x += this.movementSpeed;
            if (this.notCollide(target)) {
                this.x = target.x;
            }
        }
        
    },
    
    clonFound: {},
    
    notCollide: function (target) {
        var notCollide = true;
        var self = this;
        
        jsGFwk._gameObjects.container.eachCloned(function (clon, event) {		
            if (clon.tileType < 4) {
                if (target.collider(clon)) {
                    self.clonFound = clon;
                    notCollide = false;
                    event.cancel = true;
                }
            }
        });
        return notCollide;
    },
    
	updateSonarPointer: function () {},
	drawSonarPointer: function () {},
	
	updatePointer: function () {},
	drawPointer: function () {},
	
	drawOil: function (context) {
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