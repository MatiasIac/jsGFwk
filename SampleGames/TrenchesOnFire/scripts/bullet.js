/*global jsGFwk, global */
var Bullet = (function () {
    "use strict";
    
    var bullet = function () {
    };
    
    bullet.prototype.x = 0;
    bullet.prototype.y = 0;
    bullet.prototype.imageIndex = 0;
    bullet.prototype.angle = 0;
    	
	bullet.prototype.onInit = function (data) {
		this.x = data.x;
        this.y = data.y;
        this.speed = data.data.bulletSpeed;
        this.direction = data.shotDirection;
        
        this.angle = global.getAngle(global.gunPositionToAngle[this.direction]);
	};
	
	bullet.prototype.onUpdate = function (delta) {
        this.x += this.speed * Math.cos(this.angle);
        this.y += this.speed * Math.sin(this.angle);
        this.imageIndex += 1;
        this.imageIndex = this.imageIndex % 2;
        
        if (this.y > global.gameDimension.height || this.y < 0 || this.x < -10 || this.x > global.gameDimension.width) {
            this.destroy();
        }
	};
	
	bullet.prototype.onDraw = function (ctx) {
        ctx.drawImage(jsGFwk.Sprites.bullet.spriteBag[this.imageIndex].image, this.x, this.y);
	};
    
    return bullet;
}());