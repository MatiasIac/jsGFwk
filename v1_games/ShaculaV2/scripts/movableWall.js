var MovableWall = {
    onInit: function (parameters) {
        this.x = parameters.x;
        this.y = parameters.y;
        this.width = 30;
        this.height = 30;
        this.speed = 1.2;
        this.speedMultiplier = 1.03;
        this.id = parameters.id;
        this.moveToRect = { width: 30, height: 30, x: parameters.x, y: parameters.y };
        this.head = parseInt(Math.random() * 3);
        this.lastYCollide = 0;
    },
    checkWallCollision: function () {
        var collide = false;
        var self = this;
        
        for (var i = 0; i < Levels[GLOBAL.currentLevel].platforms.length; i++) {
            if (jsGFwk.Collisions.areCollidingBy(this.moveToRect,
                     Levels[GLOBAL.currentLevel].platforms[i],
                     jsGFwk.Collisions.collidingModes.RECTANGLE)) {
                collide = true;
                this.lastYCollide = Levels[GLOBAL.currentLevel].platforms[i].y;
                break;
            }
        }
        
        if (!collide) {
            GLOBAL.leverContainer.eachCloned(function (item, event) {
                for (var i = 0; i < item.wallsToRender.length; i++) {
                    if (jsGFwk.Collisions.areCollidingBy(self.moveToRect, 
                        item.wallsToRender[i],
                        jsGFwk.Collisions.collidingModes.RECTANGLE) && item.currentPosition === 0) {
                        self.lastYCollide = item.wallsToRender[i].y;
                        collide = true;
                        event.cancel = true;
                        break;
                    }
                }
            });
        }
        
        if (!collide) {
            GLOBAL.fallingWallContainer.eachCloned(function (item, event) {
                if (jsGFwk.Collisions.areCollidingBy(self.moveToRect, item.collideArea,
                         jsGFwk.Collisions.collidingModes.RECTANGLE)) {
                    self.lastYCollide = item.collideArea.y;
                    collide = true;
                    event.cancel = true;
                }
            });
        }
        
        if (!collide) {
            GLOBAL.movableWallContainer.eachCloned(function (item, event) {
                if (jsGFwk.Collisions.areCollidingBy(self.moveToRect, item,
                         jsGFwk.Collisions.collidingModes.RECTANGLE) && item.id !== self.id) {
                    self.lastYCollide = item.y;
                    collide = true;
                    event.cancel = true;
                }
            });
        }
        
        if (!collide) {
            if (jsGFwk.Collisions.areCollidingBy(self.moveToRect, dracul, jsGFwk.Collisions.collidingModes.RECTANGLE)) {
                self.lastYCollide = dracul.y;
                collide = true;
            }
        }
                
        return collide;
    },
    canDisplace: function (toX) {
        this.moveToRect.y = this.y;
        this.moveToRect.x = this.x + toX;
            
        if (!this.checkWallCollision()) {
            this.x += toX;
            return true;
        }
        
        return false;
    },
    onUpdate: function (delta) {
        this.moveToRect.x = this.x;
        this.moveToRect.y = this.y + this.speed;
            
        if (!this.checkWallCollision()) {
            this.lastYCollide = 0;
            this.y += this.speed;
            this.speed *= this.speedMultiplier;
        } else {
            this.speed = 1.2;
            this.y = this.lastYCollide - (this.height + 1);
        }
        
        Levels[GLOBAL.currentLevel].movableWalls[this._containerElementPosition - 1].x = this.x;
        Levels[GLOBAL.currentLevel].movableWalls[this._containerElementPosition - 1].y = this.y;
    },
    onDraw: function (ctx) {
        ctx.drawImage(jsGFwk.Sprites.heads.spriteBag[this.head].image, this.x, this.y);
    }
};