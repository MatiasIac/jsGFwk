var timer = (function () {
    var t = function () {
        this._listeners = [];
        this.timerId = -1;
    };

    t.prototype.stop = function () {
        clearInterval(this.timerId);
    };

    t.prototype.run = function () {
        this.timerId = setInterval(function () {
            for (var i = 0; i < this._listeners.length; i++) {
                this._listeners[i]();
            }
        }, 1000);
    };

    t.prototype.subscribe = function (f) {
        this._listeners.push(f);
    };

    return t;

}());