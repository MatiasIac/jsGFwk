/*globals jsGFwk */
var EndGame = (function () {
    "use strict";
    
    var end = function () {
        var self = this;
    };
    
    end.prototype.id = "endGame";
    end.prototype.visible = true;
    
    end.prototype.init = function () {
        var self = this;
    };
    
    end.prototype.update = function (delta) {
        if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.ENTER]) {
            jsGFwk.Scenes.scenes.hud.enable();
        }
    };
    
    end.prototype.draw = function (ctx) {
        ctx.fillStyle = "white";
        ctx.font = "50pt pixelated";
        ctx.fillText("You are dead, Alan", 40, 200);
        
        ctx.font = '20pt pixelated';
        ctx.fillText("Press Enter", 240, 350);
    };
    
    return end;
}());