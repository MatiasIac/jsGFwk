/** @title: jsGFwk
 * @description: Main framework component. Handles all the objects in the game. 
 * @usage: <i>jsGFwk</i>.<b>[function_name]</b>(<b>[parameters]</b>) */
var jsGFwk = (function(){
	return {
		/** @subtitle: _gameObjects 
		 * @description: Contains all the current game objects.<br>Useful for referencing an specific game object and interacts with its properties.
		 * @usage: jsGFwk.<i>_gameObjects</i>.<b>[object_id]</b>.<b>[property]</b>
		*/
		_gameObjects: {},
		_includes: [],
		
		/** @subtitle: settings 
		 * @description: Sets the default behavior for a game.
		 * @usage: jsGFwk.<i>settings</i>.<b>canvas = "[canvas_id]"</b><br><br>jsGFwk.<i>settings</i>.<b>width = [canvas_width]</b><br><br>jsGFwk.<i>settings</i>.<b>height = [canvas_height]</b><br><br>jsGFwk.<i>settings</i>.<b>frameRate = [frame_rate]</b><br><br>jsGFwk.<i>settings</i>.<b>clearColor = "[css_style_format]"</b><br><br>
		*/		
		settings: {
			canvas: "",
			width: 640,
			height: 480,
			frameRate: 1000/33,
			clearColor: "rgb(0,0,0)"
		},
		
		/** @subtitle: createObject 
		 * @description: Creates a new object and add it to the current game objects.
		 * @usage: jsGFwk.<i>createObject</i>(<b>[game_object]</b>)<br><br><i>Sample</i><br><br>jsGFwk.<i>createObject</i>(<b>{ id: "object_id",<br> visible: true,<br> zOrder: [Index],<br> init: function() {},<br> update: function(delta) {},<br> draw: function(context) {}<br> }</b>)
		*/
		createObject: function(object) {
			if (object.id === undefined) {
				return;
			}
			
			/** @subtitle: [object].destroy
			 * @description: Destroys a game object from it self.
			 * @usage: jsGFwk._gameObjects.[object_id].<i>destroy()</i>
			*/
			object.destroy = function() {
				delete jsGFwk._gameObjects[object.id];
			};
			
			this._gameObjects[object.id] = object;
			
			for (var i = 0; i < this._includes.length; i++) {
				if (this[this._includes[i]].onObjectCreated !== undefined) {
					this[this._includes[i]].onObjectCreated(this._gameObjects[object.id]);
				}
			}
			
			if (object.init !== undefined) { object.init(); }
		},
		
		/** @subtitle: sort
		* @description: Sorts all the current game object based on zOrder property.
		* @usage: jsGFwk.<i>sort()</i>
		*/
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
		
		/** @subtitle: include
		* @description: Includes an external plugin to be handled by the framework.
		* @usage: jsGFwk.<i>include</i>("[plugin_name]")
		*/		
		include: function (componentName) {
			for (var i = 0; i < this._includes.length; i++) {
				if (componentName === this._includes[i]) { return; }
			}
			this._includes[this._includes.length] = componentName;
		},
		
		/** @subtitle: load
		* @description: Includes an external plugin to be handled by the framework, loading it from the file name.
		* @usage: jsGFwk.<i>load</i>("[plugin_file_name]")
		*/	
		load: function (fileName) {
			var self = this;
			if (fileName !== undefined && typeof fileName === "string") {
				var script = document.createElement("script");
				script.type = "text/javascript";
				/*if (script.readyState){
					script.onreadystatechange = function(){
						if (script.readyState == "loaded" ||
								script.readyState == "complete"){
							script.onreadystatechange = null;
							callback();
						}
					};
				}*/
				script.onload = function(){
					for (var p in jsGFwk) {
						if (jsGFwk[p].onLoadReady !== undefined) {
							jsGFwk[p].onLoadReady();
						}
					}
				};
			
				script.src = fileName;
				document.getElementsByTagName("head")[0].appendChild(script);
			}
		},
		
		/** @title: start
		* @description: Starts the game.
		* @usage: jsGFwk.<i>start</i>()
		*/	
		start: function() {
			//start all plugins
			for (var i = 0; i < this._includes.length; i++) {
				if (this[this._includes[i]].onStart !== undefined) {
					this[this._includes[i]].onStart();
				}
			}
		},
		
		/** @title: stop
		* @description: Stops the game.
		* @usage: jsGFwk.<i>stop</i>()
		*/
		stop: function () {
			for (var i = 0; i < this._includes.length; i++) {
				if (this[this._includes[i]].onStop !== undefined) {
					this[this._includes[i]].onStop();
				}
			}
		},
		
	};
})();