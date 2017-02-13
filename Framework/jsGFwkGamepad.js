/*
 * Adding the module as an import if module.exports is present.
 */
if (typeof module !== 'undefined' && module.exports) {
	var jsGFwk = {};
}

jsGFwk.Gamepad = {
	_plugInName: 'Gamepad',
	_loaded: false,
	_isAvailable: false,
	
	PADTYPE: {
		PAD0: 0,
		PAD1: 1,
		PAD2: 2,
		PAD3: 3
	},
	
	pads: [],
	
	_padGameObject: {
		id: '_gamepad',
		visible: false,
		update: function () {
			var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : []);
			
			for (var i = 0; i < gamepads.length; i++) {
				if (gamepads[i]) {
					jsGFwk.Gamepad.pads[gamepads[i].index] = gamepads[i];
				}
			}
		}
	},
		
	gamepadHandler: function (gamepad, connecting) {
		if (connecting) {
			this.pads[gamepad.index] = gamepad;
		} else {
			delete this.pads[gamepad.index];
		}
	},
	
	onStart: function () {
		var self = this;
		
		jsGFwk.createObject(this._padGameObject);
		
		window.addEventListener("gamepadconnected", function(e) { 
			self.gamepadHandler(e.gamepad, true); 
		}, false);
		
		window.addEventListener("gamepaddisconnected", function(e) { 
			self.gamepadHandler(e.gamepad, false); 
		}, false);
	},
	
	onObjectCreated: function (newObject) {	},
	onStop: function () { },
	onLoadReady: function () {
		jsGFwk.include(this._plugInName);
		if (!this._loaded) { this._loaded = true; this.onStart(); }
	}
}

/**
 * We export it if we enable it only on node.
 * 
 */
if (typeof module !== 'undefined' && module.exports) {
	module.exports = require('./node-exporter')(jsGFwk);
}