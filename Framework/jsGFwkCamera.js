jsGFwk.Camera = {
	_plugInName: "Camera",
	_loaded: false,
	
	_tempCanvas: {},
	_tempContext: {},
	_tempCanvasFilter: {},
	_tempContextFilter: {},
	cameras: {},
	
	createCamera: function (camera) {
		this.cameras[camera.name] = {
			targetPosition: camera.targetPosition || { x: 0, y: 0, width: 100, height: 100 },
			originPosition: camera.originPosition || { x: 0, y: 0, width: 100, height: 100 },
			zoomFactor: camera.zoomFactor || 1,
			enabled: camera.enabled,
			filter: camera.filter || function () {}
		};
	},

	_applyCameraPointer: function () {},
	_applyCameraNull: function () {},
	_applyCamera: function (context) {
		context.drawImage(this._tempCanvas, 0, 0);
	},
		
	onPreRender: function (context) {
		this._applyCameraPointer = this._applyCameraNull;
		
		this._tempContext.save();
			this._tempContext.fillStyle = jsGFwk.settings.clearColor;
			this._tempContext.fillRect(0, 0, jsGFwk.FastAnimation._canvas.width, jsGFwk.FastAnimation._canvas.height);
		this._tempContext.restore();
		
		for (var cam in this.cameras) {
			if (this.cameras.hasOwnProperty(cam)) {
				var currentCamera = this.cameras[cam];
				if (currentCamera.enabled) {
					this._tempContextFilter.clearRect(0, 0, 
						jsGFwk.FastAnimation._canvas.width, jsGFwk.FastAnimation._canvas.height);

					this._tempContextFilter.drawImage(jsGFwk.FastAnimation._bufferCanvas, 
						currentCamera.originPosition.x, currentCamera.originPosition.y,
						currentCamera.originPosition.width, currentCamera.originPosition.height,
						0, 0,
						currentCamera.targetPosition.width * currentCamera.zoomFactor,
						currentCamera.targetPosition.height * currentCamera.zoomFactor);
						
					currentCamera.filter(this._tempContextFilter, 
						{ width: currentCamera.originPosition.width, 
						  height: currentCamera.originPosition.height });
				
					this._tempContext.drawImage(this._tempCanvasFilter, 0, 0, 
						currentCamera.originPosition.width, currentCamera.originPosition.height,
						currentCamera.targetPosition.x, currentCamera.targetPosition.y,
						currentCamera.targetPosition.width, currentCamera.targetPosition.height);
					
					this._applyCameraPointer = this._applyCamera;
				}
			}
		}
		
		this._applyCameraPointer(context);
	},
	
	onStart: function () {
		this._tempCanvas = document.createElement("canvas");
		this._tempCanvas.width = jsGFwk.FastAnimation._canvas.width;
		this._tempCanvas.height = jsGFwk.FastAnimation._canvas.height;
		this._tempContext = this._tempCanvas.getContext("2d");
		
		this._tempCanvasFilter = document.createElement("canvas");
		this._tempCanvasFilter.width = jsGFwk.FastAnimation._canvas.width;
		this._tempCanvasFilter.height = jsGFwk.FastAnimation._canvas.height;
		this._tempContextFilter = this._tempCanvasFilter.getContext("2d");
	},
	onObjectCreated: function (newObject) {	},
	onStop: function () {},
	onLoadReady: function () {
		jsGFwk.include(this._plugInName);
		if (!this._loaded) { this._loaded = true; this.onStart(); }
	}
}