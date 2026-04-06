class Animator2D {

    _name = "Animator2D";
    _2Dcontext = {};
	_canvas = {};
	_2Dbuffer = {};
	_bufferCanvas = {};
	_lastFrame = 0;
    _isRunning = false;
    _boundPointer = null;
    _maxDelta = 0.1;
    _now = null;

    constructor() {
        this._now = (typeof performance !== "undefined" && performance.now)
            ? performance.now.bind(performance)
            : Date.now;
    }

    _pointer() {
        if (!this._isRunning) { return; }
        const thisFrame = this._now();
        const rawDelta = (thisFrame - this._lastFrame) / 1000;
        const delta = rawDelta > this._maxDelta ? this._maxDelta : rawDelta;

        this._lastFrame = thisFrame;
        
        this._2Dbuffer.save();
        this._2Dbuffer.fillStyle = this._gfwk.settings.clearColor;
        this._2Dbuffer.fillRect(0, 0, this._canvas.width, this._canvas.height);
        this._2Dbuffer.restore();
        
        //execute any extension that requires a pre render
        for (let i = 0; i < this._gfwk._includes.length; i++) {
            this._gfwk._includes[i].preRender !== undefined && this._gfwk._includes[i].preRender(this._2Dbuffer);
        }

        const postRenderQueue = [];
        for (let name in this._gfwk._gameObjects) {
            if (!Object.prototype.hasOwnProperty.call(this._gfwk._gameObjects, name)) { continue; }
            if (this._gfwk._gameObjects[name] !== null) {
                const o = this._gfwk._gameObjects[name];

                if (o !== undefined && o.update) o.update(delta);

                if (o !== undefined && (o.draw && o.isVisible)) {
                    this._2Dbuffer.save();
                        o.draw(this._2Dbuffer);
                    this._2Dbuffer.restore();
                }

                if (o !== undefined && o.postRender !== undefined) {
                    postRenderQueue.push(o);
                }
            }
        }
        
        //execute any object that includes a post render
        for (let i = 0; i < postRenderQueue.length; i++) {
            postRenderQueue[i].postRender(this._2Dbuffer);
        }
        
        this._2Dcontext.drawImage(this._bufferCanvas, 0, 0);
        
        requestAnimFrame(this._boundPointer);
    }

    onStart() {
        if (this._isRunning) { return; }
		this._canvas = document.getElementById(this._gfwk.settings.canvas);
		this._2Dcontext = this._canvas.getContext("2d");
		this._bufferCanvas = document.createElement('canvas');
		this._bufferCanvas.width = this._canvas.width;
		this._bufferCanvas.height = this._canvas.height;
		this._2Dbuffer = this._bufferCanvas.getContext('2d');
	
		window.requestAnimFrame = (function() {
            return window.requestAnimationFrame      || 
                window.webkitRequestAnimationFrame || 
                window.mozRequestAnimationFrame    || 
                window.oRequestAnimationFrame      || 
                window.msRequestAnimationFrame     || 
                function(callback){
                    window.setTimeout(callback, _gfwk.settings.frameRate);
                };
		})();
	
        this._isRunning = true;
        this._lastFrame = this._now();
        if (this._boundPointer === null) {
            this._boundPointer = this._pointer.bind(this);
        }
		requestAnimFrame(this._boundPointer);
	}

    onStop() {
        this._isRunning = false;
    }

}

export { Animator2D };
