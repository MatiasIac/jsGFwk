/*global jsGFwk */
var Hud = (function () {
    "use strict";
    
    var hud = function () {
    };
    
    hud.prototype.id = "hud";
    hud.prototype.visible = true;
    hud.prototype.showText = true;
    hud.prototype.cosBarAccumulator = 0;
    hud.prototype.cosBars = 0;
    hud.prototype.gamePadConnected = false;
    hud.prototype.showScanline = false;
    hud.prototype.menuCurrentSelection = 0;
    hud.prototype.axisY = 0;
    hud.prototype.sPressed = false;
    hud.prototype.wPressed = false;
    hud.prototype.spacePressed = false;
    hud.prototype.secondButtonPressed = false;
    hud.prototype.menuTimer = null;
    
    hud.prototype.init = function () {
        var self = this;
                
        jsGFwk.settings.clearColor = "#FFCC00";
        jsGFwk.Camera.cameras.mainCamera.originPosition.x = 0;
        jsGFwk.Camera.cameras.mainCamera.originPosition.y = 0;
        
        enemyCloner.clearAll();
        bulletContainer.clearAll();
        wallsCloner.clearAll();
        tracerContainer.clearAll();
        bulletEnemyContainer.clearAll();
        
        self.showTextTime = new jsGFwk.Timer({
			action: function () {
                self.showText = !self.showText;
			},
            tickTime: 0.3
		});
        
        gameParameters.totalScreenCount += (gameParameters.totalScreenCount > gameParameters.screensCount ? 0 : gameParameters.screensCount - gameParameters.totalScreenCount);
        
        jsGFwk.Storage.setData({name: 'tecnoVirus_stored_game', data: gameParameters})
        
        self.gamePadConnected = false;
        
        self.menuTimer = new jsGFwk.Timer({
			action: function () {
                if (jsGFwk.Gamepad.pads[jsGFwk.Gamepad.PADTYPE.PAD0] !== undefined) {
                    self.axisY = jsGFwk.Gamepad.pads[jsGFwk.Gamepad.PADTYPE.PAD0].axes[1].toFixed(2);
                    self.secondButtonPressed = jsGFwk.Gamepad.pads[jsGFwk.Gamepad.PADTYPE.PAD0].buttons[1].pressed;
                }
                
                self.wPressed = jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.W];
                self.sPressed = jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.S];
                self.spacePressed = jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.SPACEBAR];
			},
            tickTime: 0.2
		});
    };
    
    hud.prototype.buy = function () {
        switch (this.menuCurrentSelection) {
            case 0:
                if (gameParameters.fireRate.toFixed(2) > 0.05 && 
                    gameParameters.point - 50 >= 0) {
                    gameParameters.fireRate -= 0.01;
                    gameParameters.point -= 50;
                } 
                break;
            case 1:
                if (gameParameters.liveRecover.toFixed(2) > 0.05 && 
                    gameParameters.point - 50 >= 0) {
                    gameParameters.liveRecover -= 0.01;
                    gameParameters.point -= 50;
                }
                break;
            case 2:
                if (gameParameters.reloadRate.toFixed(2) > 0.1 && 
                    gameParameters.point - 150 >= 0) {
                    gameParameters.reloadRate -= 0.1;
                    gameParameters.point -= 150;
                }
                break;
            case 3:
                if (gameParameters.speed.toFixed(2) < 5 && 
                    gameParameters.point - 200 >= 0) {
                    gameParameters.speed += 0.25;
                    gameParameters.point -= 200;
                }
                break;
        }
    };
    
    hud.prototype.update = function (delta) {
        this.showScanline = !this.showScanline;
        
        this.showTextTime.tick(delta);
        this.menuTimer.tick(delta);
        
        this.gamePadConnected = jsGFwk.Gamepad.pads[jsGFwk.Gamepad.PADTYPE.PAD0] !== undefined;
                
        if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.ENTER] ||
            (this.gamePadConnected && jsGFwk.Gamepad.pads[jsGFwk.Gamepad.PADTYPE.PAD0].buttons[0].pressed)) {
            jsGFwk.Scenes.scenes.game.enable();
        }
        
        //W
        if (this.wPressed || this.axisY < 0) {
            this.menuCurrentSelection = Math.max(0, this.menuCurrentSelection - 1);
            this.wPressed = false;
            this.axisY = 0;
        }

        //S
        if (this.sPressed || this.axisY > 0) {
            this.menuCurrentSelection = Math.min(3, this.menuCurrentSelection + 1);
            this.sPressed = false;
            this.axisY = 0;
        }
        
        if (this.spacePressed || this.secondButtonPressed) {
            this.spacePressed = false;
            this.buy();
        }
        
        this.cosBarAccumulator += 0.01;
        this.cosBars = Math.cos(this.cosBarAccumulator) * 5;
    };
    
    hud.prototype.draw = function (ctx) {
        ctx.drawImage(jsGFwk.Sprites.logo.image, 5, 76);
        
        ctx.fillStyle = "black";
        ctx.fillRect(426, 0, 214, 480);
        
        ctx.drawImage(this.menuCurrentSelection === 0 ? jsGFwk.Sprites.holderShadow.image : jsGFwk.Sprites.holder.image, 446, 70);
        ctx.drawImage(this.menuCurrentSelection === 1 ? jsGFwk.Sprites.holderShadow.image : jsGFwk.Sprites.holder.image, 446, 175);
        ctx.drawImage(this.menuCurrentSelection === 2 ? jsGFwk.Sprites.holderShadow.image : jsGFwk.Sprites.holder.image, 446, 284);
        ctx.drawImage(this.menuCurrentSelection === 3 ? jsGFwk.Sprites.holderShadow.image : jsGFwk.Sprites.holder.image, 446, 389);
        
        ctx.font = '30pt pixelated';
        ctx.fillText(gameParameters.fireRate.toFixed(2) <= 0.05 ? "max" : gameParameters.fireRate.toFixed(2), 445, 110);
        ctx.fillText(gameParameters.liveRecover.toFixed(2) <= 0.05 ? "max" : gameParameters.liveRecover.toFixed(2), 445, 215);
        ctx.fillText(gameParameters.reloadRate.toFixed(2) <= 0.1 ? "max" : gameParameters.reloadRate.toFixed(2), 445, 320);
        ctx.fillText(gameParameters.speed.toFixed(2) >= 5 ? "max" : gameParameters.speed.toFixed(2), 445, 430);

        ctx.fillText("Fire", 525, 105);
        ctx.fillText("Rate", 540, 120);
        
        ctx.fillText("Life", 525, 205);
        ctx.fillText("Recover", 530, 220);
        ctx.fillText("Rate", 535, 235);
        
        ctx.fillText("Reload", 525, 315);
        ctx.fillText("Rate", 540, 330);
        
        ctx.fillText("Speed", 525, 425);
        
        ctx.font = '18pt pixelated';
        ctx.fillText("- = 50", 540, 150);
        ctx.fillText("- = 50", 540, 255);
        ctx.fillText("- = 150", 540, 362);
        ctx.fillText("+ = 200", 540, 470);
                
        if (this.gamePadConnected) {
            ctx.font = '28pt pixelated';
            ctx.fillText("A gamepad is connected", 50, 450);
            
            if (this.showText) {
                ctx.font = '26pt pixelated';
                ctx.fillText("Press Fire to start", 70, 390);
            }
        } else {
            ctx.font = '18pt pixelated';
            ctx.fillText("A, S, D, W, SPACEBAR, M", 90, 350);
        
            if (this.showText) {
                ctx.font = '26pt pixelated';
                ctx.fillText("Press Enter to start", 60, 390);
            }
        }
        
        ctx.fillRect(408 + this.cosBars, 0, 13, 480);
        ctx.fillRect(397 - this.cosBars, 0, 8, 480);
        ctx.fillRect(388 + this.cosBars, 0, 5, 480);
        
        ctx.font = '16pt pixelated';
        ctx.fillStyle = "white";
        ctx.fillText("Credits: " + gameParameters.point, 450, 30);
        
        ctx.fillText("Systems hacked: " + gameParameters.totalScreenCount, 450, 50);
        
    };
    
    hud.prototype.postRender = function (ctx) {
        this.showScanline && ctx.drawImage(jsGFwk.ResourceManager.graphics.scanLines.image, 0, 0);
        crt(ctx);
    }
    
    return hud;
}());