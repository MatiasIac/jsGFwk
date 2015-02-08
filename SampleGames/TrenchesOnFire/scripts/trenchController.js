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
    tc.prototype.currentOffsetX = 0;
    
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
        case global.nodeTypes.vertical:
            posibilities.push(global.nodeTypes.vertical);
            posibilities.push(global.nodeTypes.codeDownRight);
            posibilities.push(global.nodeTypes.codeDownLeft);
            break;
        /*case global.nodeTypes.codeDownRight:
            posibilities.push(global.nodeTypes.codeRightUp);
            break;
        case global.nodeTypes.codeDownLeft:
            posibilities.push(global.nodeTypes.codeLeftUp);
            break;*/
        case global.nodeTypes.codeLeftUp:
        case global.nodeTypes.codeRightUp:
            posibilities.push(global.nodeTypes.vertical);
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
        var self = this, i = 0, howManyHorizontals = 0;
            
        //Create a new clon only if was moved one dimension
        if (self.lastClon.y >= 0) {
            
            // Is going to the right
            if (self.nextNode === global.nodeTypes.codeDownRight) {
                self.createAClone();
                
                self.trenchHorizontalDirection = global.trenchDirections.right;
                
                howManyHorizontals = Math.abs(global.trenchConfig.maxOffsetX - (self.currentOffsetX * self.trenchHorizontalDirection), 10);
                howManyHorizontals = Math.floor((Math.random() * howManyHorizontals) + 1);
                
                self.currentOffsetX += howManyHorizontals;
                
                for (i = 0; i < howManyHorizontals; i += 1) {
                    self.nextX += global.trenchConfig.trenchDefinition.width;
                    self.createAClone(global.nodeTypes.horizontal);
                }
                
                self.nextX += global.trenchConfig.trenchDefinition.width;
                self.createAClone(global.nodeTypes.codeRightUp);
                
                self.lastNode = global.nodeTypes.codeRightUp;
                self.nextNode = self.calculateNextNode();
                
            } else if (self.nextNode === global.nodeTypes.codeDownLeft) {
                //Now, if it is going left
                self.createAClone();
                self.trenchHorizontalDirection = global.trenchDirections.left;
                
                howManyHorizontals = Math.abs((global.trenchConfig.maxOffsetX * self.trenchHorizontalDirection) + self.currentOffsetX, 10);
                howManyHorizontals = Math.floor((Math.random() * howManyHorizontals) + 1);
                
                self.currentOffsetX -= howManyHorizontals;
                
                for (i = 0; i < howManyHorizontals; i += 1) {
                    self.nextX -= global.trenchConfig.trenchDefinition.width;
                    self.createAClone(global.nodeTypes.horizontal);
                }
                
                self.nextX -= global.trenchConfig.trenchDefinition.width;
                self.createAClone(global.nodeTypes.codeLeftUp);
                
                self.lastNode = global.nodeTypes.codeLeftUp;
                self.nextNode = self.calculateNextNode();
            } else {
                // Lets make the previous element
                self.createAClone();
                self.lastNode = self.nextNode;
                self.nextNode = self.calculateNextNode();
            }
        }
    };
    
    return tc;
}());