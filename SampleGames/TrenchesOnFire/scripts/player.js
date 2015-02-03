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

	player.prototype.init = function (data) {
        var self = this;
        
        self.config.graphic.reset();
        
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
        
        self.currentYSpeed *= self.config.generalConfiguration.friction;
		self.y += self.currentYSpeed;
		self.currentXSpeed *= self.config.generalConfiguration.friction;
		self.x += self.currentXSpeed;
        
        this.config.graphic.next();
	};
	
	player.prototype.draw = function (ctx) {
        ctx.save();
        ctx.drawImage(this.config.shadow.image, this.x - 10, this.y + 24);
        ctx.drawImage(this.config.graphic.sprite.image, this.x, this.y);
        ctx.restore();
	};
    
    return player;
}());