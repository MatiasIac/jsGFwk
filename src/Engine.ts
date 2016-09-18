/// <reference path="Game.ts" />
interface Window { 
    requestAnimFrame: any,
    webkitRequestAnimationFrame: any,
    mozRequestAnimationFrame: any,
    oRequestAnimationFrame: any
}

namespace jsGame {
    export class Engine {

        _2dCanvas: Object = null;
        _2dContext: Object = null;
        _bufferCanvas: Object = null;
        _bufferContext: Object = null;
        _fwk: Game;
        _isInitialized: Boolean = false;
        _lastTime: number = 0;

        constructor(fwk: Game) { 
            this._fwk = fwk;
        }

        _init = function () {
            if (!this._isInitialized) {
                if (this._fwk._configuration.useExistingCanvas) {
                    this._2dCanvas = document.getElementById(this._fwk._configuration.existingCanvas);
                } else {
                    this._2dCanvas = document.createElement('canvas');
                    this._2dCanvas.width = this._fwk._configuration.width;
                    this._2dCanvas.height = this._fwk._configuration.height;
                    document.getElementsByTagName('body')[0].appendChild(this._2dCanvas);
                }

                this._2dContext = this._2dCanvas.getContext('2d');
                this._bufferCanvas = document.createElement('canvas');
                this._bufferCanvas.width = this._2dCanvas.width;
                this._bufferCanvas.height = this._2dCanvas.height;
                this._bufferContext = this._bufferCanvas.getContext('2d');

                var self = this;

                var _renderCallback = function () {
                    var currentTime = new Date().getTime(),
                        delta = (currentTime - self._lastTime) / 1000;
                    self._lastTime = currentTime;

                    self._bufferContext.save();
                    self._bufferContext.fillStyle = self._fwk._configuration.clearColor;
                    self._bufferContext.fillRect(0, 0, self._fwk._configuration.width, self._fwk._configuration.height);
                    self._bufferContext.restore();

                    self._fwk._gameObject.processObjects();
                    var currentObjects = self._fwk._gameObject.getActiveObjects();

                    for (var i = 0; i < currentObjects.length; i++) {
                        var o = currentObjects[i];

                        if (o.update !== undefined) { 
                            o.update.call(o, delta);
                        }

                        if (o !== undefined && (o.draw && o.visible)) {
                            self._bufferContext.save();
                            o.draw.call(o, self._bufferContext);
                            self._bufferContext.restore();
                        }
                    }

                    self._2dContext.drawImage(self._bufferCanvas, 0, 0);
                    window.requestAnimFrame(_renderCallback);
                };

                window.requestAnimFrame = (function(){
                    return window.requestAnimationFrame     || 
                        window.webkitRequestAnimationFrame  || 
                        window.mozRequestAnimationFrame     || 
                        window.oRequestAnimationFrame       || 
                        window.msRequestAnimationFrame      || 
                        function(_renderCallback: any, element: any) { 
                            window.setTimeout(_renderCallback, 1000/30); 
                        };
                })();

                window.requestAnimFrame(_renderCallback);
            }

            this._isInitialized = true;
        };
    }
}