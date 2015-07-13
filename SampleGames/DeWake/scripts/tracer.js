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
        self.onUpdate = self._explodeUpdate;
    };
    
    c.prototype._explodeUpdate = function (delta) {
        var self = this;
        
        if (self.height <= 0) {
            self.destroy();
        }
        
        this.height -= 0.5;
        self.y -= 0.25;
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