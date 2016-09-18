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
    var GameObjectHandler = (function () {
        function GameObjectHandler(fwk) {
            this._activeObjects = [];
            this._objectsToAdd = [];
            this._objectsToRemove = [];
            this.add = function (gameObject) {
                this._objectsToAdd.push(gameObject);
            };
            this.remove = function (gameObject) {
                this._objectsToRemove.push(gameObject);
            };
            this.processObjects = function () {
                for (var i = 0; i < this._objectsToRemove.length; i++) {
                    for (var j = 0; j < this._activeObjects.length; j++) {
                        if (this._objectsToRemove[i].name === this._activeObjects.name) {
                            this._activeObjects.splice(j, 1);
                            break;
                        }
                    }
                }
                this._objectsToRemove = [];
                for (var i = 0; i < this._objectsToAdd.length; i++) {
                    this._activeObjects.push(this._objectsToAdd[i]);
                }
                this._objectsToAdd = [];
            };
            this.getActiveObjects = function () {
                return this._activeObjects;
            };
            this._fwk = fwk;
        }
        return GameObjectHandler;
    }());
    jsGame.GameObjectHandler = GameObjectHandler;
})(jsGame || (jsGame = {}));
var jsGame;
(function (jsGame) {
    var Scene = (function () {
        function Scene(fwk) {
            this._scenes = {};
            this.add = function (sceneName, gameObjects) {
                this._scenes[sceneName] = gameObjects;
            };
            this.enable = function (sceneName) {
                this.disable(this._activeScene);
                var selectedScene = this._scenes[sceneName];
                if (typeof selectedScene === 'undefined') {
                    return;
                }
                for (var i = 0; i < selectedScene.length; this._fwk._gameObject.add(selectedScene[i++]))
                    ;
                this._activeScene = sceneName;
            };
            this.disable = function (sceneName) {
                var selectedScene = this._scenes[sceneName];
                if (typeof selectedScene === 'undefined') {
                    return;
                }
                for (var i = 0; i < selectedScene.length; this._fwk._gameObject.remove(selectedScene[i++]))
                    ;
                this._activeScene = undefined;
            };
            this._fwk = fwk;
        }
        return Scene;
    }());
    jsGame.Scene = Scene;
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
            this._gameObject = new jsGame.GameObjectHandler(this);
            this._engine = new jsGame.Engine(this);
            this.scene = new jsGame.Scene(this);
        }
        return Game;
    }());
    jsGame.Game = Game;
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
