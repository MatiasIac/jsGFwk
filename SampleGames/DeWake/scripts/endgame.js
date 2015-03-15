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

    };
    
    end.prototype.draw = function (ctx) {
        ctx.fillStyle = "white";
        ctx.font = "50pt pixelated";
        ctx.fillText("You are dead, Wake", 40, 200);
    };
    
    return end;
}());