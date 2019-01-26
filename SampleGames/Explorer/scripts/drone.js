var dronTypes = {
    "DRILL": 0, //mineral
    "OXYGEN": 1, //oxygen
    "WATER": 2, //water
    "SCOUT": 3,
    "FARMER": 4 // food
};

var drone = (function () {
    var d = function (typeOfDrone) {
        this.status = {
            x: 0,
            y: 0,
            energy: 0,
            tank: 0,
            type: typeOfDrone
        };
    };

    d.prototype.produce = function () {

    };

    d.prototype.move = function (x, y) {

    };

    return d;

}());