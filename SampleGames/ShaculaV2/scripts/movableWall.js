var MovableWall = {
    onInit: function (parameters) {
        this.x = parameters.x;
        this.y = parameters.y;
        this.width = 30;
        this.height = 30;
        this.speed = 1.2;
        this.speedMultiplier = 1.005;
        this.id = parameters.id;
        this.moveToRect = { width: 30, height: 30, x: parameters.x, y: parameters.y };
        this.head = parseInt(Math.random() * 3);
    },
    checkWallCollision: function () {
        var collide = false;
        var self = this;
        
        for (var i = 0; i < Levels[GLOBAL.currentLevel].platforms.length; i++) {
            if (jsGFwk.Collisions.areCollidingBy(this.moveToRect,
                     Levels[GLOBAL.currentLevel].platforms[i],
                     jsGFwk.Collisions.collidingModes.RECTANGLE)) {
                collide = true;
                break;
            }
        }
        
        GLOBAL.leverContainer.eachCloned(function (item, event) {
            if (jsGFwk.Collisions.areCollidingBy(self.moveToRect, item.wall,
                     jsGFwk.Collisions.collidingModes.RECTANGLE) && item.currentPosition === 0) {
                collide = true;
                event.cancel = true;
            }
        });
        
        GLOBAL.fallingWallContainer.eachCloned(function (item, event) {
            if (jsGFwk.Collisions.areCollidingBy(self.moveToRect, item.collideArea,
                     jsGFwk.Collisions.collidingModes.RECTANGLE)) {
                collide = true;
                event.cancel = true;
            }
        });
        
        GLOBAL.movableWallContainer.eachCloned(function (item, event) {
            if (jsGFwk.Collisions.areCollidingBy(self.moveToRect, item,
                     jsGFwk.Collisions.collidingModes.RECTANGLE) && item.id !== self.id) {
                collide = true;
                event.cancel = true;
            }
        });
                
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
            this.y += this.speed;
            this.speed *= this.speedMultiplier;
        }
    },
    onDraw: function (ctx) {
        ctx.drawImage(jsGFwk.Sprites.heads.spriteBag[this.head].image, this.x, this.y);
    }
};