/*
 * Adding the module as an import if module.exports is present.
 */
if (typeof module !== 'undefined' && module.exports) {
	var jsGFwk = {};
}

jsGFwk.Scenes = (function() {

	var _currentScene;

	function scene(parameters) {
		var self = this;
		var _sceneObjects = parameters.gameObjects || [];
		
		this.setGameObjects = function(objects) {
			if (objects == undefined) { return; }
			_sceneObjects = objects;
		};
		
		this.disable = function() {
			var i = 0;
			for (; i < _sceneObjects.length; _sceneObjects[i++].destroy());
			_currentScene = undefined;
		};
		
		this.enable = function() {
			if (_currentScene != undefined) { _currentScene.disable(); }
		
			var i = 0;
			for (; i < _sceneObjects.length; jsGFwk.createObject(_sceneObjects[i++]));
			_currentScene = this;
		};
	}

	_onStart = function () { };
	_onObjectCreated = function (newObject) { };
	
	return {
		_plugInName: "Scenes",
		_loaded: false,
		onStart: _onStart,
		onObjectCreated: _onObjectCreated,
		scenes: {},
		create: function (parameters) {
			if (parameters.name == undefined) { return; }
			this.scenes[parameters.name] = new scene(parameters);
		},
		onLoadReady: function () {
			jsGFwk.include(this._plugInName);
			if (!this._loaded) { this._loaded = true; this.onStart(); }
		}
	};
})();

/**
 * We export it if we enable it only on node.
 * 
 */
if (typeof module !== 'undefined' && module.exports) {
	module.exports = require('./node-exporter')(jsGFwk);
}