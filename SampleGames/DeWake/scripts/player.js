/*globals jsGFwk, Bullet */
var player = (function () {
    "use strict";
    
    var p = function () {
        var self = this;
    };
    
    p.prototype.id = "alan";
    p.prototype.visible = true;
    
    p.prototype.bulletFiringInterval = 0.2;
    p.prototype.x = 310;
    p.prototype.y = 210;
    p.prototype.width = 15;
    p.prototype.height = 15;
    p.prototype.speed = 4;
    p.prototype.bulletContainer = null;
    p.prototype.position = 0;
    p.prototype.availableBullets = 10;
    p.prototype.live = 255;
    p.prototype.badCloner = null;
    p.prototype.walls = [];
    p.prototype.wallsCloner = null;
    p.prototype.wallPassTimer = null
    p.prototype.wallCollideTimer = null;
    p.prototype.wallAlreadyTicked = true;
    p.prototype.tracerContainer = null;
    p.prototype.tracerTimer = null;
    p.prototype.cycleColorAccumulator = 0;
    p.prototype.cicleColorValue = 0;
    
    p.prototype.init = function () {
        var self = this;
        
        self.walls = [false, false, false, false];
        
        point = 0;
        screensCount = 0;
        
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
                    laserJuke.play();
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
        
        self.wallPassTimer = new jsGFwk.Timer({
			action: function () {
                if (!self.wallAlreadyTicked) {
                    self.walls = [self.getRandom(), 
                        self.getRandom(),
                        self.getRandom(),
                        self.getRandom()];
                    self.wallAlreadyTicked = true;
                    jsGFwk.ResourceManager.sounds.doors.audio.play();
                    
                    self.walls[0] = self.walls.join() == 'true,true,true,true' ? false : self.walls[0];
                }
			},
            tickTime: 0
		});
        
        self.wallCollideTimer = new jsGFwk.Timer({
			action: function () {
                jsGFwk.settings.clearColor = "black";
			},
            tickTime: 0.2
		});
        
        self.tracerTimer = new jsGFwk.Timer({
			action: function () {
                self.tracerContainer.cloneObject({ 
                    x: self.x + (Math.floor(Math.random() * 10) - 5),
                    y: self.y + (Math.floor(Math.random() * 30) - 15),
                    size: (Math.random() * 15) + 2 });
			},
            tickTime: 0.1
		});
    };
    
    p.prototype.getRandom = function () {
        return ((Math.random() * 10) + 1) < 5;
    };
    
    p.prototype.resetScreen = function () {
        var self = this;
        
        self.bulletContainer.clearAll();
        self.badCloner.clearAll();
        self.wallsCloner.clearAll();
        self.tracerContainer.clearAll();

        screensCount += 1;
        
        jsGFwk.getGameObjects().wallsController.enterOnScene();
        self.wallPassTimer.tickTime = screensCount;
        self.wallAlreadyTicked = false;
        
        jsGFwk.getGameObjects().page.showPage();
    };
    
    p.prototype.checkWallCollision = function (whereToMove) {
        var self = this,
            collide = false;
        
        whereToMove.width = self.width;
        whereToMove.height = self.height;
        
        jsGFwk.getGameObjects().wallCloner.eachCloned(function (item, event) {
            if (item.isRectColliding(whereToMove)) {
                collide = true;
                event.cancel = true;
            }
        });
        
        return collide;
    };
    
    p.prototype.update = function (delta) {
        var self = this;
        
        //D
        if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.D]) {
            if (!self.checkWallCollision({ x: self.x + self.speed, y: self.y })) {
                self.x += self.speed;
                if (self.walls[3] && self.x > 620) {
                    self.x = 620;
                    jsGFwk.settings.clearColor = "red";
                }
            }
        }

        //A
        if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.A]) {
            if (!self.checkWallCollision({ x: self.x - self.speed, y: self.y })) {            
                self.x -= self.speed;
                if (self.walls[1] && self.x < 10) {
                    self.x = 10;
                    jsGFwk.settings.clearColor = "red";
                }
            }
        }

        //W
        if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.W]) {
            if (!self.checkWallCollision({ x: self.x, y: self.y - self.speed })) {
                self.y -= self.speed;
                if (self.walls[0] && self.y < 10) {
                    self.y = 10;
                    jsGFwk.settings.clearColor = "red";
                }
            }
        }

        //S
        if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.S]) {
            if (!self.checkWallCollision({ x: self.x, y: self.y + self.speed })) {
                self.y += self.speed;
                if (self.walls[2] && self.y > 460) {
                    self.y = 460;
                    jsGFwk.settings.clearColor = "red";
                }
            }
        }
        
        if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.SPACEBAR]) {
            self.bulletFiringTimer.tick(delta);
        } else {
            self.reloadTimer.tick(delta);
        }
        
        if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.D] && jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.W]) {
            self.position = 7;
        } else if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.D] && jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.S]) {
            self.position = 6;
        } else if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.A] && jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.S]) {
            self.position = 3;
        } else if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.A] && jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.W]) {
            self.position = 4;
        } else if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.S]) {
            self.position = 1;
        } else if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.W]) {
            self.position = 0;
        } else if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.D]) {
            self.position = 5;
        } else if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.A]) {
            self.position = 2;
        }
        
        self.liveTimer.tick(delta);
        self.wallPassTimer.tick(delta);
        self.wallCollideTimer.tick(delta);
        self.tracerTimer.tick(delta);
        
        if (self.live <= 5) {
            jsGFwk.Scenes.scenes.hud.enable();
        }
        
        if (this.y > 480) {
            self.resetScreen();
            this.y = 0;
            this.walls = [true, true, true, true];
            //this.walls = [false, self.getRandom(), self.getRandom(), self.getRandom()];
        }

        if (this.y < -10) {
            self.resetScreen();
            this.y = 470;
            this.walls = [true, true, true, true];
            //this.walls = [self.getRandom(), self.getRandom(), false, self.getRandom()];
        }
        
        if (this.x < -10) {
            self.resetScreen();
            this.x = 630;
            this.walls = [true, true, true, true];
            //this.walls = [self.getRandom(), self.getRandom(), self.getRandom(), false];
        }
        
        if (this.x > 640) {
            self.resetScreen();
            this.x = 0;
            this.walls = [true, true, true, true];
            //this.walls = [self.getRandom(), false, self.getRandom(), self.getRandom()];
        }
        
        this.cycleColorAccumulator += 0.5;
        this.cicleColorValue = 150 + parseInt(Math.cos(this.cycleColorAccumulator) * 50);
    };
    
    p.prototype._showLiveStatus = function (ctx) {
        var self = this,
            livePer = (self.live * 100) / 255; 
        
        if (livePer <= 40) {
            ctx.fillStyle = "rgb(" + self.cicleColorValue + "," + self.cicleColorValue + "," + self.cicleColorValue + ")";
            ctx.strokeStyle =  "rgb(" + self.cicleColorValue + "," + self.cicleColorValue + "," + self.cicleColorValue + ")";
            ctx.lineWidth = 1;
            ctx.font = "11pt pixelated";
            ctx.fillText("power :: " + Math.round(livePer) + "%", self.x + 45, self.y - 35);
            ctx.beginPath();
            ctx.moveTo(self.x + 20, self.y - 5);
            ctx.lineTo(self.x + 40, self.y - 30);
            ctx.lineTo(self.x + 120, self.y - 30);
            ctx.stroke();
        }
    };
    
    p.prototype._showWalls = function (ctx) {
        var self = this;
        
        ctx.fillStyle = "magenta";
        //Up
        if (self.walls[0]) {
            ctx.fillRect(0, 0, 640, 10);
        }
        
        //left
        if (self.walls[1]) {
            ctx.fillRect(0, 0, 10, 480);
        }
        
        //down
        if (self.walls[2]) {
            ctx.fillRect(0, 470, 640, 10);
        }

        //rigth
        if (self.walls[3]) {
            ctx.fillRect(630, 0, 10, 480);
        }
    };
    
    p.prototype.draw = function (ctx) {
        var self = this, i;
        
        ctx.fillStyle = "red";
        ctx.fillRect(self.x, self.y, self.width, self.height);
        
        ctx.lineWidth = 3;
        ctx.strokeStyle = "white";
        ctx.strokeRect(self.x, self.y, self.width, self.height);
        
        ctx.fillStyle = "white";
        ctx.fillRect(self.x - 1, self.y - 1, (((self.live * 100) / 255) * self.width) / 100, self.height + 2);
        
        ctx.fillStyle = "gray";
        for (i = 0; i < self.availableBullets; i += 1) {
            ctx.fillRect((10 * i) + 5, 460, 5, 5);
        }
        
        self._showLiveStatus(ctx);
        self._showWalls(ctx);
    };
    
    return p;
}());