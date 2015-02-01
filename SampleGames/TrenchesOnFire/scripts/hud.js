/*global jsGFwk, leftTrenchController, rightTrenchController, global*/

var hud = (function () {
    "use strict";
    
    var hud = function () {
        var self = this;
        
        self.fakeMouse = {
            x: 0,
            y: 0,
            width: 1,
            height: 1
        };
        
        jsGFwk.Collisions.onObjectCreated(self.fakeMouse);
        
        self.mouseClickId = -1;
    };
    
    hud.prototype.id = "hud";
    hud.prototype.visible = true;
    	
	hud.prototype.init = function (data) {
        var self = this;
                
		self.mouseClickId = jsGFwk.IO.mouse.registerClick(function (coord) {
            self.fakeMouse.x = coord.x;
			self.fakeMouse.y = coord.y;
			
			//if (self.fakeMouse.isRectColliding({})) {
            jsGFwk.IO.mouse.unregisterClick(self.mouseClickId);

            // Set visible or invisible based on how many players
            // are playing
            leftTrenchController.enabled = true;
            rightTrenchController.enabled = global.trenches === 2;

            jsGFwk.Scenes.scenes.game.enable();
			//}
        });
	};
	
	hud.prototype.update = function (delta) {
	};
	
	hud.prototype.draw = function (ctx) {
        ctx.save();
        ctx.drawImage(jsGFwk.Sprites.hud.spriteBag[0].image, 0, 0);
        ctx.drawImage(jsGFwk.Sprites.hud.spriteBag[1].image, 0, 0);
        ctx.drawImage(jsGFwk.Sprites.hud.spriteBag[2].image, 0, 0);
        ctx.drawImage(jsGFwk.Sprites.hud.spriteBag[3].image, 0, 0);
        ctx.restore();
	};
    
    return hud;
}());