class Animator2D {

    _name = "Animator2D";
    _2Dcontext = {};
	_canvas = {};
	_2Dbuffer = {};
	_bufferCanvas = {};
	_lastFrame = 0;

    constructor() {
    }

    _pointer() {
        const thisFrame = new Date().getTime();
        const delta = (thisFrame - this._lastFrame) / 1000;

        this._lastFrame = thisFrame;
        
        this._2Dbuffer.save();
        this._2Dbuffer.fillStyle = this._gfwk.settings.clearColor;
        this._2Dbuffer.fillRect(0, 0, this._canvas.width, this._canvas.height);
        this._2Dbuffer.restore();
        
        for (let name in this._gfwk._gameObjects) {
            if (this._gfwk._gameObjects[name] !== null) {
                const o = this._gfwk._gameObjects[name];

                if (o !== undefined && o.update) o.update(delta);

                if (o !== undefined && (o.draw && o.isVisible)) {
                    this._2Dbuffer.save();
                        o.draw(this._2Dbuffer);
                    this._2Dbuffer.restore();
                }
            }
        }

        //execute any extension that requires a pre render
        for (let i = 0; i < this._gfwk._includes.length; i++) {
            if (this._gfwk._includes[i].onPreRender !== undefined) {
                this._gfwk._2Dbuffer.save();
                    this._gfwk._includes[i].onPreRender(this._2Dbuffer);
                this._2Dbuffer.restore();
            }
        }
        
        //execute any object that includes a post render
        for (let name in this._gfwk._gameObjects) {
            this._2Dbuffer.save();
                this._gfwk._gameObjects[name].postRender !== undefined && this._gfwk._gameObjects[name].postRender(this._2Dbuffer);
            this._2Dbuffer.restore();
        }
        
        this._2Dcontext.drawImage(this._bufferCanvas, 0, 0);
        
        requestAnimFrame(this._pointer.bind(this));
    }

    onStart() {
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
	
		requestAnimFrame(this._pointer.bind(this));
	}

}