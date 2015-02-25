/*global puntos*/
var score = (function () {
    "use strict";
    
    var pun = function () {
    };
    
    pun.prototype.id = "puntos";
    pun.prototype.visible = true;
    
    pun.prototype.init = function () {
    };
    
    pun.prototype.update = function (delta) {
    };
    
    pun.prototype.draw = function (context) {
        context.fillStyle = "White";
        context.fillText("Puntos: " + puntos, 10, 10);
    };
    
    return pun;
}());