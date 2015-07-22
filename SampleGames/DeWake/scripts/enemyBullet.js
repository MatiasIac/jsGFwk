/*globals jsGFwk */
var EnemyBullet = (function () {
    "use strict";
    
    var b = function () {
    };
        
	b.prototype.x = 0;
    b.prototype.y = 0;
    b.prototype.angle = 0;
    b.prototype.bulletSpeed = 10;
    b.prototype.width = 5;
    b.prototype.height = 5;
    b.prototype.isRectColliding = null;
    b.prototype.tracerTimer = null;
    b.prototype.color = "";
	    
	b.prototype.onInit = function (parameters) {
        var self = this;
        
		this.x = parameters.x;
		this.y = parameters.y;
        this.color = parameters.color;
        
        var targetX = jsGFwk.getGameObjects().alan.x - this.x;
        var targetY = jsGFwk.getGameObjects().alan.y - this.y;
        this.angle = (Math.atan2(targetY, targetX) * 180 / Math.PI) * 0.0174532925199432957;

        this.isRectColliding = jsGFwk.Collisions._rectColliding;
        
        this.tracerTimer = new jsGFwk.Timer({
			action: function () {
                tracerContainer.cloneObject({ 
                    x: self.x + Math.floor(Math.random() * 10),
                    y: self.y + Math.floor(Math.random() * 10),
                    size: (Math.random() * self.width) + 2,
                    color: self.color});
			},
            tickTime: 0.1
		});
	};
    
	b.prototype.onUpdate = function (delta) {
        var self = this;
        
        if(this.x > 640 || this.x < 0 || this.y > 480 || this.y < 0){
            this.destroy();
        } else {
            this.x += this.bulletSpeed * Math.cos(this.angle);
            this.y += this.bulletSpeed * Math.sin(this.angle);
        }
        
        if (this.isRectColliding(jsGFwk.getGameObjects().alan)) {
            jsGFwk.getGameObjects().alan.live -= 30;
            jsGFwk.getGameObjects().cameraHandler.shake();
            
            for (var i = 0; i <= 4; i++) {
                tracerContainer.cloneObject({ 
                    x: this.x + Math.floor(Math.random() * 10),
                    y: this.y + Math.floor(Math.random() * 10),
                    size: (Math.random() * 5) + 5,
                    color: this.color});
            }
            
            this.destroy();
        }
        
        this.tracerTimer.tick(delta);
	};
    
	b.prototype.onDraw = function (ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
	};
    
    return b;
    
}());