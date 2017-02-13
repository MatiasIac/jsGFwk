/*
 * Adding the module as an import if module.exports is present.
 */
if (typeof module !== 'undefined' && module.exports) {
	var jsGFwk = {};
}

jsGFwk.IO = {
	_plugInName: "IO",
	_loaded: false,
	keyboard: {
		_keyboardCallers: [],
		_activeKey: [],
		_stopPropagation: function () {},
		eventPropagation: function (propagate) {
			if (propagate) {
				this._stopPropagation = function () {};
			} else {
				this._stopPropagation = function (e) { e.preventDefault(); };
			}
		},
		_keyReleased: function(e) {
			delete jsGFwk.IO.keyboard._activeKey[e.which];
		},
		_keyPressed: function(e) {
			jsGFwk.IO.keyboard._stopPropagation(e);
			for (i = 0; i < jsGFwk.IO.keyboard._keyboardCallers.length; jsGFwk.IO.keyboard._keyboardCallers[i++](e.which));
			jsGFwk.IO.keyboard._activeKey[e.which] = true;
		},
		
		key: {
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
		},
		
		getActiveKeys: function() {
			return this._activeKey;
		},
		
		registerKeypress: function(f) {
			this._keyboardCallers.push(f);
			return (this._keyboardCallers.length - 1);
		},
		
		unregisterKeypress: function(callerId) {
			this._keyboardCallers.splice(callerId, 1);
		}
	},
	
	mouse: {
		_mouseClickCounter: 0,
		_mouseClickCallers: {},
		_mouseMoveCallers: [],
        _mouseDownCounter: 0,
		_mouseDownCallers: {},
	    _mouseWhellCallers: [],
		
		_lastDownCoords: {},
		_lastMoveCoords: {},
		_isMousePressed: false,
		
		_getCoordinates: function (e) {
		    var deltaWheel = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
		    var originalWheelValue = (e.wheelDelta || -e.detail);

			if (e.offsetX)
			    return { x: e.offsetX, y: e.offsetY, wheel: { normalized: deltaWheel, delta: originalWheelValue } };
			else if (e.layerX)
			    return { x: e.layerX, y: e.layerY, wheel: { normalized: deltaWheel, delta: originalWheelValue } };
			else
			    return { x: e.pageX - jsGFwk._canvas.offsetLeft, y: e.pageY - jsGFwk._canvas.offsetTop, wheel: { normalized: deltaWheel, delta: originalWheelValue } };
		},
		
		_mouseDown: function(e) {
			jsGFwk.IO.mouse._isMousePressed = true;
			jsGFwk.IO.mouse._lastDownCoords = jsGFwk.IO.mouse._getCoordinates(e);
            for (var p in jsGFwk.IO.mouse._mouseDownCallers) {
				if (jsGFwk.IO.mouse._mouseDownCallers.hasOwnProperty(p)) {
					jsGFwk.IO.mouse._mouseDownCallers[p](jsGFwk.IO.mouse._lastDownCoords);
				}
			}
        },
		
		_mouseUp: function() {
			jsGFwk.IO.mouse._isMousePressed = false;
			for (var p in jsGFwk.IO.mouse._mouseClickCallers) {
				if (jsGFwk.IO.mouse._mouseClickCallers.hasOwnProperty(p)) {
					jsGFwk.IO.mouse._mouseClickCallers[p](jsGFwk.IO.mouse._lastDownCoords);
				}
			}
			/*for (var i = 0; i < jsGFwk.IO.mouse._mouseClickCallers.length; i++) {
                if (jsGFwk.IO.mouse._mouseClickCallers[i](jsGFwk.IO.mouse._lastDownCoords)) {
                    break;
                }
            }*/
		},
		
		_mouseMove: function(e) {
			jsGFwk.IO.mouse._lastMoveCoords = jsGFwk.IO.mouse._getCoordinates(e);
			for (var i = 0; i < jsGFwk.IO.mouse._mouseMoveCallers.length; jsGFwk.IO.mouse._mouseMoveCallers[i++](jsGFwk.IO.mouse._lastMoveCoords));
		},

		_mouseWheel: function (e) {
		    jsGFwk.IO.mouse._lastMoveCoords = jsGFwk.IO.mouse._getCoordinates(e);
		    for (var i = 0; i < jsGFwk.IO.mouse._mouseWhellCallers.length; jsGFwk.IO.mouse._mouseWhellCallers[i++](jsGFwk.IO.mouse._lastMoveCoords));		    
		},
		
		registerClick: function(f) {
			this._mouseClickCallers[this._mouseClickCounter] = f;
			this._mouseClickCounter++;
			return (this._mouseClickCounter - 1);
		},
		
		unregisterClick: function(callerId) {
			delete this._mouseClickCallers[callerId];
		},
		
		registerMove: function(f) {
			this._mouseMoveCallers.push(f);
			return (this._mouseMoveCallers.length - 1);
		},
		
		unregisterMove: function(callerId) {
			this._mouseMoveCallers.splice(callerId, 1);
		},

	    registerDown: function(f) {
            this._mouseDownCallers[this._mouseDownCounter] = f;
			this._mouseDownCounter++;
			return (this._mouseDownCounter - 1);
	    },
		
        unregisterDown: function(callerId) {
            delete this._mouseDownCallers[callerId];
        },

        registerWheel: function (f) {
            this._mouseWhellCallers.push(f);
            return (this._mouseWhellCallers.length - 1);
        },

        unregisterWheel: function (callerId) {
            this._mouseWhellCallers.splice(callerId, 1);
        }
	},
    
    touch: {
        _touchCounter: 0,
        _touchCallers: {},
        _getCoordinates: function (e) {
            return { 
                x: e.changedTouches[0].clientX, 
                y: e.changedTouches[0].clientY
            };
        },
        _touchEnd: function (e) {
            var currentTouch = jsGFwk.IO.touch._getCoordinates(e);
            for (var p in jsGFwk.IO.touch._touchCallers) {
				if (jsGFwk.IO.touch._touchCallers.hasOwnProperty(p)) {
					jsGFwk.IO.touch._touchCallers[p](currentTouch);
				}
			}
        },
        registerTouch: function (f) {
            this._touchCallers[this._touchCounter] = f;
			this._touchCounter++;
			return (this._touchCounter - 1);
        },
        unregisterTouch: function (callerId) {
            delete this._touchCallers[callerId];
        }
    },
	
	onStart: function() {
		//Register all listeners
		document.addEventListener("keydown", this.keyboard._keyPressed, false);
		document.addEventListener("keyup", this.keyboard._keyReleased, false);
		
		document.getElementById(jsGFwk.settings.canvas).addEventListener("mousedown", this.mouse._mouseDown, false);
		document.getElementById(jsGFwk.settings.canvas).addEventListener("mouseup", this.mouse._mouseUp, false);
		document.getElementById(jsGFwk.settings.canvas).addEventListener("mousemove", this.mouse._mouseMove, false);
		document.getElementById(jsGFwk.settings.canvas).addEventListener("mousewheel", this.mouse._mouseWheel, false);
		document.getElementById(jsGFwk.settings.canvas).addEventListener("DOMMouseScroll", this.mouse._mouseWheel, false);
        
        document.getElementById(jsGFwk.settings.canvas).addEventListener("touchend", this.touch._touchEnd, false);
	},
	onLoadReady: function () {
		jsGFwk.include(this._plugInName);
		if (!this._loaded) { this._loaded = true; this.onStart(); }
	}
};

/**
 * We export it if we enable it only on node.
 * 
 */
if (typeof module !== 'undefined' && module.exports) {
	module.exports = require('./node-exporter')(jsGFwk);
}