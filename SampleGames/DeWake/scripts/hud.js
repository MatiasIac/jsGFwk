/*global jsGFwk */
var Hud = (function () {
    "use strict";
    
    var hud = function () {
    };
    
    hud.prototype.id = "hud";
    hud.prototype.visible = true;
    hud.prototype.showText = true;
    
    hud.prototype.init = function () {
        var self = this;
        
        enemyCloner.clearAll();
        bulletContainer.clearAll();
        
        self.showTextTime = new jsGFwk.Timer({
			action: function () {
                self.showText = !self.showText;
			},
            tickTime: 0.3
		});
    };
    
    hud.prototype.update = function (delta) {
        this.showTextTime.tick(delta);
        
        if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.ENTER]) {
            jsGFwk.Scenes.scenes.game.enable();
        }
    };
    
    hud.prototype.draw = function (ctx) {
        ctx.fillStyle = 'white';
        ctx.font = '100pt pixelated';
        ctx.fillText("TecNoVirus", 60, 200);
        
        ctx.font = '18pt pixelated';
        ctx.fillText("A, S, D, W, SPACEBAR", 220, 250);
        
        if (this.showText) {
            ctx.font = '26pt pixelated';
            ctx.fillText("Press Enter to start", 180, 350);
        }
        
        ctx.font = '22pt pixelated';
        ctx.fillText("Last score: " + point, 240, 400);
    };
    
    return hud;
}());