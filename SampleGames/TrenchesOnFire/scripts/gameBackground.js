/*global jsGFwk, global */

var gameBackground = (function () {
    "use strict";
    
    var gameBackground = function () {
    };
    
    gameBackground.prototype.id = "gameBackground";
    gameBackground.prototype.visible = true;
    gameBackground.prototype.y = 0;
    	
	gameBackground.prototype.init = function () { };
	
	gameBackground.prototype.update = function (delta) {
        var self = this;
        self.y += global.gameSpeed;
        
        if (self.y >= global.gameDimension.height) {
            self.y = 0;
        }
    };
	
	gameBackground.prototype.draw = function (ctx) {
        var self = this;
        
        ctx.save();
        ctx.drawImage(jsGFwk.Sprites.background.image, 0, self.y - global.gameDimension.height);
        ctx.drawImage(jsGFwk.Sprites.background.image, 0, self.y);
        ctx.restore();
	};
    
    return gameBackground;
}());