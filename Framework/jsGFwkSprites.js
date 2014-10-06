jsGFwk.Sprites = {

	_loaded: false,
	_plugInName: "Sprites",

	_genSprite: function (spriteObject, filter) {
		var tempCanvas = document.createElement("canvas");
		tempCanvas.width = spriteObject.width;
		tempCanvas.height = spriteObject.height;
		var tempContext = tempCanvas.getContext("2d");
		
		if (spriteObject.inverted) {
			tempContext.translate(spriteObject.width, 0);
			tempContext.scale(-1, 1);
		}
		
		tempContext.drawImage(spriteObject.graphic, 
			spriteObject.left, spriteObject.top, spriteObject.width, spriteObject.height,
			0,0,spriteObject.width, spriteObject.height);
		
		if (filter !== undefined) {
			filter(tempContext, spriteObject);
		}
		
		return tempCanvas.toDataURL();
	},
	
	createSpriteCollection: function (collectionId, graphic, values, filter) {
	    var coll = function () {
	        var self = this;
	        this._isLooping = false;
	        this._looper = function() {
	            self.seeker++;
	            self.seeker = self.seeker % self.spriteBag.length;
	        };

	        this._oneWay = function() {
	            if (self.seeker < self.spriteBag.length) {	
	                self.seeker++;
	            }
	        };

	        this._moveFrame = function() {};
	        this.spriteBag = [];
	        this.seeker = -1;

	        this.loop = function(on) {
	            if (on) {
	                self._moveFrame = self._looper;
	            } else {
	                self._moveFrame = self._oneWay;
	            }

	            self._isLooping = on;
	        };

	        this.next = function () {
	            self._moveFrame();				
	            self.sprite = self.spriteBag[self.seeker];
	        };

	        this.reset = function () {
	            self.seeker = -1;
	            self.next();
	        };

	        this.sprite = {};

	        this.clone = function () {
	            var cloned = new coll();

	            for (var i = 0; i < self.spriteBag.length; i++) {
	                var img = new Image();
	                img.src = self.spriteBag[i].image.src;
	                cloned.spriteBag.push({
	                    height: self.spriteBag[i].height,
	                    image: img,
	                    inverted: self.spriteBag[i].inverted,
	                    left: self.spriteBag[i].left,
	                    top: self.spriteBag[i].top,
	                    width: self.spriteBag[i].width,
	                });
	            }

	            cloned.loop(self._isLooping);

	            return cloned;
	        };
	    }

	    jsGFwk.Sprites[collectionId] = new coll();
		
		for (var i = 0; i < values.length; i++) {
			var spriteObject = { top: values[i].top, left: values[i].left, 
								 width: values[i].width, height: values[i].height, 
								 graphic: graphic, inverted: values[i].inverted || false };
			var image = new Image();
			image.src = this._genSprite(spriteObject, filter);
			spriteObject.image = image;
			delete spriteObject.graphic;
			
			jsGFwk.Sprites[collectionId].spriteBag[i] = spriteObject;
			jsGFwk.Sprites[collectionId].loop(false);
		}
	},
	
	//{ id: 'Sprite Name', graphic: image, top: 0, left: 0, width: 0, height: 0 }
	createSprite: function (spriteObject, filter) {
		jsGFwk.Sprites[spriteObject.id] = {};
		jsGFwk.Sprites[spriteObject.id].top = spriteObject.top;
		jsGFwk.Sprites[spriteObject.id].left = spriteObject.left;
		jsGFwk.Sprites[spriteObject.id].width = spriteObject.width;
		jsGFwk.Sprites[spriteObject.id].height = spriteObject.height;
		jsGFwk.Sprites[spriteObject.id].image = new Image();
		
		jsGFwk.Sprites[spriteObject.id].image.src = this._genSprite(spriteObject, filter);
	},
		
	filters: {
		_convolute: function (context, weights, img) {
			var side = Math.round(Math.sqrt(weights.length));
			var halfSide = Math.floor(side / 2);
			var pixels = context.getImageData(0, 0, img.width, img.height);
			var src = pixels.data;
			var sw = pixels.width;
			var sh = pixels.height;
			var w = pixels.width;
			var h = pixels.height;
			
			var tempCanvas = document.createElement("canvas");
			tempCanvas.width = w;
			tempCanvas.height = h;
			var tempContext = tempCanvas.getContext("2d");
			var pixelData = tempContext.createImageData(w, h);
			var dst = pixelData.data;
			
			var alphaFac = 0;
			for (var y = 0; y < h; y++) {
				for (var x = 0; x < w; x++) {
					var sy = y;
					var sx = x;
					var dstOff = (y * w + x) * 4;
					var r = 0, g = 0, b = 0, a = 0;
					for (var cy = 0; cy < side; cy++) {
						for (var cx = 0; cx < side; cx++) {
							var scy = sy + cy - halfSide;
							var scx = sx + cx - halfSide;
							if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
								var srcOff = (scy * sw + scx) * 4;
								var wt = weights[cy * side + cx];
								r += src[srcOff] * wt;
								g += src[srcOff+1] * wt;
								b += src[srcOff+2] * wt;
								a += src[srcOff+3] * wt;
							}
						}
					}
					dst[dstOff] = r;
					dst[dstOff+1] = g;
					dst[dstOff+2] = b;
					dst[dstOff+3] = a + alphaFac * (255 - a);
				}
			}
			
			context.putImageData(pixelData, 0, 0);
		},
		_convolute2: function (context, weights, img, offset, divisor) {
			if (!divisor) {
				divisor = weights.reduce(function(a, b) {return a + b;}) || 1;
			}
			var pixels = context.getImageData(0, 0, img.width, img.height);
			var src = pixels.data;
			var sw = pixels.width;
			var sh = pixels.height;
			var w = pixels.width;
			var h = pixels.height;
			
			var tempCanvas = document.createElement("canvas");
			tempCanvas.width = w;
			tempCanvas.height = h;
			var tempContext = tempCanvas.getContext("2d");
			var pixelData = tempContext.createImageData(w, h);
			var dst = pixelData.data;
			var len = dst.length; 
			var res = 0;

			for (var i = 0; i < len; i++) {
				if ((i + 1) % 4 === 0) {
				  dst[i] = src[i];
				  continue;
				}
				res = 0;
				var these = [
				  src[i - w * 4 - 4] || src[i],
				  src[i - w * 4]     || src[i],
				  src[i - w * 4 + 4] || src[i],
				  src[i - 4]         || src[i],
				  src[i],
				  src[i + 4]         || src[i],
				  src[i + w * 4 - 4] || src[i],
				  src[i + w * 4]     || src[i],
				  src[i + w * 4 + 4] || src[i]
				];
				for (var j = 0; j < 9; j++) {
				  res += these[j] * weights[j];
				}
				res /= divisor;
				if (offset) {
				  res += offset;
				}
				dst[i] = res;
			}
			context.putImageData(pixelData, 0, 0);
		},
		GRAYSCALE: function (context, img) {
			var imageData = context.getImageData(0, 0, img.width, img.height);
			var data = imageData.data;

			for (var i = 0; i < data.length; i += 4) {
				var brightness = 0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2];
				data[i] = brightness;
				data[i + 1] = brightness;
				data[i + 2] = brightness;
			}
			context.putImageData(imageData, 0, 0);
		},
		INVERTCOLOR: function (context, img) {
			var imageData = context.getImageData(0, 0, img.width, img.height);
			var data = imageData.data;
			for (var i = 0; i < data.length; i += 4) {
				data[i] = 255 - data[i];
				data[i + 1] = 255 - data[i + 1];
				data[i + 2] = 255 - data[i + 2];
			}
			context.putImageData(imageData, 0, 0);
		},
		DARKER: function (context, img) {
		    var imageData = context.getImageData(0, 0, img.width, img.height);
		    var data = imageData.data;
		    for (var i = 0; i < data.length; i += 4) {
                
		        data[i] = (data[i] - 50 < 0 ? 0 : data[i] - 50);
		        data[i + 1] = (data[i + 1] - 50 < 0 ? 0 : data[i + 1] - 50);
		        data[i + 2] = (data[i + 2] - 50 < 0 ? 0 : data[i + 2] - 50);
		    }
		    context.putImageData(imageData, 0, 0);
		},
		BLUR: function (context, img) {
			var weights = [1/9, 1/9, 1/9, 1/9, 1/9, 1/9, 1/9, 1/9, 1/9];
			jsGFwk.Sprites.filters._convolute(context, weights, img);
		},
		SHARPEN: function (context, img) {
			var weights = [ 0, -2, 0, -2, 11, -2, 0, -2, 0];
			jsGFwk.Sprites.filters._convolute2(context, weights, img);
		},
		EMBOSSSUBTLE: function (context, img) {
			var weights = [1, 1, -1, 1, 3, -1, 1, -1, -1];
			jsGFwk.Sprites.filters._convolute2(context, weights, img);
		},
		EMBOSS: function (context, img) {
			var weights = [2, 0, 0, 0, -1, 0, 0, 0, -1];
			jsGFwk.Sprites.filters._convolute2(context, weights, img, 127);
		},
		EDGEDETECT: function (context, img) {
			var weights = [1, 1, 1, 1, -7, 1, 1, 1, 1];
			jsGFwk.Sprites.filters._convolute2(context, weights, img);
		},
		EDGEDETECT2: function (context, img) {
			var weights = [-5, 0, 0, 0, 0, 0, 0, 0, 5];
			jsGFwk.Sprites.filters._convolute2(context, weights, img);
		}		
	},

	onStart: function () { },
	onLoadReady: function () {
		jsGFwk.include("FastAnimation");
		this.onStart();
	},
	onLoadReady: function () {
		jsGFwk.include(this._plugInName);
		if (!this._loaded) { this._loaded = true; this.onStart(); }
	}
};