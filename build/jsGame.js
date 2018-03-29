"use strict";
var jsGFwk;
(function (jsGFwk) {
    var Configuration = /** @class */ (function () {
        function Configuration(width, height, color, canvasId) {
            this._width = 640;
            this._height = 480;
            this._defaultColor = 'black';
            this._canvasName = "jsgfwk-" + (parseInt(String(Math.random() * 100000)) + 100) + "-canvas";
            this._2dCanvas = null;
            this._2dContext = null;
            this._bufferCanvas = null;
            this._bufferContext = null;
            this._width = width || this._width;
            this._height = height || this._height;
            this._defaultColor = color || this._defaultColor;
            this._canvasName = canvasId || this._canvasName;
            this._setup();
        }
        Configuration.prototype._setup = function () {
            this._2dCanvas = document.getElementById(this._canvasName);
            if (this._2dCanvas === null) {
                this._2dCanvas = document.createElement('canvas');
                this._2dCanvas.width = this._width;
                this._2dCanvas.height = this._height;
                this._2dCanvas.id = this._canvasName;
                document.getElementsByTagName('body')[0].appendChild(this._2dCanvas);
            }
            this._2dContext = this._2dCanvas.getContext('2d');
            this._bufferCanvas = document.createElement('canvas');
            this._bufferCanvas.width = this._2dCanvas.width;
            this._bufferCanvas.height = this._2dCanvas.height;
            this._bufferContext = this._bufferCanvas.getContext('2d');
        };
        Object.defineProperty(Configuration.prototype, "context", {
            get: function () {
                return this._2dContext;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Configuration.prototype, "canvas", {
            get: function () {
                return this._2dCanvas;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Configuration.prototype, "bufferContext", {
            get: function () {
                return this._bufferContext;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Configuration.prototype, "bufferCanvas", {
            get: function () {
                return this._bufferCanvas;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Configuration.prototype, "width", {
            get: function () {
                return this._width;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Configuration.prototype, "height", {
            get: function () {
                return this._height;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Configuration.prototype, "color", {
            get: function () {
                return this._defaultColor;
            },
            enumerable: true,
            configurable: true
        });
        return Configuration;
    }());
    jsGFwk.Configuration = Configuration;
})(jsGFwk || (jsGFwk = {}));
/// <reference path="definitions.ts" />
var jsGFwk;
/// <reference path="definitions.ts" />
(function (jsGFwk) {
    var Scene = /** @class */ (function () {
        function Scene(name, gameObjects) {
            this._name = name;
            this._objects = gameObjects;
        }
        Scene.prototype.initializeObjects = function () {
            this._objects.forEach(function (x) { return x.define(); });
        };
        Object.defineProperty(Scene.prototype, "animatedObjects", {
            get: function () {
                return this._objects;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Scene.prototype, "name", {
            get: function () {
                return this._name;
            },
            enumerable: true,
            configurable: true
        });
        return Scene;
    }());
    var SceneHandler = /** @class */ (function () {
        function SceneHandler() {
            this._currentScene = undefined;
            this._scenes = new Array();
        }
        SceneHandler.prototype.add = function (name, gameObjects) {
            this._scenes.push(new Scene(name, gameObjects));
        };
        SceneHandler.prototype.enable = function (name) {
            if (this._currentScene !== undefined) {
                this._currentScene.animatedObjects.forEach(function (element) { return element.destroy(); });
            }
            var scene = this._scenes.filter(function (element) { return element.name === name; });
            this._currentScene = scene[0];
            this._currentScene.initializeObjects();
        };
        SceneHandler.prototype.process = function () {
            if (this._currentScene !== undefined) {
                this._currentScene.animatedObjects.forEach(function (element) {
                    element.update();
                });
                this._currentScene.animatedObjects.forEach(function (element) {
                    if ("draw" in element) {
                        element.draw();
                    }
                });
            }
        };
        return SceneHandler;
    }());
    jsGFwk.SceneHandler = SceneHandler;
})(jsGFwk || (jsGFwk = {}));
/// <reference path="configuration.ts" />
/// <reference path="definitions.ts" />
var jsGFwk;
/// <reference path="configuration.ts" />
/// <reference path="definitions.ts" />
(function (jsGFwk) {
    var Engine = /** @class */ (function () {
        function Engine(configuration, updatables) {
            this._lastTime = 0;
            this._configuration = configuration;
            this._updatables = updatables;
            var self = this;
            var _r = function () {
                var currentTime = new Date().getTime(), delta = (currentTime - self._lastTime) / 1000;
                self._lastTime = currentTime;
                self._configuration.bufferContext.save();
                self._configuration.bufferContext.fillStyle = self._configuration.color;
                self._configuration.bufferContext.fillRect(0, 0, self._configuration.width, self._configuration.height);
                self._configuration.bufferContext.restore();
                self._updatables.forEach(function (x) { return x.process(); });
                self._configuration.context.drawImage(self._configuration.bufferCanvas, 0, 0);
                window.requestAnimationFrame(_r);
            };
            window.requestAnimationFrame(_r);
        }
        return Engine;
    }());
    jsGFwk.Engine = Engine;
})(jsGFwk || (jsGFwk = {}));
/// <reference path="configuration.ts" />
/// <reference path="definitions.ts" />
/// <reference path="engine.ts" />
/// <reference path="scene.ts" />
var jsGFwk;
/// <reference path="configuration.ts" />
/// <reference path="definitions.ts" />
/// <reference path="engine.ts" />
/// <reference path="scene.ts" />
(function (jsGFwk) {
    var Game = /** @class */ (function () {
        function Game(configuration) {
            this._configuration = configuration;
            this._sceneHandler = new jsGFwk.SceneHandler();
            this._engine = new jsGFwk.Engine(this._configuration, [this._sceneHandler]);
        }
        Game.prototype.start = function () {
        };
        Game.prototype.pause = function () {
        };
        Object.defineProperty(Game.prototype, "scene", {
            get: function () {
                return this._sceneHandler;
            },
            enumerable: true,
            configurable: true
        });
        return Game;
    }());
    jsGFwk.Game = Game;
})(jsGFwk || (jsGFwk = {}));
//# sourceMappingURL=jsGame.js.map