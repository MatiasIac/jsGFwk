var jsGFwk = (function(){
	return {
		
		_gameObjects: {},
		_includes: [],
		
		settings: {
			canvas: "",
			width: 640,
			height: 480,
			frameRate: 1000/33,
			clearColor: "rgb(0,0,0)"
		},
		
		createObject: function(object) {
			if (object.id === undefined) {
				return;
			}
			
			object.destroy = function() {
				delete jsGFwk._gameObjects[object.id];
			};
			
			this._gameObjects[object.id] = object;
			
			if (object.init !== undefined) { object.init(); }
			
			for (var i = 0; i < this._includes.length; i++) {
				if (this[this._includes[i]].onObjectCreated !== undefined) {
					this[this._includes[i]].onObjectCreated(this._gameObjects[object.id]);
				}
			}
		},
		
		sort: function () {
			var arr = [];
			for (var prop in this._gameObjects) {
				arr.push(this._gameObjects[prop]);
			}
		
			arr.sort(function(a,b){return a.zOrder - b.zOrder;});
			
			for (var i = 0; i < arr.length; i++) {
				delete jsGFwk._gameObjects[arr[i].id];
				this._gameObjects[arr[i].id] = arr[i];
			}
		},
		
		include: function (componentName) {
			this._includes[this._includes.length] = componentName;
		},
		
		start: function() {
			//start all plugins
			for (var i = 0; i < this._includes.length; i++) {
				if (this[this._includes[i]].onStart !== undefined) {
					this[this._includes[i]].onStart();
				}
			}
		},
		
		stop: function () {
			for (var i = 0; i < this._includes.length; i++) {
				if (this[this._includes[i]].onStop !== undefined) {
					this[this._includes[i]].onStop();
				}
			}
		},
		
	};
})();