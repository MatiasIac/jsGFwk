(function (w) {
    "use strict";

    var wrapper = function () { },
        animation2d = function (fwkRef) {
            this._fwk = fwkRef;
        },
        sprite = function (fwkRef) { 
            this._fwk = fwkRef;
        };

    /*graphic engine*/
    animation2d.prototype._init = function () {
        var self = this,
            _lastTimeFrame = 0,
		    _2Dcontext = this._fwk._configuration.canvas.getContext("2d"),
		    _bufferCanvas = document.createElement('canvas');

        _bufferCanvas.width = this._fwk._configuration.width;
        _bufferCanvas.height = this._fwk._configuration.height;
		var _2Dbuffer = _bufferCanvas.getContext('2d');
	
        function _renderCallback() {
            var currentFrame = new Date().getTime();
            var delta = (currentFrame - _lastTimeFrame) / 1000;
            _lastTimeFrame = currentFrame;
            
            _2Dbuffer.save();
            _2Dbuffer.fillStyle = self._fwk._configuration.backgroundColor;
            _2Dbuffer.fillRect(0, 0, self._fwk._configuration.width, self._fwk._configuration.height);
            _2Dbuffer.restore();
            
            for (var i = 0; i < self._fwk._aliveObjects.length; i++) {
                var o = self._fwk._aliveObjects[i];

                if (o.update !== undefined) { 
                    o.update.call(o, delta);
                }

                if (o !== undefined && (o.draw && o.visible)) {
                    _2Dbuffer.save();
                    o.draw.call(o, _2Dbuffer);
                    _2Dbuffer.restore();
                }
            }
            
            _2Dcontext.drawImage(_bufferCanvas, 0, 0);
            requestAnimFrame(_renderCallback);
        };

		window.requestAnimFrame = (function(){
            return window.requestAnimationFrame       || 
			       window.webkitRequestAnimationFrame || 
				   window.mozRequestAnimationFrame    || 
				   window.oRequestAnimationFrame      || 
				   window.msRequestAnimationFrame     || 
                   function(callback, element){ window.setTimeout(callback, 1000/30); };
		})();
	
		requestAnimFrame(_renderCallback);
    };
    /*end graphic engine*/

    sprite.prototype.New = function (proto) {
        if (proto === undefined || typeof proto !== 'object') { 
            throw 'object prototype missing';
        }

        proto.name = (proto.name === undefined || typeof proto.name !== 'string') ? parseInt((Math.random() * 1000) + 1000) + '' : proto.name;

        //inject here all the external properties
        proto.x = (proto.x === undefined || typeof proto.x !== 'number') ? 0 : proto.x;
        proto.y = (proto.y === undefined || typeof proto.y !== 'number') ? 0 : proto.y;
        proto.visible = (proto.visible === undefined || typeof proto.visible !== 'boolean') ? false : proto.visible;

        this._fwk._addObject(proto);
    };

    /*main engine functions*/
    var fwk = function (configuration) { 
        this._configuration = configuration;

        //create the initial canvas
        var c = document.createElement('canvas');
        c.width = configuration.width;
        c.height = configuration.height;
        this._configuration.canvas = c;
        document.getElementsByTagName('body')[0].appendChild(c);

        //create the graphic engine
        this._engine = new animation2d(this);
        this.sprite = new sprite(this);
    };

    fwk.prototype.start = function () {
        this._engine._init();
    };

    fwk.prototype._addObject = function (o) {
        this._aliveObjects.push(o);
        this.activeGameObjects[o.name] = o;
    };

    fwk.prototype._aliveObjects = [];
    fwk.prototype.activeGameObjects = {};
    fwk.prototype.sprite = null;
    fwk.prototype.camera = null;
    fwk.prototype.debugger = null;
    fwk.prototype.storage = null;
    /*end main engine*/

    wrapper.prototype.New = function (configuration) {
        return new fwk(configuration || this.createConfiguration());
    };

    wrapper.prototype.createConfiguration = function (width, height, backgroundColor) {
        return {
            width: width || 640,
            height: height || 480,
            backgroundColor: backgroundColor || 'black'
        };
    };

    w.jsGame = new wrapper();
}(window));