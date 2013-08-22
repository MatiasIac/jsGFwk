jsGFwk.IO = {
	keyboard: {
		_keyboardCallers: [],
		_activeKey: [],
		_keyReleased: function(e) {
			delete jsGFwk.IO.keyboard._activeKey[e.which];
		},
		_keyPressed: function(e) {
			e.preventDefault();
			for (i = 0; i < jsGFwk.IO.keyboard._keyboardCallers.length; jsGFwk.IO.keyboard._keyboardCallers[i++](e.which));
			jsGFwk.IO.keyboard._activeKey[e.which] = true;
		},
		
		registerKeypress: function(f) {
			this._keyboardCallers.push(f);
		}
	},
	
	mouse: {
		_mouseClickCallers: [],
		_mouseMoveCallers: [],
		
		_lastDownCoords: {},
		_lastMoveCoords: {},
		_isMousePressed: false,
		
		_getCoordinates: function(e) {
			if (e.offsetX)
				return { x: e.offsetX, y: e.offsetY };
			else if (e.layerX)
				return { x: e.layerX, y: e.layerY };
			else
				return { x: e.pageX - jsGFwk._canvas.offsetLeft, y: e.pageY - jsGFwk._canvas.offsetTop };
		},
		
		_mouseDown: function(e) {
			jsGFwk.IO.mouse._isMousePressed = true;
			jsGFwk.IO.mouse._lastDownCoords = jsGFwk.IO.mouse._getCoordinates(e);
		},
		
		_mouseUp: function() {
			jsGFwk.IO.mouse._isMousePressed = false;
			for (var i = 0; i < jsGFwk.IO.mouse._mouseClickCallers.length; jsGFwk.IO.mouse._mouseClickCallers[i++](jsGFwk.IO.mouse._lastDownCoords));
		},
		
		_mouseMove: function(e) {
			jsGFwk.IO.mouse._lastMoveCoords = jsGFwk.IO.mouse._getCoordinates(e);
			for (var i = 0; i < jsGFwk.IO.mouse._mouseMoveCallers.length; jsGFwk.IO.mouse._mouseMoveCallers[i++](jsGFwk.IO.mouse._lastMoveCoords));
		},
		
		registerClick: function(f) {
			this._mouseClickCallers.push(f);
		},
		
		registerMove: function(f) {
			this._mouseMoveCallers.push(f);
		}
	},
	
	start: function() {
		//Register all listeners
		document.addEventListener("keydown", this.keyboard._keyPressed, false);
		document.addEventListener("keyup", this.keyboard._keyReleased, false);
		
		document.getElementById(jsGFwk.settings.canvas).addEventListener("mousedown", this.mouse._mouseDown, false);
		document.getElementById(jsGFwk.settings.canvas).addEventListener("mouseup", this.mouse._mouseUp, false);
		document.getElementById(jsGFwk.settings.canvas).addEventListener("mousemove", this.mouse._mouseMove, false);
	}
};