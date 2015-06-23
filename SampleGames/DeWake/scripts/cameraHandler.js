/*global jsGFwk */
var CameraHandler = (function () {
    "use strict";
    
    var c = function () {
    };
    
    c.prototype.id = "cameraHandler";
    c.prototype.visible = false;
    c.prototype.camera = null;
    c.prototype.x = 0;
    c.prototype.y = 0;
    c.prototype.targetX = 0;
    c.prototype.targetY = 0;
    c.prototype.cameraSpeed = 50;
    c.prototype.isShaking = false;
    c.prototype.shakeTimer = null;
    
    c.prototype.init = function () {
        var self = this;
        this.isShaking = false;
        
        this.shakeTimer = new jsGFwk.Timer({
			action: function () {
                self.isShaking = false;
			},
            tickTime: 0.4
		});
    };
    
    c.prototype.shake = function () {
        this.isShaking = true;
    };
    
    c.prototype.update = function (delta) {
        var shakeX = 0, shakeY = 0;
        
        this.x += (this.targetX - this.x) / this.cameraSpeed;
		this.y += (this.targetY - this.y) / this.cameraSpeed;
		this.targetX = jsGFwk.getGameObjects().alan.x - 5;
		this.targetY = jsGFwk.getGameObjects().alan.y - 5;
        
        if (this.isShaking) {
            shakeX = Math.sin(1 + Math.random() * 10 * 2) * 10;
            shakeY = Math.cos(0.8 + Math.random() * 10 * 2) * 10;
        }
        
        this.camera.originPosition.x = (this.x - 320) + shakeX;
        this.camera.originPosition.y = (this.y - 240) + shakeY;
        
        this.shakeTimer.tick(delta);
    };
        
    return c;
}());