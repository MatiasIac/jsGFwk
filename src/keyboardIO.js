class KeyboardIO {

    _name = "KeyboardIO";
    _keyboardCallers = [];
    _activeKey = [];
    _keyDownHandler = null;
    _keyUpHandler = null;

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
        if (this._keyDownHandler !== null || this._keyUpHandler !== null) { return; }

        this._keyDownHandler = this._keyPressed.bind(this);
        this._keyUpHandler = this._keyReleased.bind(this);

		document.addEventListener("keydown", this._keyDownHandler, false);
		document.addEventListener("keyup", this._keyUpHandler, false);
	}

    onStop() {
        if (this._keyDownHandler !== null) {
            document.removeEventListener("keydown", this._keyDownHandler, false);
            this._keyDownHandler = null;
        }

        if (this._keyUpHandler !== null) {
            document.removeEventListener("keyup", this._keyUpHandler, false);
            this._keyUpHandler = null;
        }

        this._activeKey = [];
    }
}

export { KeyboardIO };
