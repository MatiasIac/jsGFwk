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
	},
	
	start: function() {
		//Register all listeners
		document.addEventListener("keydown", this.keyboard._keyPressed, false);
		document.addEventListener("keyup", this.keyboard._keyReleased, false);
	}
};