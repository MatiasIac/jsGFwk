/*global jsGFwk, global */
var trench = (function () {
    "use strict";
    
    var trench = function () {
    };
    
    trench.prototype.x = 0;
    trench.prototype.y = 0;
    trench.prototype.imageIndex = 0;
    	
	trench.prototype.onInit = function (data) {
		this.x = data.x;
        this.y = data.y;
        this.imageIndex = data.imageIndex;
	};
	
	trench.prototype.onUpdate = function (delta) {
        this.y += global.gameSpeed;
        
        if (this.y > global.gameDimension.height) {
            this.destroy();
        }
	};
	
	trench.prototype.onDraw = function (ctx) {
        ctx.drawImage(jsGFwk.Sprites.route.spriteBag[this.imageIndex].image, this.x, this.y);
	};
    
    return trench;
}());