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
    
    hud.prototype.init = function () {
        var self = this;
        
        jsGFwk.settings.clearColor = "#FFCC00";
        jsGFwk.Camera.cameras.mainCamera.originPosition.x = 0;
        jsGFwk.Camera.cameras.mainCamera.originPosition.y = 0;
        
        enemyCloner.clearAll();
        bulletContainer.clearAll();
        wallsCloner.clearAll();
        
        self.showTextTime = new jsGFwk.Timer({
			action: function () {
                self.showText = !self.showText;
			},
            tickTime: 0.3
		});
        
        jsGFwk.Storage.setData({name: 'tecnoVirus_stored_game', data: gameParameters})
    };
    
    hud.prototype.update = function (delta) {
        this.showTextTime.tick(delta);
        
        if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.ENTER]) {
            jsGFwk.Scenes.scenes.game.enable();
        }
        
        this.cosBarAccumulator += 0.01;
        this.cosBars = Math.cos(this.cosBarAccumulator) * 5;
    };
    
    hud.prototype.draw = function (ctx) {
        ctx.drawImage(jsGFwk.Sprites.logo.image, 5, 76);
        
        ctx.fillStyle = "black";
        ctx.fillRect(426, 0, 214, 480);
        
        ctx.drawImage(jsGFwk.Sprites.holder.image, 446, 70);
        ctx.drawImage(jsGFwk.Sprites.holder.image, 446, 175);
        ctx.drawImage(jsGFwk.Sprites.holder.image, 446, 284);
        ctx.drawImage(jsGFwk.Sprites.holder.image, 446, 389);
        
        ctx.font = '30pt pixelated';
        ctx.fillText(gameParameters.fireRate, 445, 110);        
        ctx.fillText(gameParameters.liveRecover, 445, 215);
        ctx.fillText(gameParameters.reloadRate, 470, 320);
        ctx.fillText(gameParameters.speed, 470, 430);

        ctx.fillText("Fire", 525, 105);
        ctx.fillText("Rate", 540, 120);
        
        ctx.fillText("Life", 525, 205);
        ctx.fillText("Recover", 530, 220);
        ctx.fillText("Rate", 535, 235);
        
        ctx.fillText("Reload", 525, 315);
        ctx.fillText("Rate", 540, 330);
        
        ctx.fillText("Speed", 525, 425);
        
        ctx.font = '18pt pixelated';
        ctx.fillText("A, S, D, W, SPACEBAR", 100, 350);
        
        if (this.showText) {
            ctx.font = '26pt pixelated';
            ctx.fillText("Press Enter to start", 70, 390);
        }
        
        ctx.fillRect(408 + this.cosBars, 0, 13, 480);
        ctx.fillRect(397 - this.cosBars, 0, 8, 480);
        ctx.fillRect(388 + this.cosBars, 0, 5, 480);
        
        /*ctx.font = '22pt pixelated';
        ctx.fillText("Last score: " + gameParameters.point, 240, 400);*/
    };
    
    return hud;
}());