/*global jsGFwk, global */
var trench = (function () {
    "use strict";
    
    var trench = function () {
    };
    
    trench.prototype.x = 0;
    trench.prototype.y = 0;
    trench.prototype.imageIndex = 0;
    	
	trench.prototype.onInit = function (data) {
		var self = this;
		self.x = data.x;
        self.y = data.y;
        self.imageIndex = data.imageIndex;
	};
	
	trench.prototype.onUpdate = function (delta) {
        var self = this;
        self.y += global.gameSpeed;
        
        if (self.y > global.gameDimension.height) {
            self.destroy();
        }
	};
	
	trench.prototype.onDraw = function (ctx) {
        var self = this;
        ctx.save();
        ctx.drawImage(jsGFwk.Sprites.route.spriteBag[self.imageIndex].image, self.x, self.y);
        ctx.restore();
	};
    
    return trench;
}());