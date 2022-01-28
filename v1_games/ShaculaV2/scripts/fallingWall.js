var FallingWall = {
    onInit: function (parameters) {
        this.x = parameters.x;
        this.y = parameters.y;
        this.width = 30;
        this.speed = parameters.fallSpeed;
        this.storedSpeed = parameters.fallSpeed;
        this.speedIncrease = 1.03;
        this.height = 30;
        this.moveToRect = { width: 30, height: 30, x: parameters.x, y: parameters.y };
        this.collideArea = { width: 30, height: 22, x: parameters.x, y: parameters.y + 8 };
        this.extCollideArea = { width: 30, height: 2, x: parameters.x, y: parameters.y };
        this.fakeCollider = { 
            width: 30, 
            height: (this.x + this.height) + (480 - (this.x + this.height)),
            x: parameters.x,
            y: parameters.y
        };
        this.isFalling = false;
        this.updatePointer = this.updateFall;
    },
    updateFall: function (delta) {
        if (jsGFwk.Collisions.areCollidingBy(this.fakeCollider, dracul, jsGFwk.Collisions.collidingModes.RECTANGLE)) {
            this.isFalling = true;
        }
        
        if (this.isFalling) {
            this.moveToRect.y = this.y + this.speed;
            
            if (!this.checkWallCollision()) {
                this.lastYCollide = 0;
                this.y += this.speed;
                this.collideArea.y = this.y + 8;
                this.extCollideArea.y = this.y;
                this.speed *= this.speedIncrease;
            } else {
                this.speed = this.storedSpeed;
                this.y = this.lastYCollide - (this.height + 1);
                //this.updatePointer = this.updateKill;
            }
        }
        
        if (dracul.isRectColliding(this.collideArea)) {
            dracul.kill();
        }
    },
    updateKill: function (delta) {
        if (dracul.isRectColliding(this.collideArea)) {
            dracul.kill();
        }
    },
    updatePointer: function () { },
    onUpdate: function (delta) {
        this.updatePointer(delta);
    },
    checkWallCollision: function () {
        var collide = false, self = this;
        
        for (var i = 0; i < Levels[GLOBAL.currentLevel].platforms.length; i++) {
            if (jsGFwk.Collisions.areCollidingBy(this.moveToRect,
                     Levels[GLOBAL.currentLevel].platforms[i],
                     jsGFwk.Collisions.collidingModes.RECTANGLE)) {
                collide = true;
                self.lastYCollide = Levels[GLOBAL.currentLevel].platforms[i].y;
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
            GLOBAL.movableWallContainer.eachCloned(function (item, event) {
                if (jsGFwk.Collisions.areCollidingBy(self.moveToRect, item,
                         jsGFwk.Collisions.collidingModes.RECTANGLE) && item.id !== self.id) {
                    self.lastYCollide = item.y;
                    collide = true;
                    event.cancel = true;
                }
            });
        }

        return collide;
    },
    onDraw: function (ctx) {
        ctx.drawImage(jsGFwk.Sprites.wall3.image, this.x, this.y);
    }
};