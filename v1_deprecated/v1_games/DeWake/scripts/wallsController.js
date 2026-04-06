/*globals jsGFwk */
var wallsController = (function () {
    "use strict";
    
    var wallsController = function () {
    };
    
	wallsController.prototype.id = "wallsController";
	wallsController.prototype.visible = true;
    wallsController.prototype.walls = null;
		
	wallsController.prototype.init = function () {
	};
    
    wallsController.prototype.enterOnScene = function () {
		var howMany = parseInt(Math.random() * 25) + Math.min(gameParameters.screensCount, 10);
        
        for (var i = 0; i < howMany; i++) {
            this.walls.cloneObject({
                width: parseInt(Math.random() * 50) + 10,
                height: parseInt(Math.random() * 50) + 10,
                x: parseInt(Math.random() * 500) + 40,
                y: parseInt(Math.random() * 350) + 40
            });
        }
	};
    
	wallsController.prototype.update = function (delta) {
	};
    
    return wallsController;
}());