jsGFwk.Camera = {
	
	_tempCanvas: {},
	_tempContext: {},
	cameras: {},
	
	createCamera: function (camera) {
		this.cameras[camera.name] = {
			targetPosition: camera.targetPosition || { x: 0, y: 0, width: 100, height: 100 },
			originPosition: camera.originPosition || { x: 0, y: 0, width: 100, height: 100 },
			zoomFactor: camera.zoomFactor || 1,
			enabled: camera.enabled
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
					this._tempContext.drawImage(jsGFwk.FastAnimation._bufferCanvas, 
						currentCamera.originPosition.x, currentCamera.originPosition.y,
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
	},
	onObjectCreated: function (newObject) {	},
	onStop: function () {}
}