/** @title: jsGFwk.FastAnimation
 * @description: Recommended plugin implementation for 2D games.<br>This is faster than BasicAnimation plugin.
 * @usage: jsGFwk.include(<b>"FastAnimation"</b>) */
jsGFwk.FastAnimation = {

	_plugInName: "FastAnimation",
	_loaded: false,

	//_intervalId: 0,
	_2Dcontext: {},
	_canvas: {},
	_2Dbuffer: {},
	_bufferCanvas: {},
	_lastFrame: 0,
	
	_pointer: function () {
			var thisFrame = new Date().getTime();
			var delta = (thisFrame - jsGFwk.FastAnimation._lastFrame) / 1000;
			jsGFwk.FastAnimation._lastFrame = thisFrame;
			
			jsGFwk.FastAnimation._2Dbuffer.save();
					jsGFwk.FastAnimation._2Dbuffer.fillStyle = jsGFwk.settings.clearColor;
					jsGFwk.FastAnimation._2Dbuffer.fillRect(0, 0, jsGFwk.FastAnimation._canvas.width, jsGFwk.FastAnimation._canvas.height);
			jsGFwk.FastAnimation._2Dbuffer.restore();
			
			for (var name in jsGFwk._gameObjects) {
				if (jsGFwk._gameObjects[name] !== null) {
					var o = jsGFwk._gameObjects[name];
					if (o.update) { o.update(delta); }
					if (o.draw && o.visible) { o.draw(jsGFwk.FastAnimation._2Dbuffer); }
				}
			}

			for (var i = 0; i < jsGFwk._includes.length; i++) {
				if (jsGFwk[jsGFwk._includes[i]].onPreRender !== undefined) {
					jsGFwk[jsGFwk._includes[i]].onPreRender(jsGFwk.FastAnimation._2Dbuffer);
				}
			}
			
			jsGFwk.FastAnimation._2Dcontext.drawImage(jsGFwk.FastAnimation._bufferCanvas, 0, 0);
			
			requestAnimFrame(jsGFwk.FastAnimation._pointer);
	},
	
	onStart: function () {
		this._canvas = document.getElementById(jsGFwk.settings.canvas);
		this._2Dcontext = this._canvas.getContext("2d");
		this._bufferCanvas = document.createElement('canvas');
		this._bufferCanvas.width = this._canvas.width;
		this._bufferCanvas.height = this._canvas.height;
		this._2Dbuffer = this._bufferCanvas.getContext('2d');
	
		window.requestAnimFrame = (function(){
		  return window.requestAnimationFrame       || 
				 window.webkitRequestAnimationFrame || 
				 window.mozRequestAnimationFrame    || 
				 window.oRequestAnimationFrame      || 
				 window.msRequestAnimationFrame     || 
				 function(callback, element){
					window.setTimeout(callback, jsGFwk.settings.frameRate);
				 };
		})();
	
		requestAnimFrame(this._pointer);
	},
	
	onObjectCreated: function (newObject) {	},
	onStop: function () {},
	onLoadReady: function () {
		jsGFwk.include(this._plugInName);
		if (!this._loaded) { this._loaded = true; this.onStart(); }
	}
}