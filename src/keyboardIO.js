class KeyboardIO {

    _name = "KeyboardIO";
    _keyboardCallers = [];
    _activeKey = [];

    static KEYS = {
        "A": 65,
        "D": 68,
        "I": 73,
        "J": 74,
        "K": 75,
        "L": 76,
        "N": 78,
        "S": 83,
        "W": 87,
        "M": 77,
        "N": 78,
        "C": 67,
        "ONE": 49,
        "TWO": 50,
        "THREE": 51,
        "SHIFT": 16,
        "SPACEBAR": 32,
        "ENTER": 13,
        "CONTROL": 17
    };

    constructor() { }

    _stopPropagation() { }

    _keyReleased(e) {
        delete this._activeKey[e.which];
    }

    _keyPressed(e) {
        this._stopPropagation(e);
        for (let i = 0; i < this._keyboardCallers.length; this._keyboardCallers[i++](e.which));
        this._activeKey[e.which] = true;
    }

    eventPropagation(propagate) {
        this._stopPropagation = propagate ? function () { } : function (e) { e.preventDefault(); };
    }

    getActiveKeys() {
        return this._activeKey;
    };
    
    registerKeypress(func) {
        this._keyboardCallers.push(func);
        return (this._keyboardCallers.length - 1);
    };
    
    unregisterKeypress(callerId) {
        this._keyboardCallers.splice(callerId, 1);
    }

    onStart() {
        const self = this;

		document.addEventListener("keydown", function(e) { self._keyPressed(e); }, false);
		document.addEventListener("keyup", function(e) { self._keyReleased(e); }, false);
	}
}

export { KeyboardIO };