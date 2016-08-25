var dracul = {
	id: "dracul", visible: true,
	isRight: true, movementSpeed: 1.5, fallSpeed: 2, flySpeed: 1.5,
	x: 560, y: 30, width: 15, height: 28,
	animCounter: 0, animDelay: 0.2,
	oilOffsetX: 20, oilOffsetY: 150,
	isDead: false, dieCounter: 0,
	graphicPointer: {},
	
	init: function () {
        this.x = Levels[GLOBAL.currentLevel].startingPoint.x;
        this.y = Levels[GLOBAL.currentLevel].startingPoint.y;
		this.isDead = false;
		this.dieCounter = 0;
		GLOBAL.lightOil = GLOBAL.maxOil;
		/*GLOBAL.maxRadiusLight = GLOBAL.resetMaxMinLight;
		GLOBAL.minRadiusLight = GLOBAL.resetMaxMinLight;*/
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
		/*jsGFwk.Sprites.hangedRight.reset();
		jsGFwk.Sprites.hangedLeft.reset();*/
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

    /*DEAD STATE*/	
	updateDead: function (delta) {
		this.animCounter += delta;
		if (this.animCounter >= (this.animDelay + 0.1)) {
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
        this.animCounter += delta;
        var isFalling = false;
        
        this.movementSpeed = jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.SHIFT] ? 3 : 1.5;
        
        if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.S] && GLOBAL.lightOil > 0 && !Light.isDropping) {
            Light.drop(this.isRight ? 10 : -10);
        }
        
        if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.SPACEBAR] && GLOBAL.lightOil > 0) {
			GLOBAL.lightOil -= GLOBAL.lightConsum;
			GLOBAL.maxRadiusLight += GLOBAL.lightIncrement;
		} else {
			if (GLOBAL.maxRadiusLight > GLOBAL.minRadiusLight) {
				GLOBAL.maxRadiusLight -= GLOBAL.lightConsum;
			}/* else if (GLOBAL.maxRadiusLight > GLOBAL.resetMaxMinLight) {
				GLOBAL.maxRadiusLight -= GLOBAL.consumeLight;
			}*/
			
            GLOBAL.lightOil += GLOBAL.lightOil < GLOBAL.maxOil ? GLOBAL.lightIncrement : 0
		}
        
        if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.W] && GLOBAL.lightOil > 0) {
            GLOBAL.lightOil -= (GLOBAL.lightConsum + 1);
            this.graphicPointer = this.isRight ? jsGFwk.Sprites.jumpRight : jsGFwk.Sprites.jumpLeft;
            
            if (!this.checkWallCollision({ x: this.x, y: this.y - this.flySpeed })) {
                this.y -= this.flySpeed;
            }
		} else {
            if (!this.checkWallCollision({ x: this.x, y: this.y + this.fallSpeed })) {
                this.graphicPointer = this.isRight ? jsGFwk.Sprites.jumpRight : jsGFwk.Sprites.jumpLeft;
                this.y += this.fallSpeed;
                isFalling = true;
            } else {
                this.graphicPointer = this.isRight ? jsGFwk.Sprites.idleRight : jsGFwk.Sprites.idleLeft;
                isFalling = false;
            }
        }
        
        if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.A]) {
            this.isRight = false;
            
            if (!this.checkWallCollision({ x: this.x - this.movementSpeed, y: this.y })) {
                this.x -= this.movementSpeed;
                if (!jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.W] && !isFalling) {
                    this.graphicPointer = jsGFwk.Sprites.walkLeft;
                }
            }
        }
        
        if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.D]) {
            this.isRight = true;
            
            if (!this.checkWallCollision({ x: this.x + this.movementSpeed, y: this.y })) {
                this.x += this.movementSpeed;
                if (!jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.W] && !isFalling) {
                    this.graphicPointer = jsGFwk.Sprites.walkRight;
                }
            }
        }
		
		if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.M] && !isFalling && 
            !jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.D] &&
            !jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.A]) {
            this.graphicPointer = this.isRight ? jsGFwk.Sprites.actionRight : jsGFwk.Sprites.actionLeft;
            
            GLOBAL.leverContainer.eachCloned(function (item, event) {
                if (dracul.isRectColliding(item)) {
                    item.switch();
                    event.cancel = true;
                }
            });

            if (Levels[GLOBAL.currentLevel].item !== undefined && Levels[GLOBAL.currentLevel].item.item !== 0) {
                if (dracul.isRectColliding(Levels[GLOBAL.currentLevel].item)) {
                    var currentItem = GLOBAL.item;
                    GLOBAL.item = Levels[GLOBAL.currentLevel].item.item;
                    Levels[GLOBAL.currentLevel].item.item = currentItem;
                }
            }
		}
        
        if (this.animCounter >= this.animDelay) {
			this.animCounter = 0;
			this.graphicPointer.next();
			jsGFwk.Sprites.oilWave.next();
		}
	},
	
	drawNormal: function (context) {
        context.drawImage(this.graphicPointer.sprite.image, this.x, this.y - 6);
	},
	/*END NORMAL*/
	
    checkWallCollision: function (whereToMove) {
        var collide = false;
        
        whereToMove.width = this.width;
        whereToMove.height = this.height;
        
        for (var i = 0; i < Levels[GLOBAL.currentLevel].platforms.length; i++) {
            if (jsGFwk.Collisions.areCollidingBy(whereToMove,
                     Levels[GLOBAL.currentLevel].platforms[i],
                     jsGFwk.Collisions.collidingModes.RECTANGLE)) {
                collide = true;
                break;
            }
        }
        
        if (!collide) {
            GLOBAL.fallingWallContainer.eachCloned(function (item, event) {
                if (jsGFwk.Collisions.areCollidingBy(whereToMove,
                         item.extCollideArea,
                         jsGFwk.Collisions.collidingModes.RECTANGLE)) {
                    collide = true;
                    event.cancel = true;
                }
            });
        }

        if (!collide) {
            if (Levels[GLOBAL.currentLevel].skeletonDoor !== undefined && !SkeletonDoor.isOpen) {
                if (jsGFwk.Collisions.areCollidingBy(whereToMove, 
                        Levels[GLOBAL.currentLevel].skeletonDoor,
                        jsGFwk.Collisions.collidingModes.RECTANGLE)) {
                            if (GLOBAL.item === 2) {
                                SkeletonDoor.isOpen = true;
                                collide = false;
                            } else {
                                collide = true;
                            }
                    }
            }
        }

        if (!collide) {
            if (Levels[GLOBAL.currentLevel].stakeDoor !== undefined && !StakeDoor.isOpen) {
                if (jsGFwk.Collisions.areCollidingBy(whereToMove, 
                        Levels[GLOBAL.currentLevel].stakeDoor,
                        jsGFwk.Collisions.collidingModes.RECTANGLE)) {
                            if (GLOBAL.item === 1) {
                                StakeDoor.isOpen = true;
                                collide = false;
                            } else {
                                collide = true;
                            }
                    }
            }
        }
        
        //if (!collide) {
        GLOBAL.leverContainer.eachCloned(function (item, event) {
            for (var i = 0; i < item.wallsToRender.length; i++) {
                if (jsGFwk.Collisions.areCollidingBy(whereToMove,
                        item.wallsToRender[i],
                        jsGFwk.Collisions.collidingModes.RECTANGLE) && item.currentPosition === 0) {
                    collide = true;
                    event.cancel = true;
                    break;
                }
            }
        });
        //}
        
        GLOBAL.movableWallContainer.eachCloned(function (item, event) {
            if (jsGFwk.Collisions.areCollidingBy(whereToMove, item, jsGFwk.Collisions.collidingModes.RECTANGLE)) {
                if (whereToMove.y !== dracul.y) {
                    collide = true;
                } else {
                    collide = !item.canDisplace(whereToMove.x - dracul.x);
                }
                event.cancel = true;
            }
        });

        return collide;
    },
	
	updatePointer: function () {},
	drawPointer: function () {},
		
	update: function (delta) {
		this.updatePointer(delta);
	},
	draw: function (context) {
		this.drawPointer(context);
	}
};