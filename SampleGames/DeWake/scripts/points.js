/*globals jsGFwk, point*/
var points = (function () {
    "use strict";
    
    var poin = function () {
        var self = this;
    };
    
    poin.prototype.id = "point";
    poin.prototype.visible = true;
    
    poin.prototype.init = function () {
        var self = this;
    };
    
    poin.prototype.update = function (delta) {
        var self = this;
        
    };
    
    poin.prototype.draw = function (ctx) {
        var self = this;
        ctx.fillStyle = "white";
        ctx.font = "40pt pixelated";
        ctx.fillText(point, 10, 30);
    };
    
    return poin;
}());