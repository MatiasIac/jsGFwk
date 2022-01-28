/*global jsGFwk, point */
var Bullet = (function () {
    "use strict";
    
    var bullet = function () {
    };
    
    bullet.prototype.x = 0;
    bullet.prototype.y = 0;
    bullet.prototype.speed = 6;
    bullet.prototype.isRectColliding = null;
    bullet.prototype.width = 5;
    bullet.prototype.height = 5;
    	
	bullet.prototype.onInit = function (data) {
        var gunPositionToAngle = {
            "0": 90,
            "1": 270,
            "2": 0,
            "3": 315,
            "4": 45,
            "5": 180,
            "6": 225,
            "7": 135
        };
        
        this.isRectColliding = jsGFwk.Collisions._rectColliding;
        
		this.x = data.x;
        this.y = data.y;
        this.angle = gunPositionToAngle[data.direction] * 0.0174532925199432957;
	};
	
	bullet.prototype.onUpdate = function (delta) {
        var self = this;
        this.x += this.speed * Math.cos(this.angle);
        this.y += this.speed * Math.sin(this.angle);
        
        if (this.y > 480 || this.y < 0 || this.x < -10 || this.x > 640) {
            this.destroy();
        } else {
            jsGFwk.getGameObjects().enemyCloner.eachCloned(function (item) {
                if (self.isRectColliding(item)) {
                    if (item.width <= 20) {
                        gameParameters.point += 1;
                        item.destroy();
                        
                        pointsContainer.cloneObject({ x: item.x, y: item.y, value: 1 });
                    } else {
                        item.shrink();
                    }
                    
                    for (var i = 0; i <= 4; i++) {
                        tracerContainer.cloneObject({ 
                            x: self.x + Math.floor(Math.random() * 10),
                            y: self.y + Math.floor(Math.random() * 10),
                            size: (Math.random() * 5) + 5,
                            color: "cyan"});
                    }
                    
                    explodeJuke.play();
                    self.destroy();
                }
            });
        }
	};
	
	bullet.prototype.onDraw = function (ctx) {
        ctx.fillStyle = "cyan";
        ctx.fillRect(this.x, this.y, 5, 5);
	};
    
    return bullet;
}());