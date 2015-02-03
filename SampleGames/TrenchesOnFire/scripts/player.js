/*global jsGFwk, global*/

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
    
    player.prototype.breathTimer = null;

	player.prototype.init = function (data) {
        var self = this;
        
        self.config.graphic.reset();
        
        self.breathTimer = new jsGFwk.Timer({
			action: function () {
				self.height = (Math.sin(self.sin) * 3) + 55;
                self.shadowHeight = (Math.sin(self.sin) * 3) + 30;
                
                self.sin += 0.1;
                self.sin = self.sin % 3;
			},
            tickTime: self.config.generalConfiguration.breathInterval
		});
        
        if (self.config.player === global.sides.left) {
            self.captureKeys = function (delta) {
                //D
                if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.D]) {
                    if (self.currentXSpeed < self.config.generalConfiguration.topSpeed) {
                        self.currentXSpeed += 1;
                    }
                }

                //A
                if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.A]) {
                    if (self.currentXSpeed > -self.config.generalConfiguration.topSpeed) {
                        self.currentXSpeed -= 1;
                    }
                }

                //W
                if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.W]) {
                    if (self.currentYSpeed > -self.config.generalConfiguration.topSpeed) {
                        self.currentYSpeed -= 1;
                    }
                }

                //S
                if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.S]) {
                    if (self.currentYSpeed < self.config.generalConfiguration.topSpeed) {
                        self.currentYSpeed += 1;
                    }
                }
                                
                //SPACEBAR
                //if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.SPACEBAR]) { }
            };
        } else {
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
        
        this.config.graphic.next();
	};
	
	player.prototype.draw = function (ctx) {
        ctx.save();
        ctx.drawImage(this.config.shadow.image, this.x - 10, (this.y + 24) + (31 - this.shadowHeight), 46, this.shadowHeight);
        ctx.drawImage(this.config.graphic.sprite.image, this.x, this.y + (56 - this.height), 40, this.height);
        ctx.restore();
	};
    
    return player;
}());