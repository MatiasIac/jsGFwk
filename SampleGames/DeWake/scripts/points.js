/*global jsGFwk */
var Points = (function () {
    "use strict";
    
    var c = function () {
    };
    
    c.prototype.id = "point";
    c.prototype.visible = true;
    c.prototype.x = 0;
    c.prototype.y = 0;
    c.prototype.currentY = 0;
    
    c.prototype.onInit = function (parameters) {
        var self = this;
        self.x = parameters.x;
		self.y = parameters.y;
        self.currentY = self.y;
        self.value = parameters.value;
    };    
    c.prototype.onUpdate = function (delta) {
        var self = this;
        
        if (self.currentY <= self.y - 15) {
            self.destroy();
        }
        
        self.currentY -= 0.5;
    };
    
    c.prototype.onDraw = function (ctx) {
        ctx.fillStyle = "rgb(100," + cicleColorValue + "," + cicleColorValue + ")";;
        ctx.font = "30pt pixelated";
        ctx.fillText(this.value, this.x, this.currentY);
    };
        
    return c;
}());