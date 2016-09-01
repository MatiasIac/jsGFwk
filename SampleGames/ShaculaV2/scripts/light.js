var Light = {
    id: 'light',
    visible: true,
    diffLight: 0,
    diffLightSinc: 0,
    x: 0,
    y: 0,
    fallSpeed: 1.2,
    movement: { x: 0, y: 0, width: 6, height: 6 },
    isDropping: false,
    animAcc: 0,
    
    init: function () {
        this.updatePosition = this.updateNormal;
        jsGFwk.Sprites.torch.reset();
    },
    shakeLight: function (delta) {
		this.diffLight = (Math.sin(this.diffLightSinc) * 1);
		this.diffLightSinc += 0.5;
	},
    drop: function (offSet) {
        jsGFwk.Sprites.torch.reset();
        this.waitAcc = 0;
        this.fallSpeed = 1.2;
        this.isDropping = true;
        this.x = dracul.x + offSet;
        this.y = dracul.y + 20;
        this.movement.x = this.x;
        this.movement.y = this.y;
        this.updatePosition = this.updateDrop;
        this.drawPointer = this.drawDrop;
    },
    updateNormal: function () { 
        this.x = dracul.x + 10;
        this.y = dracul.y + 10;
    },
    
    checkWallCollision: function () {
        var collide = false, self = this;
        
        for (var i = 0; i < Levels[GLOBAL.currentLevel].platforms.length; i++) {
            if (jsGFwk.Collisions.areCollidingBy(this.movement,
                     Levels[GLOBAL.currentLevel].platforms[i],
                     jsGFwk.Collisions.collidingModes.RECTANGLE)) {
                collide = true;
                break;
            }
        }
        
        if (!collide) {
            GLOBAL.leverContainer.eachCloned(function (item, event) {
                for (var i = 0; i < item.wallsToRender.length; i++) {
                    if (jsGFwk.Collisions.areCollidingBy(self.movement,
                            item.wallsToRender[i],
                            jsGFwk.Collisions.collidingModes.RECTANGLE) && item.currentPosition === 0) {
                        collide = true;
                        event.cancel = true;
                        break;
                    }
                }
            });
        }
        
        if (!collide) {
            GLOBAL.movableWallContainer.eachCloned(function (item, event) {
                if (jsGFwk.Collisions.areCollidingBy(self.movement, item, jsGFwk.Collisions.collidingModes.RECTANGLE)) {
                    collide = true;
                    event.cancel = true;
                }
            });
        }
        
        return collide;
    },
    
    updateDrop: function (delta) {
        this.movement.y = this.y + this.fallSpeed;
                
        if (!this.checkWallCollision()) {
            this.animAcc += delta;
            if (this.animAcc > 0.1) {
                this.animAcc = 0;
                jsGFwk.Sprites.torch.next();
            }
            
            this.y += this.fallSpeed;
            this.fallSpeed *= 1.01;

            if (this.y > 480) {
                this.isDropping = false;
                this.updatePosition = this.updateNormal;
                this.drawPointer = function () {};
                GLOBAL.maxRadiusLight = GLOBAL.minRadiusLight;
            }
        } else {
            GLOBAL.maxRadiusLight -= 1;
            GLOBAL.maxRadiusLight = Math.max(GLOBAL.maxRadiusLight, 10);
            if (GLOBAL.maxRadiusLight <= 10) {
                this.isDropping = false;
                this.updatePosition = this.updateNormal;
                this.drawPointer = function () {};
                GLOBAL.maxRadiusLight = GLOBAL.minRadiusLight;
            }
        }        
    },
    updatePosition: function () { },
    update: function (delta) {
        this.updatePosition(delta);
        this.shakeLight(delta);
    },
    
    drawDrop: function (ctx) {
        ctx.drawImage(jsGFwk.Sprites.torch.sprite.image, this.x, this.y);
    },
    drawPointer: function() {},

    drawOil: function (context) {
        var totalOil = (((GLOBAL.lightOil * 100) / GLOBAL.maxOil) * 258) / 100;
        totalOil = totalOil < 1 ? 1 : totalOil;

        context.drawImage(jsGFwk.Sprites.oil.image,
            0, 0, 25, totalOil,
            576 + dracul.oilOffsetX, 
            (26 + dracul.oilOffsetY) + (258 - totalOil),
            25, totalOil);
        context.drawImage(jsGFwk.Sprites.oilWave.sprite.image, 
            576 + dracul.oilOffsetX, 
            (24 + dracul.oilOffsetY) + (258 - totalOil));
        context.drawImage(jsGFwk.Sprites.oilPipe.image, 576 + dracul.oilOffsetX, 25 + dracul.oilOffsetY);
        context.drawImage(jsGFwk.Sprites.topPipe.image, 570 + dracul.oilOffsetX, 0 + dracul.oilOffsetY);
        context.drawImage(jsGFwk.Sprites.lowerPipe.image, 570 + dracul.oilOffsetX, 283 + dracul.oilOffsetY);
    },

    drawLives: function (ctx) {
        for (var i = 0; i < GLOBAL.lives; i++) {
            ctx.drawImage(jsGFwk.Sprites.idleRight.spriteBag[0].image, (20 * i) + 15, 430);
        }
    },

    draw: function (ctx) {
        this.drawPointer(ctx);
        
        if (Levels[GLOBAL.currentLevel].foreground) {
            ctx.drawImage(jsGFwk.ResourceManager.graphics['level' + GLOBAL.currentLevel + "f"].image , 0, 0);
        }

        var gradient = ctx.createRadialGradient(this.x, this.y, 1, this.x + 5, this.y + 5, GLOBAL.maxRadiusLight + this.diffLight);
        gradient.addColorStop(0, "transparent");
        gradient.addColorStop(1, "black");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 640, 480);

        this.drawOil(ctx);

        this.drawLives(ctx);
    }
};