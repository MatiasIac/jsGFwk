/*globals jsGFwk */
var Walls = (function () {
    "use strict";
    
    var wall = function () {
    };
        
	wall.prototype.x = 0;
    wall.prototype.y = 0;
    wall.prototype.width = 0;
    wall.prototype.height = 0;
    wall.prototype.isRectColliding = null;
    wall.prototype.cos = 0;
    wall.prototype.cosAcc = 0;
	    
	wall.prototype.onInit = function (parameters) {
		this.x = parameters.x;
		this.y = parameters.y;
		this.width = parameters.width;
		this.height = parameters.height;
        
        this.isRectColliding = jsGFwk.Collisions._rectColliding;
	};
    
	wall.prototype.onUpdate = function (delta) {
        this.cosAcc += 0.1;
        this.cos = 50 + parseInt(Math.cos(this.cosAcc) * 50);
	};
    
	wall.prototype.onDraw = function (ctx) {
        ctx.fillStyle = "rgb(" + this.cos + ", " + this.cos + ", " + this.cos + ")";
        ctx.shadowColor = "rgb(" + this.cos + ", " + this.cos + ", " + this.cos + ")";
        ctx.shadowBlur = cicleShadow;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        
        ctx.fillRect(this.x, this.y, this.width, this.height);
	};
    
    return wall;
}());