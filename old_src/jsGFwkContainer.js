/*
 * Adding the module as an import if module.exports is present.
 */
if (typeof module !== 'undefined' && module.exports) {
	var jsGFwk = {};
}

/** @title: jsGFwk.Container
 * @description: This plugin allows to contain and clone game objects, handling each as part of the same group.
 * @usage: jsGFwk.include(<b>"Container"</b>) */
jsGFwk.Container = (function() {

	function container(settings) {
		var self = this;
		var _allObjects = {};
		var _objectCounter = 0;
		
		this._settings = settings;
		this.id = "";
		this.visible = true;
		this.zOrder = 0;
		this.update = function (delta) { 
			for (var o in _allObjects) {
				if (_allObjects[o].onUpdate !== undefined) { _allObjects[o].onUpdate(delta); }
			}
		};
		this.draw = function (context) { 
			for (var o in _allObjects) {
				if (_allObjects[o].onDraw !== undefined) { _allObjects[o].onDraw(context); }
			}
		};
		
		this.length = function () {
			var count = 0;
			for (var p in _allObjects) {
				if (_allObjects.hasOwnProperty(p)) {
					count++;
				}
			}
			
			return count;
		};
		
		this.eachCloned = function (f) {
			var event = { cancel: false };
			for (var p in _allObjects) {
				if (_allObjects.hasOwnProperty(p)) {
					f(_allObjects[p], event);
					if (event.cancel) { break; }
				}
			}
		};
		
		this.clearAll = function () {
			for (var o in _allObjects) { _allObjects[o].destroy(); }
			_allObjects = {};
			_objectCounter = 0;
		};
		
		this.cloneObject = function (initParameters) {
			var cloned = Object.create(self._settings);
			
			_objectCounter++;
			cloned._containerElementPosition = _objectCounter;
			cloned.destroy = function() {
				delete _allObjects[cloned._containerElementPosition];
			};
			
			if (cloned.onInit != undefined) { cloned.onInit(initParameters); }
			_allObjects[_objectCounter] = cloned;
			
			if (jsGFwk.Debugger) {
				jsGFwk.Debugger.onObjectCreated(cloned);
			}
			
			return cloned;
		};
		
		this.getClonedAt = function(index) {
			var i = 0;
			for (var p in _allObjects) {
				if (_allObjects.hasOwnProperty(p)) {
					i++;
					if (i === index) {
						return _allObjects[p];
					}
				}
			}
		};
	}
	
	/** @subtitle: createContainer
	 * @description: Creates a new container.
	 * @usage: jsGFwk.<i>Container</i>.createContainer(<b>"[container_name]", [object_to_clone]</b>) */
	_createContainer = function (containerName, settings, notActivateNow) {
		var newContainer = new container(settings);
		newContainer.id = containerName;
		if (!notActivateNow) {
			jsGFwk.createObject(newContainer);
		}
		
		return newContainer;
	};

	_onStart = function () { };
	_onObjectCreated = function (newObject) { };
	
	return {
		_plugInName: "Container",
		_loaded: false,
		onStart: _onStart,
		onObjectCreated: _onObjectCreated,
		createContainer: _createContainer,
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