var jsGFwk = (function() {
	var engine = {
		_gameObjects: {},
		_includes: [],		
		settings: {
			canvas: "",
			width: 640,
			height: 480,
			frameRate: 1000/33,
            clearColor: "rgb(0,0,0)",

			applyChanges: function () {
				var c = document.getElementById(this.canvas);
				c.width = this.width;
				c.height = this.height;
			}
		},

		createObject: function(object) {
			if (object.id === undefined) {
				return;
			}
			
			object.destroy = function() {
				delete jsGFwk._gameObjects[object.id];
			};
			
			this._gameObjects[object.id] = object;
			
			for (var i = 0; i < this._includes.length; i++) {
				if (this[this._includes[i]].onObjectCreated !== undefined) {
					this[this._includes[i]].onObjectCreated(this._gameObjects[object.id]);
				}
			}
			
			if (object.init !== undefined) { object.init(); }
		},
		
		sort: function () {
			var arr = [];
			for (var prop in this._gameObjects) {
				arr.push(this._gameObjects[prop]);
			}
		
			arr.sort(function(a,b){return a.zOrder - b.zOrder;});
			
			for (var i = 0; i < arr.length; i++) {
				delete jsGFwk._gameObjects[arr[i].id];
				this._gameObjects[arr[i].id] = arr[i];
			}
		},
		
		include: function (componentName) {
			for (var i = 0; i < this._includes.length; i++) {
				if (componentName === this._includes[i]) { return; }
			}
			this._includes[this._includes.length] = componentName;
		},
		
		load: function (fileName) {
			if (fileName !== undefined && typeof fileName === "string") {
				var script = document.createElement("script");
				script.type = "text/javascript";
				
				script.onload = function(){
					for (var p in jsGFwk) {
						if (jsGFwk[p].onLoadReady !== undefined) {
							jsGFwk[p].onLoadReady();
						}
					}
				};
			
				script.src = fileName;
				document.getElementsByTagName("head")[0].appendChild(script);
			}
		},
		
		start: function() {
			for (var i = 0; i < this._includes.length; i++) {
				if (this[this._includes[i]].onStart !== undefined) {
					this[this._includes[i]].onStart();
				}
			}
		},
		
		stop: function () {
			for (var i = 0; i < this._includes.length; i++) {
				if (this[this._includes[i]].onStop !== undefined) {
					this[this._includes[i]].onStop();
				}
			}
		},
		
		getGameObjects: function () {
			return this._gameObjects;
        },
        
        /* Modules */
        FastAnimation: {
            _plugInName: "FastAnimation",
            _loaded: false,
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
                        if (o !== undefined && o.update) { o.update(delta); }
                        if (o !== undefined && (o.draw && o.visible)) {
                            jsGFwk.FastAnimation._2Dbuffer.save();
                            o.draw(jsGFwk.FastAnimation._2Dbuffer);
                            jsGFwk.FastAnimation._2Dbuffer.restore();
                        }
                    }
                }
    
                for (var i = 0; i < jsGFwk._includes.length; i++) {
                    if (jsGFwk[jsGFwk._includes[i]].onPreRender !== undefined) {
                        jsGFwk.FastAnimation._2Dbuffer.save();
                        jsGFwk[jsGFwk._includes[i]].onPreRender(jsGFwk.FastAnimation._2Dbuffer);
                        jsGFwk.FastAnimation._2Dbuffer.restore();
                    }
                }
                
                for (var name in jsGFwk._gameObjects) {
                    jsGFwk.FastAnimation._2Dbuffer.save();
                    jsGFwk._gameObjects[name].postRender !== undefined && jsGFwk._gameObjects[name].postRender(jsGFwk.FastAnimation._2Dbuffer);
                    jsGFwk.FastAnimation._2Dbuffer.restore();
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
        },

        IO: {
            _plugInName: "IO",
            _loaded: false,
            keyboard: {
                _keyboardCallers: [],
                _activeKey: [],
                _stopPropagation: function () {},
                eventPropagation: function (propagate) {
                    if (propagate) {
                        this._stopPropagation = function () {};
                    } else {
                        this._stopPropagation = function (e) { e.preventDefault(); };
                    }
                },
                _keyReleased: function(e) {
                    delete jsGFwk.IO.keyboard._activeKey[e.which];
                },
                _keyPressed: function(e) {
                    jsGFwk.IO.keyboard._stopPropagation(e);
                    for (i = 0; i < jsGFwk.IO.keyboard._keyboardCallers.length; jsGFwk.IO.keyboard._keyboardCallers[i++](e.which));
                    jsGFwk.IO.keyboard._activeKey[e.which] = true;
                },
                
                key: {
                    "A": 65,
                    "D": 68,
                    "I": 73,
                    "J": 74,
                    "K": 75,
                    "L": 76,
                    "N": 78,
                    "S": 83,
                    "W": 87,
                    "M": 77,
                    "N": 78,
                    "C": 67,
                    "ONE": 49,
                    "TWO": 50,
                    "THREE": 51,
                    "SHIFT": 16,
                    "SPACEBAR": 32,
                    "ENTER": 13,
                    "CONTROL": 17
                },
                
                getActiveKeys: function() {
                    return this._activeKey;
                },
                
                registerKeypress: function(f) {
                    this._keyboardCallers.push(f);
                    return (this._keyboardCallers.length - 1);
                },
                
                unregisterKeypress: function(callerId) {
                    this._keyboardCallers.splice(callerId, 1);
                }
            },

            mouse: {
                _mouseClickCounter: 0,
                _mouseClickCallers: {},
                _mouseMoveCallers: [],
                _mouseDownCounter: 0,
                _mouseDownCallers: {},
                _mouseWhellCallers: [],
                
                _lastDownCoords: {},
                _lastMoveCoords: {},
                _isMousePressed: false,
                
                _getCoordinates: function (e) {
                    var deltaWheel = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
                    var originalWheelValue = (e.wheelDelta || -e.detail);
        
                    if (e.offsetX)
                        return { x: e.offsetX, y: e.offsetY, wheel: { normalized: deltaWheel, delta: originalWheelValue } };
                    else if (e.layerX)
                        return { x: e.layerX, y: e.layerY, wheel: { normalized: deltaWheel, delta: originalWheelValue } };
                    else
                        return { x: e.pageX - jsGFwk._canvas.offsetLeft, y: e.pageY - jsGFwk._canvas.offsetTop, wheel: { normalized: deltaWheel, delta: originalWheelValue } };
                },
                
                _mouseDown: function(e) {
                    jsGFwk.IO.mouse._isMousePressed = true;
                    jsGFwk.IO.mouse._lastDownCoords = jsGFwk.IO.mouse._getCoordinates(e);
                    for (var p in jsGFwk.IO.mouse._mouseDownCallers) {
                        if (jsGFwk.IO.mouse._mouseDownCallers.hasOwnProperty(p)) {
                            jsGFwk.IO.mouse._mouseDownCallers[p](jsGFwk.IO.mouse._lastDownCoords);
                        }
                    }
                },
                
                _mouseUp: function() {
                    jsGFwk.IO.mouse._isMousePressed = false;
                    for (var p in jsGFwk.IO.mouse._mouseClickCallers) {
                        if (jsGFwk.IO.mouse._mouseClickCallers.hasOwnProperty(p)) {
                            jsGFwk.IO.mouse._mouseClickCallers[p](jsGFwk.IO.mouse._lastDownCoords);
                        }
                    }
                },
                
                _mouseMove: function(e) {
                    jsGFwk.IO.mouse._lastMoveCoords = jsGFwk.IO.mouse._getCoordinates(e);
                    for (var i = 0; i < jsGFwk.IO.mouse._mouseMoveCallers.length; jsGFwk.IO.mouse._mouseMoveCallers[i++](jsGFwk.IO.mouse._lastMoveCoords));
                },
        
                _mouseWheel: function (e) {
                    jsGFwk.IO.mouse._lastMoveCoords = jsGFwk.IO.mouse._getCoordinates(e);
                    for (var i = 0; i < jsGFwk.IO.mouse._mouseWhellCallers.length; jsGFwk.IO.mouse._mouseWhellCallers[i++](jsGFwk.IO.mouse._lastMoveCoords));		    
                },
                
                registerClick: function(f) {
                    this._mouseClickCallers[this._mouseClickCounter] = f;
                    this._mouseClickCounter++;
                    return (this._mouseClickCounter - 1);
                },
                
                unregisterClick: function(callerId) {
                    delete this._mouseClickCallers[callerId];
                },
                
                registerMove: function(f) {
                    this._mouseMoveCallers.push(f);
                    return (this._mouseMoveCallers.length - 1);
                },
                
                unregisterMove: function(callerId) {
                    this._mouseMoveCallers.splice(callerId, 1);
                },
        
                registerDown: function(f) {
                    this._mouseDownCallers[this._mouseDownCounter] = f;
                    this._mouseDownCounter++;
                    return (this._mouseDownCounter - 1);
                },
                
                unregisterDown: function(callerId) {
                    delete this._mouseDownCallers[callerId];
                },
        
                registerWheel: function (f) {
                    this._mouseWhellCallers.push(f);
                    return (this._mouseWhellCallers.length - 1);
                },
        
                unregisterWheel: function (callerId) {
                    this._mouseWhellCallers.splice(callerId, 1);
                }
            },
            
            touch: {
                _touchCounter: 0,
                _touchCallers: {},
                _getCoordinates: function (e) {
                    return { 
                        x: e.changedTouches[0].clientX, 
                        y: e.changedTouches[0].clientY
                    };
                },
                _touchEnd: function (e) {
                    var currentTouch = jsGFwk.IO.touch._getCoordinates(e);
                    for (var p in jsGFwk.IO.touch._touchCallers) {
                        if (jsGFwk.IO.touch._touchCallers.hasOwnProperty(p)) {
                            jsGFwk.IO.touch._touchCallers[p](currentTouch);
                        }
                    }
                },
                registerTouch: function (f) {
                    this._touchCallers[this._touchCounter] = f;
                    this._touchCounter++;
                    return (this._touchCounter - 1);
                },
                unregisterTouch: function (callerId) {
                    delete this._touchCallers[callerId];
                }
            },
            
            onStart: function() {
                document.addEventListener("keydown", this.keyboard._keyPressed, false);
                document.addEventListener("keyup", this.keyboard._keyReleased, false);
                
                document.getElementById(jsGFwk.settings.canvas).addEventListener("mousedown", this.mouse._mouseDown, false);
                document.getElementById(jsGFwk.settings.canvas).addEventListener("mouseup", this.mouse._mouseUp, false);
                document.getElementById(jsGFwk.settings.canvas).addEventListener("mousemove", this.mouse._mouseMove, false);
                document.getElementById(jsGFwk.settings.canvas).addEventListener("mousewheel", this.mouse._mouseWheel, false);
                document.getElementById(jsGFwk.settings.canvas).addEventListener("DOMMouseScroll", this.mouse._mouseWheel, false);
                
                document.getElementById(jsGFwk.settings.canvas).addEventListener("touchend", this.touch._touchEnd, false);
            },
            onLoadReady: function () {
                jsGFwk.include(this._plugInName);
                if (!this._loaded) { this._loaded = true; this.onStart(); }
            }
        },

        Collisions: {
            _plugInName: "Collisions",
            _loaded: false,
            _rectColliding: function (otherObject) {
                if (!otherObject) { return false; }
                if (this.width == undefined || this.height == undefined || this.x == undefined || this.y == undefined) { return false; }
                if (otherObject.width == undefined || otherObject.height == undefined || otherObject.x == undefined || otherObject.y == undefined) { return false; }
                if (!this.rotationPoint) { this.rotationPoint = { x: 0, y: 0 }; }
                if (!otherObject.rotationPoint) { otherObject.rotationPoint = { x: 0, y: 0 }; }
        
                var thisX = this.x - this.rotationPoint.x;
                var thisY = this.y - this.rotationPoint.y;
                
                var otherX = otherObject.x - otherObject.rotationPoint.x;
                var otherY = otherObject.y - otherObject.rotationPoint.y;
                
                if (thisX + this.width < otherX)
                    return false;
                if (thisY + this.height < otherY)
                    return false;
                if (thisX > otherX + otherObject.width)
                    return false;
                if (thisY > otherY + otherObject.height)
                    return false;
        
                return true;
            },

            _disColliding: function (otherObject) {
                if (!otherObject) { return false; }
                if (!this.radius || !this.x || !this.y || !this.center) { return false; }
                if (!otherObject.radius || !otherObject.x || !otherObject.y) { return false; }
                
                var dx = (otherObject.x + otherObject.center.x) - (this.x + this.center.x);
                var dy = (otherObject.y + otherObject.center.y) - (this.y + this.center.y);
                var dist = Math.sqrt(dx * dx + dy * dy);
        
                return (dist < this.radius + otherObject.radius);
            },
            
            collidingModes: {
                'RECTANGLE': 0,
                'RAD_DISTANCE': 1
            },
            
            areCollidingBy: function (object1, object2, mode) {
                switch (mode) {
                    case this.collidingModes.RECTANGLE:
                        return this._rectColliding.call(object1, object2);
                        break;
                    case this.collidingModes.RAD_DISTANCE:
                        return this._disColliding.call(object1, object2);
                        break;
                    default:
                        break;
                }
            },
            
            onStart: function () { },
            
            onObjectCreated: function (newObject) {
                if (!newObject.width) { newObject.width = 1; }
                if (!newObject.height) { newObject.height = 1; }
                if (!newObject.radius) { newObject.radius = 1; }
                if (!newObject.center) { newObject.center = { x: 0, y: 0 }; }
                newObject.isRectColliding = this._rectColliding;
                newObject.isRadColliding = this._disColliding;
            },

            onLoadReady: function () {
                jsGFwk.include(this._plugInName);
                if (!this._loaded) { this._loaded = true; this.onStart(); }
            }
        },
        
        Container: {
            container: function(settings) {
                var self = this;
                var _allObjects = {};
                var _objectCounter = 0;
                
                this._settings = settings;
                this.id = "";
                this.visible = true;
                this.zOrder = 0;
                this.update = function (delta) { 
                    for (var o in _allObjects) {
                        if (_allObjects[o].onUpdate !== undefined) { _allObjects[o].onUpdate(delta); }
                    }
                };

                this.draw = function (context) { 
                    for (var o in _allObjects) {
                        if (_allObjects[o].onDraw !== undefined) { _allObjects[o].onDraw(context); }
                    }
                };
                
                this.length = function () {
                    var count = 0;
                    for (var p in _allObjects) {
                        if (_allObjects.hasOwnProperty(p)) {
                            count++;
                        }
                    }
                    
                    return count;
                };
                
                this.eachCloned = function (f) {
                    var event = { cancel: false };
                    for (var p in _allObjects) {
                        if (_allObjects.hasOwnProperty(p)) {
                            f(_allObjects[p], event);
                            if (event.cancel) { break; }
                        }
                    }
                };
                
                this.clearAll = function () {
                    for (var o in _allObjects) { _allObjects[o].destroy(); }
                    _allObjects = {};
                    _objectCounter = 0;
                };
                
                this.cloneObject = function (initParameters) {
                    var cloned = Object.create(self._settings);
                    
                    _objectCounter++;
                    cloned._containerElementPosition = _objectCounter;
                    cloned.destroy = function() {
                        delete _allObjects[cloned._containerElementPosition];
                    };
                    
                    if (cloned.onInit != undefined) { cloned.onInit(initParameters); }
                    _allObjects[_objectCounter] = cloned;
                    
                    if (jsGFwk.Debugger) {
                        jsGFwk.Debugger.onObjectCreated(cloned);
                    }
                    
                    return cloned;
                };
                
                this.getClonedAt = function(index) {
                    var i = 0;
                    for (var p in _allObjects) {
                        if (_allObjects.hasOwnProperty(p)) {
                            i++;
                            if (i === index) {
                                return _allObjects[p];
                            }
                        }
                    }
                };
            },
            _plugInName: "Container",
            _loaded: false,
            onStart: function() { },
            onObjectCreated: function() { },
            createContainer: function (containerName, settings, notActivateNow) {
                var newContainer = new container(settings);
                newContainer.id = containerName;
                if (!notActivateNow) {
                    jsGFwk.createObject(newContainer);
                }
                return newContainer;
            },
            onLoadReady: function () {
                jsGFwk.include(this._plugInName);
                if (!this._loaded) { this._loaded = true; this.onStart(); }
            }
            
        }
    }
    
    return engine;
}());

module.exports = jsGFwk;