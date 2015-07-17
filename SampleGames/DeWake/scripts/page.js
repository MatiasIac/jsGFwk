/*global jsGFwk, point */
var Page = (function () {
    "use strict";
    
    var page = function () {
    };
    
    page.prototype.id = "page";
    page.prototype.visible = false;
    
    page.prototype.x = 0;
    page.prototype.y = 0;
    page.prototype.width = 10;
    page.prototype.height = 15;
    page.prototype.fillColor = "white";
    page.prototype.fillColorTime = null;
        
    page.prototype.init = function () {
        var self = this;
        
        this.fillColorTime = new jsGFwk.Timer({
			action: function () {
                if (self.fillColor === "white") {
                    self.fillColor = "gray";
                } else {
                    self.fillColor = "white";
                }
			},
            tickTime: 0.01
		});
    };
    
    page.prototype.hidePage = function () {
        var self = this;
        self.visible = false;
    };
    
    page.prototype.showPage = function () {
        var self = this;
        self.visible = true;
        self.x = (Math.random() * 600) + 20;
        self.y = (Math.random() * 450) + 10;
        
        if (enemyControl.enemyTimer.tickTime > 1) {
            enemyControl.enemyTimer.tickTime -= 1;
        }
    };
    
    page.prototype.update = function (delta) {
        this.fillColorTime.tick(delta);
        
        if (this.visible) {
            var alan = jsGFwk.getGameObjects().alan;
            if (this.isRectColliding(alan)) {
                this.visible = false;
                gameParameters.point += 10;
                jsGFwk.getGameObjects().alan.availableBullets += 5;
                jsGFwk.getGameObjects().alan.live = Math.min(255, jsGFwk.getGameObjects().alan.live + 10);
                
                pointsContainer.cloneObject({ x: alan.x, y: alan.y, value: 10 });
            }
        }
    };
    
    page.prototype.draw = function (ctx) {
        ctx.fillStyle = this.fillColor;
        ctx.shadowColor = "white";
        ctx.shadowBlur = 20;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;

        ctx.fillRect(this.x, this.y, this.width, this.height);
    };
    
    return page;
}());