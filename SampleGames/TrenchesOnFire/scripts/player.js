/*global jsGFwk, global, Bullet*/

var player = (function () {
    "use strict";
    
    var player = function (configuration) {
        var self = this;
        self.config = configuration;
    };
    
    player.prototype.id = "player";
    player.prototype.visible = true;
    player.prototype.config = null;
    player.prototype.x = 0;
    player.prototype.y = 0;
    player.prototype.currentYSpeed = 0;
    player.prototype.currentXSpeed = 0;
    player.prototype.sin = 0;
    player.prototype.height = 56;
    player.prototype.shadowHeight = 31;
    player.prototype.lookingAt = global.sides.right;
    player.prototype.bulletContainer = null;
    
    player.prototype.gunPosition = global.gunPositions.right;
    
    player.prototype.breathTimer = null;
    player.prototype.bulletFiringTimer = null;
    player.prototype.walkingTimer = null;

	player.prototype.init = function (data) {
        var self = this;
                
        self.config.idle.reset();
        self.config.walkingRight.reset();
        self.config.walkingLeft.reset();
        
        self.walkingTimer = new jsGFwk.Timer({
			action: function () {
				self.config.graphic.next();
			},
            tickTime: 0.05
		});
        
        self.breathTimer = new jsGFwk.Timer({
			action: function () {
				self.height = (Math.sin(self.sin) * 3) + 55;
                self.shadowHeight = (Math.sin(self.sin) * 3) + 30;
                
                self.sin += 0.1;
                self.sin = self.sin % 3;
			},
            tickTime: self.config.generalConfiguration.breathInterval
		});
        
        self.bulletFiringTimer = new jsGFwk.Timer({
			action: function () {
				self.bulletContainer.cloneObject({
                    x: self.x,
                    y: self.y,
                    side: self.config.player,
                    direction: self.lookingAt === global.sides.right ? 1 : -1,
                    data: self.config.generalConfiguration,
                    shotDirection: self.gunPosition
                });
			},
            tickTime: self.config.generalConfiguration.bulletFiringInterval
		});
        
        if (self.config.player === global.sides.left) {
            self.config.graphic = self.config.walkingRight;
            self.gunPosition = global.gunPositions.right;
            
            self.captureKeys = function (delta) {
                //D
                if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.D]) {
                    if (self.currentXSpeed < self.config.generalConfiguration.topSpeed) {
                        self.currentXSpeed += 1;
                    }
                    self.config.graphic = self.config.walkingRight;
                    self.lookingAt = global.sides.right;
                }

                //A
                if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.A]) {
                    if (self.currentXSpeed > -self.config.generalConfiguration.topSpeed) {
                        self.currentXSpeed -= 1;
                    }
                    self.config.graphic = self.config.walkingLeft;
                    self.lookingAt = global.sides.left;
                }

                //W
                if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.W]) {
                    if (self.currentYSpeed > -self.config.generalConfiguration.topSpeed) {
                        self.currentYSpeed -= 1;
                    }
                    self.config.graphic = self.lookingAt === global.sides.right ? self.config.walkingRight : self.config.walkingLeft;
                }

                //S
                if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.S]) {
                    if (self.currentYSpeed < self.config.generalConfiguration.topSpeed) {
                        self.currentYSpeed += 1;
                    }
                    self.config.graphic = self.lookingAt === global.sides.right ? self.config.walkingRight : self.config.walkingLeft;
                }
                
                //Verify the gun position
                if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.D] && jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.W]) {
                    self.gunPosition = global.gunPositions.upRight;
                } else if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.D] && jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.S]) {
                    self.gunPosition = global.gunPositions.downRight;
                } else if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.A] && jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.S]) {
                    self.gunPosition = global.gunPositions.downLeft;
                } else if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.A] && jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.W]) {
                    self.gunPosition = global.gunPositions.upLeft;
                } else if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.S]) {
                    self.gunPosition = global.gunPositions.down;
                } else if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.W]) {
                    self.gunPosition = global.gunPositions.up;
                } else if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.D]) {
                    self.gunPosition = global.gunPositions.right;
                } else if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.A]) {
                    self.gunPosition = global.gunPositions.left;
                }
                    
                //Reset the visual state of the gun
                //if (!jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.D] && !jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.A] && !jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.S] && !jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.W]) {
                //    self.config.graphic = self.lookingAt === global.sides.right ? self.config.walkingRight : self.config.walkingLeft; //self.config.idle;
                //}
                                
                //SPACEBAR
                if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.SPACEBAR]) {
                    self.bulletFiringTimer.tick(delta);
                }
            };
        } else {
            self.config.graphic = self.config.walkingLeft;
            self.gunPosition = global.gunPositions.left;
            
            self.captureKeys = function () {
            };
        }
	};
    
    player.prototype.captureKeys = function () { };
	
	player.prototype.update = function (delta) {
        var self = this;
        
        self.captureKeys(delta);
        self.breathTimer.tick(delta);
        
        self.currentYSpeed *= self.config.generalConfiguration.friction;
		self.y += self.currentYSpeed;
		self.currentXSpeed *= self.config.generalConfiguration.friction;
		self.x += self.currentXSpeed;
        
        self.walkingTimer.tick(delta);
        //this.config.graphic.next();
	};
	
	player.prototype.draw = function (ctx) {
        ctx.drawImage(this.config.shadow.image, this.x - 10, (this.y + 24) + (31 - this.shadowHeight), 46, this.shadowHeight);
        ctx.drawImage(this.config.graphic.sprite.image, this.x, this.y + (56 - this.height), 40, this.height);
        
        ctx.drawImage(this.config.gun.spriteBag[this.gunPosition].image, this.x, this.y);
	};
    
    return player;
}());