var zafiroProject = function () {
	var self = this;
		
	this.projectName = "New Project";
		
	this.properties = {
		canvas: {width: 640, height: 480},
		fps: 1000/33,
		clearColor: "black",
		includes: [
			{ name: "2D Fast Animation", path: "http://localhost/jsgfwk/Framework/jsGFwk2dFastAnimation.js", enabled: false, instructions: 'jsGFwk.include("FastAnimation");' },
			{ name: "Timers", path: "http://localhost/jsgfwk/Framework/jsGFwkTimers.js", enabled: false, instructions: '' },
			{ name: "Resource Manager", path: "http://localhost/jsgfwk/Framework/jsGFwkRM.js", enabled: false, instructions: 'jsGFwk.include("ResourceManager");' },
			{ name: "IO", path: "http://localhost/jsgfwk/Framework/jsGFwkIO.js", enabled: false, instructions: 'jsGFwk.include("IO");' },
			{ name: "Cameras", path: "http://localhost/jsgfwk/Framework/jsGFwkCamera.js", enabled: false, instructions: 'jsGFwk.include("Camera");' },
			{ name: "Collisions", path: "http://localhost/jsgfwk/Framework/jsGFwkCollisions.js", enabled: false, instructions: 'jsGFwk.include("Collisions");' },
			{ name: "Effects", path: "http://localhost/jsgfwk/Framework/jsGFwkEffects.js", enabled: false, instructions: 'jsGFwk.include("Effects");' },
			{ name: "Fonts", path: "http://localhost/jsgfwk/Framework/jsGFwkFonts.js", enabled: false, instructions: 'jsGFwk.include("Fonts");' },
			{ name: "Images", path: "http://localhost/jsgfwk/Framework/jsGFwkImages.js", enabled: false, instructions: 'jsGFwk.include("Images");' },
			{ name: "Paths", path: "http://localhost/jsgfwk/Framework/jsGFwkPath.js", enabled: false, instructions: 'jsGFwk.include("Path");' },
			{ name: "Scenes", path: "http://localhost/jsgfwk/Framework/jsGFwkScenes.js", enabled: false, instructions: 'jsGFwk.include("Scenes");' },
			{ name: "Sprites", path: "http://localhost/jsgfwk/Framework/jsGFwkSprites.js", enabled: false, instructions: 'jsGFwk.include("Sprites");' },
			{ name: "Containers", path: "http://localhost/jsgfwk/Framework/jsGFwkContainer.js", enabled: false, instructions: 'jsGFwk.include("Container");' }
		]
	};
	this.objects = [];
	this.errors = [];

	this.createGameObject = function() {
		var zObject = new zafiroGameObject();
		self.objects.push(zObject);
		return zObject;
	};
	
	this.createFreeCodeObject = function() {
		var zObject = new zafiroFreeCodeObject();
		self.objects.push(zObject);
		return zObject;
	};
	
	this.deleteObject = function(objectToRemove) {
		for (var i = 0; i < self.objects.length; i++) {
			if (self.objects[i].properties.id === objectToRemove.properties.id) {
				self.objects[i].settings.container.remove();
				self.objects.splice(i, 1);
				break;
			}
		}
	};
	
	this.rename = function (name) {
		self.projectName = name;
	};
	
	this.save = function () {
	};
	
	this.run = function (withDebug) {
		self.errors.splice(0);
		
		var stringBuilder = "<html>\n<head><title>" + self.projectName + "</title></head>\n";
		
		stringBuilder += "<script language='Javascript' src='http://localhost/jsgfwk/Framework/jsGFwk.js'></script>\n";
		
		var includes = self.properties.includes.where(function (item) { return item.enabled; });
		for (var i=0; i < includes.length ;i++) {
			stringBuilder += "<script language='Javascript' src='" + includes[i].path + "'></script>\n";
		}
		
		if (withDebug) {
			stringBuilder += "<script language='Javascript' src='http://localhost/jsgfwk/Framework/jsGFwkDebugger.js'></script>\n";
		}
		
		stringBuilder += "<body><canvas id='canvas' width='" + self.properties.canvas.width + "' height='" + self.properties.canvas.height + "'></canvas></body>";
		stringBuilder += "<script>";
		
		stringBuilder += "jsGFwk.settings.canvas = 'canvas';\n";
		stringBuilder += "jsGFwk.settings.clearColor = '" + self.properties.clearColor + "';\n";
		stringBuilder += "jsGFwk.settings.frameRate = " + self.properties.fps + ";\n";
		
		for (var i=0; i < includes.length ;i++) {
			stringBuilder += includes[i].instructions + "\n";
		}
		
		if (withDebug) {
			stringBuilder += "jsGFwk.include('Debugger');\njsGFwk.Debugger.on = true;\n";
		}
		
		stringBuilder += _includeGameObjectsAtStartup();
		stringBuilder += _includeLazzyGameObjects();
		stringBuilder += _createFreeCodeObjects();
		
		stringBuilder += "jsGFwk.start();\n";
		stringBuilder += "</script></html>";
		
		return stringBuilder;
	};
	
	function _createFreeCodeObjects() {
		var stringBuilder = "";
		var objects = self.objects.where(function (item) {
			return !item.settings.includedOnStartUp && item.settings.type === "freeCode";
		});
		
		for (var i= 0; i < objects.length; i++) {
			try {
				eval(objects[i].properties.code);
				stringBuilder += objects[i].properties.code + "\n";
			} catch (e) {
				self.errors.push({ error: e, object: objects[i] });
			}
		}
		return stringBuilder;
	}
	
	function _includeLazzyGameObjects() {
		var stringBuilder = "";
		var objects = self.objects.where(function (item) {
			return !item.settings.includedOnStartUp && item.settings.type === "gameCode";
		});
		
		for (var i= 0; i < objects.length; i++) {
			try {
				var tempCode = "var _compilationPointer = " + objects[i].properties.code;
				eval(tempCode);
				
				var objectProperties = objects[i].properties;
				for (var p in objectProperties) {
					if (objectProperties.hasOwnProperty(p) && p !== "code") {
						_compilationPointer[p] = objectProperties[p];
					}
				}
				
				var tempString = "var " + _compilationPointer["id"] + " = {";
				for (var p in _compilationPointer) {
					if (_compilationPointer.hasOwnProperty(p)) {
						if (typeof _compilationPointer[p] === "string") {
							tempString += p + ":'" + _compilationPointer[p] + "',\n";
						} else {
							tempString += p + ":" + _compilationPointer[p] + ",\n";
						}
					}
				}
				tempString += "};\n";
				
				stringBuilder += tempString;
			} catch (e) {
				self.errors.push({ error: e, object: self.objects[i] });
			}
		}
		return stringBuilder;
	}
	
	function _includeGameObjectsAtStartup() {
		var stringBuilder = "";
		var objectsAtStartUp = self.objects.where(function (item) {
			return item.settings.includedOnStartUp && item.settings.type === "gameCode";
		});
		
		for (var i= 0; i < objectsAtStartUp.length; i++) {
			try {
				var tempCode = "var _compilationPointer = " + objectsAtStartUp[i].properties.code;
				eval(tempCode);
				
				var objectProperties = objectsAtStartUp[i].properties;
				for (var p in objectProperties) {
					if (objectProperties.hasOwnProperty(p) && p !== "code") {
						_compilationPointer[p] = objectProperties[p];
					}
				}
				
				var tempString = "jsGFwk.createObject({";
				for (var p in _compilationPointer) {
					if (_compilationPointer.hasOwnProperty(p)) {
						if (typeof _compilationPointer[p] === "string") {
							tempString += p + ":'" + _compilationPointer[p] + "',\n";
						} else {
							tempString += p + ":" + _compilationPointer[p] + ",\n";
						}
					}
				}
				tempString += "});\n";
				
				stringBuilder += tempString;
			} catch (e) {
				self.errors.push({ error: e, object: self.objects[i] });
			}
		}
		return stringBuilder;
	}
	
	self.rename(self.projectName);
};