var player = (function () {
    
    var p = function () {
        this.status = {
            x: 0,
            y: 0,
            backpack: []
        };

        this.actionState = {
            "CRAFTING": function () {

            },
            "WALKING": function () {

            },
            "IDLE": function () {

            }
        };
    };

    p.prototype.craft = function (item) {

    };

    p.prototype.moveTo = function (x, y) {

    };

    return p;

}());