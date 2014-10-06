/** @title: jsGFwk.BasicAnimation
 * @description: Low performance plugin for 2D games.<br>For a better performance see <i>jsGFwk2dFastAnimation</i>.
 * @usage: jsGFwk.include(<b>"BasicAnimation"</b>) */
jsGFwk.BasicAnimation = {

	_plugInName: "BasicAnimation",
	_loaded: false,

	_intervalId: 0,
	_2Dcontext: {},
	_canvas: {},
	_2Dbuffer: {},
	_bufferCanvas: {},
	_lastFrame: 0,
	
	onStart: function () {
		if (this._intervalId === 0) {
			this._canvas = document.getElementById(jsGFwk.settings.canvas);
			this._2Dcontext = this._canvas.getContext("2d");
			this._bufferCanvas = document.createElement('canvas');
			this._bufferCanvas.width = this._canvas.width;
			this._bufferCanvas.height = this._canvas.height;
			this._2Dbuffer = this._bufferCanvas.getContext('2d');
		
			this._intervalId = setInterval(function() { 
				var thisFrame = new Date().getTime();
				var delta = (thisFrame - jsGFwk.BasicAnimation._lastFrame) / 1000;
				jsGFwk.BasicAnimation._lastFrame = thisFrame;
				
				jsGFwk.BasicAnimation._2Dbuffer.save();
					jsGFwk.BasicAnimation._2Dbuffer.fillStyle = jsGFwk.settings.clearColor;
					jsGFwk.BasicAnimation._2Dbuffer.fillRect(0, 0, jsGFwk.BasicAnimation._canvas.width, jsGFwk.BasicAnimation._canvas.height);
				jsGFwk.BasicAnimation._2Dbuffer.restore();
				
				for (var name in jsGFwk._gameObjects) {
					if (jsGFwk._gameObjects[name] !== null) {
						var o = jsGFwk._gameObjects[name];
						if (o.update) { o.update(delta); }
						if (o.draw && o.visible) { o.draw(jsGFwk.BasicAnimation._2Dbuffer); }
					}
				}
				
				jsGFwk.BasicAnimation._2Dcontext.drawImage(jsGFwk.BasicAnimation._bufferCanvas, 0, 0);

			}, jsGFwk.settings.frameRate);
		}		
	},
	
	onObjectCreated: function (newObject) {	},
	onStop: function () {
		if (this._intervalId !== 0) {
			clearInterval(this._intervalId);
			this._intervalId = 0;
		}
	},
	onLoadReady: function () {
		jsGFwk.include(this._plugInName);
		if (!this._loaded) { this._loaded = true; this.onStart(); }
	}
}