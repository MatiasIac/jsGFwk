class MouseIO {

    _name = "MouseIO";

    _mouseClickCounter = 0;
    _mouseClickCallers = { };
    _mouseMoveCallers = [];
    _mouseDownCounter = 0;
    _mouseDownCallers = { };
    _mouseWhellCallers = [];
    
    _lastDownCoords = {};
    _lastMoveCoords = {};
    _isMousePressed = false;

    constructor() { }
    
    _getCoordinates(e) {
        const deltaWheel = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
        const originalWheelValue = (e.wheelDelta || -e.detail);

        if (e.offsetX)
            return { x: e.offsetX, y: e.offsetY, wheel: { normalized: deltaWheel, delta: originalWheelValue } };
        else if (e.layerX)
            return { x: e.layerX, y: e.layerY, wheel: { normalized: deltaWheel, delta: originalWheelValue } };
        else
            return { x: e.pageX - this._canvas.offsetLeft, y: e.pageY - this._canvas.offsetTop, wheel: { normalized: deltaWheel, delta: originalWheelValue } };
    }
    
    _mouseDown(e) {
        this._isMousePressed = true;
        this._lastDownCoords = this._getCoordinates(e);

        for (let p in this._mouseDownCallers) {
            if (this._mouseDownCallers.hasOwnProperty(p)) {
                this._mouseDownCallers[p](this._lastDownCoords);
            }
        }
    }
    
    _mouseUp() {
        this._isMousePressed = false;

        for (let p in this._mouseClickCallers) {
            if (this._mouseClickCallers.hasOwnProperty(p)) {
                this._mouseClickCallers[p](this._lastDownCoords);
            }
        }
    }
    
    _mouseMove(e) {
        this._lastMoveCoords = this._getCoordinates(e);
        for (var i = 0; i < this._mouseMoveCallers.length; this._mouseMoveCallers[i++](this._lastMoveCoords));
    }

    _mouseWheel(e) {
        this._lastMoveCoords = this._getCoordinates(e);
        for (var i = 0; i < this._mouseWhellCallers.length; this._mouseWhellCallers[i++](this._lastMoveCoords));		    
    }
    
    registerClick(func) {
        this._mouseClickCallers[this._mouseClickCounter] = func;
        this._mouseClickCounter++;
        return (this._mouseClickCounter - 1);
    }
    
    registerMove(func) {
        this._mouseMoveCallers.push(func);
        return (this._mouseMoveCallers.length - 1);
    }

    registerDown(func) {
        this._mouseDownCallers[this._mouseDownCounter] = func;
        this._mouseDownCounter++;
        return (this._mouseDownCounter - 1);
    }

    registerWheel(func) {
        this._mouseWhellCallers.push(func);
        return (this._mouseWhellCallers.length - 1);
    }

    unregisterClick(id) { delete this._mouseClickCallers[id]; }

    unregisterMove(id) { this._mouseMoveCallers.splice(id, 1); }
    
    unregisterDown(id) { delete this._mouseDownCallers[id]; }

    unregisterWheel(id) { this._mouseWhellCallers.splice(id, 1); }

    onStart() {
        const self = this;

        this._canvas = document.getElementById(this._gfwk.settings.canvas);

		document.getElementById(this._gfwk.settings.canvas).addEventListener("mousedown", function(e) { self._mouseDown(e); }, false);
		document.getElementById(this._gfwk.settings.canvas).addEventListener("mouseup", function(e) { self._mouseUp(e); }, false);
		document.getElementById(this._gfwk.settings.canvas).addEventListener("mousemove", function(e) { self._mouseMove(e); }, false);
		document.getElementById(this._gfwk.settings.canvas).addEventListener("mousewheel", function(e) { self._mouseWheel(e); }, false);
		document.getElementById(this._gfwk.settings.canvas).addEventListener("DOMMouseScroll", function(e) { self._mouseWheel(e); }, false);        
	}
}

if (typeof module !== 'undefined' && module.exports) {
	module.exports = MouseIO;
}