/*globals jsGFwk */
var enemyController = (function () {
    "use strict";
    
    var enemyController = function () {
    };
    
	enemyController.prototype.id = "enemyController";
	enemyController.prototype.enemyTimer = {};
    enemyController.prototype.enemyTimerTime = 4;
	enemyController.prototype.bigTimer = {};
    enemyController.prototype.bigTimerTime = 60;
	enemyController.prototype.order = 0;
	enemyController.prototype.visible = true;
    enemyController.prototype.enemies = null;
	
	enemyController.prototype.getObjectBasedOnCoords = function () {
		var x, y, speed, size;
		
		switch (this.order) {
        case 1:
            x = 320;
            y = -30;
            break;
        case 2:
            x = 670;
            y = 220;
            break;
        case 3:
            x = 320;
            y = 510;
            break;
        case 4:
            x = -30;
            y = 220;
            break;
		}
		
		return {
            x: x,
            y: y,
			speed: 50,
            color: 'rgb(' + parseInt((Math.random() * 255)) + ',' + parseInt((Math.random() * 255)) + ',' + parseInt((Math.random() * 255)) + ')'
        };
	};
	
	enemyController.prototype.init = function () {
		var self = this;
		
        this.totalShipsSent = 0;
		this.enemyTimer = new jsGFwk.Timer({
			action: function () {
				self.order += 1;
				if (self.order > 4) {
                    self.order = 1;
                }
                
                if (self.enemies.length() < 8) {
				    self.enemies.cloneObject(self.getObjectBasedOnCoords());
                }
			},
            tickTime: self.enemyTimerTime
		});
	};
    
	enemyController.prototype.update = function (delta) {
		this.enemyTimer.tick(delta);
	};
    
    return enemyController;
}());