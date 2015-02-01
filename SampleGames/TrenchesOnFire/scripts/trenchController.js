/*global global, trenchContainer */
var trenchController = (function () {
    "use strict";
    
    var tc = function (configuration) {
        var self = this;
        self.config = configuration;
    };
    
    tc.prototype.id = "trenchController";
    tc.prototype.visible = false;
    tc.prototype.enabled = true;
    tc.prototype.lastNode = global.nodeTypes.vertical;
    tc.prototype.nextNode = global.nodeTypes.vertical;
    tc.prototype.trenchHorizontalDirection = global.trenchDirections.right;
    tc.prototype.nextX = 0;
    tc.prototype.lastClon = null;
    
    
    tc.prototype.init = function () {
        var self = this;
        if (!self.enabled) {
            //Detach events
            self.update = self.dettachedUpdate;
        } else {
            //Attach events
            self.lastClon = {
                x: self.config.x
            };
            
            self.trenchHorizontalDirection = self.config.trenchDirection;
            
            self.nextX = self.config.x;
            self.createAClone();
            self.update = self.finalUpdate;
        }
	};
	
    /* Update and drawing pointers */
    tc.prototype.update = function (delta) {};
    tc.prototype.draw = function (ctx) {};
    tc.prototype.dettachedUpdate = function (delta) {};
    /* End of pointers */
    
    tc.prototype.calculateNextNode = function () {
        var self = this, posibilities = [],
            shakingResult = -1, result = -1;
        
        switch (self.lastNode) {
        case global.nodeTypes.codeRightUp:
        case global.nodeTypes.vertical:
            posibilities.push(global.nodeTypes.vertical);
            posibilities.push(global.nodeTypes.codeDownRight);
            posibilities.push(global.nodeTypes.codeDownLeft);
            break;
        case global.nodeTypes.codeDownRight:
            posibilities.push(global.nodeTypes.codeRightUp);
            break;
        case global.nodeTypes.codeLeftUp:
            posibilities.push(global.nodeTypes.vertical);
            posibilities.push(global.nodeTypes.codeDownRight);
            posibilities.push(global.nodeTypes.codeDownLeft);
            break;
        case global.nodeTypes.codeDownLeft:
            posibilities.push(global.nodeTypes.codeLeftUp);
            break;
        }
        
        shakingResult = Math.floor((Math.random() * posibilities.length));
        result = posibilities[shakingResult];
        
        self.trenchHorizontalDirection = result === global.nodeTypes.codeDownRight ? global.trenchDirections.right : result === global.nodeTypes.codeDownLeft ? global.trenchDirections.left : self.trenchHorizontalDirection;
        return result;
    };
    
    tc.prototype.createAClone = function (nodeType) {
        var self = this;
        self.lastClon = trenchContainer.cloneObject({
            x: self.nextX,
            y: -global.trenchConfig.trenchDefinition.height,
            imageIndex: nodeType || self.nextNode
        });
    };
    
    tc.prototype.finalUpdate = function (delta) {
        var self = this, i = 0;
            
        //Create a new clon only if was moved one dimension
        if (self.lastClon.y >= 0) {
            self.createAClone();
            
            if (self.nextNode === global.nodeTypes.codeDownRight || self.nextNode === global.nodeTypes.codeDownLeft) {
                for (i = 0; i < 3; i += 1) {
                    self.nextX += (global.trenchConfig.trenchDefinition.width * self.trenchHorizontalDirection);
                    self.createAClone(global.nodeTypes.horizontal);
                }
            }
            
            self.lastNode = self.nextNode;
            self.nextNode = self.calculateNextNode();
        }
    };
    
    return tc;
}());