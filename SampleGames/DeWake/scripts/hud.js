/*global jsGFwk */
var Hud = (function () {
    "use strict";
    
    var hud = function () {
    };
    
    hud.prototype.id = "hud";
    hud.prototype.visible = true;
    
    hud.prototype.init = function () {
        var self = this;
        
        point = 0;
        enemyCloner.clearAll();
        bulletContainer.clearAll();
    };
    
    hud.prototype.update = function (delta) {
        if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.ENTER]) {
            jsGFwk.Scenes.scenes.game.enable();
        }
    };
    
    hud.prototype.draw = function (ctx) {
        ctx.fillStyle = 'white';
        ctx.font = '160pt pixelated';
        ctx.fillText("DeWake", 70, 200);
        
        ctx.font = '20pt pixelated';
        ctx.fillText("Press Enter to start", 210, 350);
    };
    
    return hud;
}());