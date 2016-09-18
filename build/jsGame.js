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
                    this._lastTime = new Date().getTime();
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
    var Objects;
    (function (Objects) {
        var AnimatedGameObject = (function () {
            function AnimatedGameObject(g) {
                this.update = function (delta) { };
                this.draw = function (ctx) { };
                this.init = function () { };
                this.name = (g.name === undefined || typeof g.name !== 'string') ?
                    (Math.round((Math.random() * 1000) + 1000)) : g.name;
                this.visible = (g.visible === undefined || typeof g.visible !== 'boolean') ?
                    false : g.visible;
                this.update = g.update || undefined;
                this.draw = g.draw || undefined;
                this.init = g.init || this.init;
            }
            return AnimatedGameObject;
        }());
        Objects.AnimatedGameObject = AnimatedGameObject;
    })(Objects = jsGame.Objects || (jsGame.Objects = {}));
})(jsGame || (jsGame = {}));
var jsGame;
(function (jsGame) {
    var GameObject = (function () {
        function GameObject() {
            this.visible = true;
            this.update = function (delta) { };
        }
        GameObject.extend = function (gameObject) {
            return new jsGame.Objects.AnimatedGameObject(gameObject);
        };
        return GameObject;
    }());
    jsGame.GameObject = GameObject;
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
                for (var i = 0; i < selectedScene.length; this._fwk._gameObject.add(selectedScene[i++]),
                    selectedScene[i - 1].init())
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
    var Constants;
    (function (Constants) {
        (function (Keys) {
            Keys[Keys["A"] = 65] = "A";
            Keys[Keys["S"] = 83] = "S";
            Keys[Keys["D"] = 68] = "D";
            Keys[Keys["W"] = 87] = "W";
        })(Constants.Keys || (Constants.Keys = {}));
        var Keys = Constants.Keys;
    })(Constants = jsGame.Constants || (jsGame.Constants = {}));
})(jsGame || (jsGame = {}));
var jsGame;
(function (jsGame) {
    var Keyboard = (function () {
        function Keyboard(fwk) {
            this._pressedKeys = [];
            this._keyPressed = function (e) {
                this._pressedKeys[e.which] = true;
            };
            this._keyReleased = function (e) {
                delete this._pressedKeys[e.which];
            };
            this.isPressed = function (key) {
                return this._pressedKeys[key] !== undefined;
            };
            this._init = function () {
                var self = this;
                document.addEventListener("keydown", function (e) {
                    self._keyPressed.call(self, e);
                }, false);
                document.addEventListener("keyup", function (e) {
                    self._keyReleased.call(self, e);
                }, false);
            };
            this._fwk = fwk;
        }
        return Keyboard;
    }());
    jsGame.Keyboard = Keyboard;
})(jsGame || (jsGame = {}));
var jsGame;
(function (jsGame) {
    var Debugger = (function () {
        function Debugger() {
        }
        Debugger.FPS = function (x, y) {
            if (x === void 0) { x = 10; }
            if (y === void 0) { y = 10; }
            return jsGame.GameObject.extend({
                name: "debugger_fps",
                visible: true,
                init: function () {
                    this.bag = {
                        deltaAccumulator: 0,
                        maxFps: 0,
                        countFps: 0,
                        x: x,
                        y: y
                    };
                },
                update: function (delta) {
                    this.bag.deltaAccumulator += delta;
                    this.bag.countFps++;
                    if (this.bag.deltaAccumulator > 1) {
                        this.bag.deltaAccumulator = 0;
                        this.bag.maxFps = Math.max(this.bag.countFps, this.bag.maxFps);
                        this.bag.countFps = 0;
                    }
                },
                draw: function (ctx) {
                    ctx.fillStyle = 'green';
                    ctx.font = '10px Arial';
                    ctx.fillText('FPS: ' + this.bag.maxFps, this.bag.x, this.bag.y);
                }
            });
        };
        return Debugger;
    }());
    jsGame.Debugger = Debugger;
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
                this.keyboard._init();
            };
            this._configuration.width = width || 640;
            this._configuration.height = height || 480;
            this._configuration.clearColor = clearColor || 'black';
            this._configuration.useExistingCanvas = typeof canvas !== 'undefined';
            this._configuration.existingCanvas = canvas || '';
            this._gameObject = new jsGame.GameObjectHandler(this);
            this._engine = new jsGame.Engine(this);
            this.keyboard = new jsGame.Keyboard(this);
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
