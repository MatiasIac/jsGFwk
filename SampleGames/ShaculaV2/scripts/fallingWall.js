var FallingWall = {
    onInit: function (parameters) {
        this.x = parameters.x;
        this.y = parameters.y;
        this.width = 30;
        this.speed = parameters.fallSpeed;
        this.speedIncrease = 1.03;
        this.height = 30;
        this.moveToRect = { width: 30, height: 30, x: parameters.x, y: parameters.y };
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
                this.y += this.speed;
                this.speed *= this.speedIncrease;
            } else {
                this.updatePointer = this.updateKill;
            }
        }
        
        if (dracul.isRectColliding(this)) {
            dracul.kill();
        }
    },
    updateKill: function (delta) {
        if (dracul.isRectColliding(this)) {
            dracul.kill();
        }
    },
    updatePointer: function () { },
    onUpdate: function (delta) {
        this.updatePointer(delta);
    },
    checkWallCollision: function () {
        var collide = false;
        
        for (var i = 0; i < Levels[GLOBAL.currentLevel].platforms.length; i++) {
            if (jsGFwk.Collisions.areCollidingBy(this.moveToRect,
                     Levels[GLOBAL.currentLevel].platforms[i],
                     jsGFwk.Collisions.collidingModes.RECTANGLE)) {
                collide = true;
                break;
            }
        }
                
        return collide;
    },
    onDraw: function (ctx) {
        ctx.drawImage(jsGFwk.Sprites.wall3.image, this.x, this.y);
    }
};