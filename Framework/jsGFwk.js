var jsGFwk = (function(){
	return {
		
		_2Dcontext: {},
		_canvas: {},
		_2Dbuffer: {},
		_bufferCanvas: {},
		_gameObjects: {},
		_intervalId: 0,
		_lastFrame: 0,
		
		_processObjects: function() {
			//Added
			/*if (objectToBeAdded.length != 0) {
				for (var x = 0; x < objectToBeAdded.length; ++x) {
					gameObjects.push(objectToBeAdded[x]);
					objectToBeAdded[x].init();
				}
				objectToBeAdded.splice(0, objectToBeAdded.length);
			}*/
		},
		
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
		
		start: function() {
		
			if (this._intervalId === 0) {
				this._canvas = document.getElementById(this.settings.canvas);
				this._2Dcontext = this._canvas.getContext("2d");
				this._bufferCanvas = document.createElement('canvas');
				this._bufferCanvas.width = this._canvas.width;
				this._bufferCanvas.height = this._canvas.height;
				this._2Dbuffer = this._bufferCanvas.getContext('2d');
			
				if (this.resources !== undefined) {
					this.resources.start();
				}
			
				this._intervalId = setInterval(function() { 
					var thisFrame = new Date().getTime();
					var delta = (thisFrame - this.lastFrame) / 1000;
					jsGFwk._lastFrame = thisFrame;
					
					jsGFwk._2Dbuffer.fillStyle = jsGFwk.settings.clearColor;
					jsGFwk._2Dbuffer.fillRect(0, 0, jsGFwk._canvas.width, jsGFwk._canvas.height);
					
					for (var name in jsGFwk._gameObjects) {
						if (jsGFwk._gameObjects[name] !== null) {
							var o = jsGFwk._gameObjects[name];
							if (o.update) { o.update(delta); }
							if (o.draw && o.visible) { o.draw(jsGFwk._2Dbuffer); }
						}
					}
					
					jsGFwk._2Dcontext.drawImage(jsGFwk._bufferCanvas, 0, 0);
					//jsGFwk._processObjects();
					
				}, this.settings.frameRate);
			}			
		},
		
		stop: function () {
			if (this._intervalId !== 0) {
				clearInterval(this._intervalId);
				this._intervalId = 0;
			}
		},
		
	};
})();