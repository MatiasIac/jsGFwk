/*global jsGFwk */
var Tracer = (function () {
    "use strict";
    
    var c = function () {
    };
    
    c.prototype.id = "tracer";
    c.prototype.visible = true;
    c.prototype.x = 0;
    c.prototype.y = 0;
    c.prototype.size = 15;
    
    c.prototype.onInit = function (parameters) {
        var self = this;
        self.x = parameters.x;
		self.y = parameters.y;
        self.width = parameters.size;
        self.height = parameters.size;
    };
    
    c.prototype.explode = function () {
        var self = this;
        
        bulletContainer.cloneObject({
            x: self.x + (this.size / 2),
            y: self.y + (this.size / 2),
            direction: parseInt(Math.random() * 8)
        });
        
        laserJuke.play();
        jsGFwk.getGameObjects().alan.live -= 4;
        self.destroy();
    };
    
    c.prototype.onUpdate = function (delta) {
        var self = this;
        
        if (self.width <= 0) {
            self.destroy();
        }
        
        this.width -= 0.1;
        this.height -= 0.1;
        self.x -= 0.05;
        self.y -= 0.05;
    };
    
    c.prototype.onDraw = function (ctx) {
        ctx.strokeStyle = "gray";
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    };
        
    return c;
}());