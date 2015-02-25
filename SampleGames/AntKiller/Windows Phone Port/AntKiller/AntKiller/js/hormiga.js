/*global puntos*/
var hormiga = (function () {
    "use strict";
    
    var horm = function () {
        var self = this;
        
        self.fakeMouse = {
            x: 0,
            y: 0,
            width: 1,
            height: 1
        };
        
        jsGFwk.Collisions.onObjectCreated(self.fakeMouse);
    };
    
    horm.prototype.id = "hormiga";
    horm.prototype.visible = true;
    
    horm.prototype.x = 200;
    horm.prototype.y = 0;
    horm.prototype.width = 19;
    horm.prototype.height = 23;
    horm.prototype.mouseClickId = -1;
    
    horm.prototype.init = function () {
        var self = this;
        
        self.x = 200;
        self.y = 0;
        self.width = 19;
        self.height = 23;

        jsGFwk.Sprites.ant.reset();
        
        self.mouseClickId = jsGFwk.IO.mouse.registerClick(function (coord) {
            self.fakeMouse.x = coord.x;
			self.fakeMouse.y = coord.y;
            
            if (self.fakeMouse.isRectColliding(self)) {
                puntos += 1;
                self.y = 0;
            }
        });
    };
    
    horm.prototype.update = function (delta) {
        this.y += 1;
        
        jsGFwk.Sprites.ant.next();
        
        if (this.y > 640) {
            puntos -= 1;
            this.y = 0;
        }
    };
    
    horm.prototype.draw = function (context) {
        /*context.fillStyle = "red";
        context.fillRect(this.x, this.y, this.width, this.height);*/
        context.drawImage(jsGFwk.Sprites.ant.sprite.image, this.x, this.y);
    };
    
    return horm;
}());