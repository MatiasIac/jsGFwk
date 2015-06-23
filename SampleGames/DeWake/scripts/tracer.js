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
        self.size = parameters.size;
    };
    
    c.prototype.onUpdate = function (delta) {
        var self = this;
        
        if (self.size <= 0) {
            self.destroy();
        }
        
        this.size -= 0.1;
        self.x -= 0.05;
        self.y -= 0.05;
    };
    
    c.prototype.onDraw = function (ctx) {
        ctx.strokeStyle = "gray";
        ctx.strokeRect(this.x, this.y, this.size, this.size);
    };
        
    return c;
}());