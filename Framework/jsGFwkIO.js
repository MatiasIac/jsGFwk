jsGFwk.IO = {
	_plugInName: "IO",
	_loaded: false,
	keyboard: {
		_keyboardCallers: [],
		_activeKey: [],
		_stopPropagation: function () {},
		_eventPropagation: function (propagate) {
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
			jsGFwk.IO.keyboard._stopPropagation();
			for (i = 0; i < jsGFwk.IO.keyboard._keyboardCallers.length; jsGFwk.IO.keyboard._keyboardCallers[i++](e.which));
			jsGFwk.IO.keyboard._activeKey[e.which] = true;
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
		_mouseClickCallers: [],
		_mouseMoveCallers: [],
		_mouseDownCallers: [],
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
			for (var i = 0; i < jsGFwk.IO.mouse._mouseDownCallers.length; jsGFwk.IO.mouse._mouseDownCallers[i++](jsGFwk.IO.mouse._lastDownCoords));
		},
		
		_mouseUp: function() {
			jsGFwk.IO.mouse._isMousePressed = false;
			for (var i = 0; i < jsGFwk.IO.mouse._mouseClickCallers.length; jsGFwk.IO.mouse._mouseClickCallers[i++](jsGFwk.IO.mouse._lastDownCoords));
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
			this._mouseClickCallers.push(f);
			return (this._mouseClickCallers.length - 1);
		},
		
		unregisterClick: function(callerId) {
			this._mouseClickCallers.splice(callerId, 1);
		},
		
		registerMove: function(f) {
			this._mouseMoveCallers.push(f);
			return (this._mouseMoveCallers.length - 1);
		},
		
		unregisterMove: function(callerId) {
			this._mouseMoveCallers.splice(callerId, 1);
		},

	    registerDown: function(f) {
	        this._mouseDownCallers.push(f);
	        return (this._mouseDownCallers.length - 1);
	    },
		
        unregisterDown: function(callerId) {
            this._mouseDownCallers.splice(callerId, 1);
        },

        registerWheel: function (f) {
            this._mouseWhellCallers.push(f);
            return (this._mouseWhellCallers.length - 1);
        },

        unregisterWheel: function (callerId) {
            this._mouseWhellCallers.splice(callerId, 1);
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
	},
	onLoadReady: function () {
		jsGFwk.include(this._plugInName);
		if (!this._loaded) { this._loaded = true; this.onStart(); }
	}
};