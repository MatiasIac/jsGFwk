var jsGame;
(function (jsGame) {
    var Engine = (function () {
        function Engine(fwk) {
            this._2dCanvas = null;
            this._2dContext = null;
            this._bufferCanvas = null;
            this._bufferContext = null;
            this._isInitialized = false;
            this._lastTime = 0;
            this._init = function () {
                if (!this._isInitialized) {
                    if (this._fwk._configuration.useExistingCanvas) {
                        this._2dCanvas = document.getElementById(this._fwk._configuration.existingCanvas);
                    }
                    else {
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
                        var currentTime = new Date().getTime(), delta = (currentTime - self._lastTime) / 1000;
                        self._lastTime = currentTime;
                        self._bufferContext.save();
                        self._bufferContext.fillStyle = self._fwk._configuration.clearColor;
                        self._bufferContext.fillRect(0, 0, self._fwk._configuration.width, self._fwk._configuration.height);
                        self._bufferContext.restore();
                        self._2dContext.drawImage(self._bufferCanvas, 0, 0);
                        window.requestAnimFrame(_renderCallback);
                    };
                    window.requestAnimFrame = (function () {
                        return window.requestAnimationFrame ||
                            window.webkitRequestAnimationFrame ||
                            window.mozRequestAnimationFrame ||
                            window.oRequestAnimationFrame ||
                            window.msRequestAnimationFrame ||
                            function (_renderCallback, element) {
                                window.setTimeout(_renderCallback, 1000 / 30);
                            };
                    })();
                    window.requestAnimFrame(_renderCallback);
                }
                this._isInitialized = true;
            };
            this._fwk = fwk;
        }
        return Engine;
    }());
    jsGame.Engine = Engine;
})(jsGame || (jsGame = {}));
var jsGame;
(function (jsGame) {
    var Sprite = (function () {
        function Sprite() {
        }
        return Sprite;
    }());
    jsGame.Sprite = Sprite;
    ;
})(jsGame || (jsGame = {}));
var jsGame;
(function (jsGame) {
    var Game = (function () {
        function Game(width, height, clearColor, canvas) {
            this._configuration = {
                width: 640,
                height: 480,
                clearColor: 'black',
                useExistingCanvas: false,
                existingCanvas: ''
            };
            this.start = function () {
                this._engine._init();
            };
            this._configuration.width = width || 640;
            this._configuration.height = height || 480;
            this._configuration.clearColor = clearColor || 'black';
            this._configuration.useExistingCanvas = typeof canvas !== 'undefined';
            this._configuration.existingCanvas = canvas || '';
            this._engine = new jsGame.Engine(this);
        }
        return Game;
    }());
    jsGame.Game = Game;
})(jsGame || (jsGame = {}));
