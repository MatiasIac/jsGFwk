/*globals jsGFwk, Bullet */
var player = (function () {
    "use strict";
    
    var p = function () {
        var self = this;
    };
    
    p.prototype.id = "alan";
    p.prototype.visible = true;
    
    p.prototype.bulletFiringInterval = 0.5;
    p.prototype.x = 310;
    p.prototype.y = 210;
    p.prototype.width = 10;
    p.prototype.height = 10;
    p.prototype.speed = 4;
    p.prototype.bulletContainer = null;
    p.prototype.position = 0;
    p.prototype.availableBullets = 10;
    p.prototype.live = 255;
    p.prototype.badCloner = null;
    
    p.prototype.init = function () {
        var self = this;
        
        self.x = 310;
        self.y = 210;
        self.availableBullets = 10;
        self.live = 255;
                
        self.bulletFiringTimer = new jsGFwk.Timer({
			action: function () {
                if (self.availableBullets > 0) {
                    self.bulletContainer.cloneObject({
                        x: self.x + 5,
                        y: self.y + 5,
                        direction: self.position
                    });
                    self.availableBullets -= 1;
                }
			},
            tickTime: self.bulletFiringInterval
		});
        
        self.reloadTimer = new jsGFwk.Timer({
			action: function () {
                if (self.availableBullets < 10) {
                    self.availableBullets += 1;
                }
			},
            tickTime: self.bulletFiringInterval
		});
        
        self.liveTimer = new jsGFwk.Timer({
			action: function () {
                if (self.live < 255) {
                    self.live += 1;
                }
			},
            tickTime: self.bulletFiringInterval
		});
        
    };
    
    p.prototype.update = function (delta) {
        var self = this;
        
        //D
        if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.D]) {
            self.x += self.speed;
        }

        //A
        if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.A]) {
            self.x -= self.speed;
        }

        //W
        if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.W]) {
            self.y -= self.speed;
        }

        //S
        if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.S]) {
            self.y += self.speed;
        }
        
        if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.SPACEBAR]) {
            self.bulletFiringTimer.tick(delta);
        } else {
            self.reloadTimer.tick(delta);
        }
        
        if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.D] && jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.W]) {
            self.position = 3;
        } else if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.D] && jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.S]) {
            self.position = 4;
        } else if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.A] && jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.S]) {
            self.position = 7;
        } else if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.A] && jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.W]) {
            self.position = 6;
        } else if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.S]) {
            self.position = 0;
        } else if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.W]) {
            self.position = 1;
        } else if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.D]) {
            self.position = 2;
        } else if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.A]) {
            self.position = 5;
        }
        
        self.liveTimer.tick(delta);
        
        if (self.live <= 0) {
            jsGFwk.Scenes.scenes.endGame.enable();
        }
        
        if (this.y > 480 || this.y < -10 || this.x < -10 || this.x > 640) {
            self.bulletContainer.clearAll();
            self.badCloner.clearAll();
            
            screensCount += 1;
            if (screensCount >= 10) {
                screensCount = 0;
                jsGFwk.getGameObjects().page.showPage();
            }
            
            if (this.y > 480) { this.y = 0; }
            if (this.y < -10) { this.y = 470; }
            if (this.x < -10) { this.x = 630; }
            if (this.x > 640) { this.x = 0; }
        }
    };
    
    p.prototype.draw = function (ctx) {
        var self = this, i;
        ctx.fillStyle = "rgb(" + self.live + ", " + self.live + ", " + self.live + ")";
        ctx.fillRect(self.x, self.y, self.width, self.height);
        
        ctx.fillStyle = "gray";
        for (i = 0; i < self.availableBullets; i += 1) {
            ctx.fillRect((10 * i) + 5, 460, 5, 5);
        }
    };
    
    return p;
}());