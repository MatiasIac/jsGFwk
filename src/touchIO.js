class TouchIO {

    _name = "TouchIO";
    _touchCounter = 0;
    _touchCallers = { };

    constructor() { }

    _getCoordinates(e) {
        return { 
            x: e.changedTouches[0].clientX, 
            y: e.changedTouches[0].clientY
        };
    }

    _touchEnd(e) {
        const currentTouch = this._getCoordinates(e);

        for (let p in this._touchCallers) {
            if (this._touchCallers.hasOwnProperty(p)) {
                this._touchCallers[p](currentTouch);
            }
        }
    }

    registerTouch(func) {
        this._touchCallers[this._touchCounter] = func;
        this._touchCounter++;
        return (this._touchCounter - 1);
    }
    
    unregisterTouch(callerId) {
        delete this._touchCallers[callerId];
    }

    onStart() {
        const self = this;
        
        document.getElementById(this._gfwk.settings.canvas).addEventListener("touchend", function(e) { self._touchEnd(e); }, false);
	}
}

export { TouchIO };