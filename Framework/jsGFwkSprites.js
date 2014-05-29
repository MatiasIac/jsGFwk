jsGFwk.Sprites = {

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
		jsGFwk.Sprites[collectionId] = {
			_looper: function() {
				this.seeker++;
				this.seeker = this.seeker % this.spriteBag.length;
			},
			_oneWay: function() {
				if (this.seeker < this.spriteBag.length) {	
					this.seeker++;
				}
			},
			_moveFrame: function() {},
			spriteBag: [],
			seeker: -1,
			loop: function(on) {
				if (on) {
					this._moveFrame = this._looper;
				} else {
					this._moveFrame = this._oneWay;
				}
			},
			next: function () {
				this._moveFrame();				
				this.sprite = this.spriteBag[this.seeker];
			},
			reset: function () {
				this.seeker = -1;
				this.next();
			},
			sprite: {},
		};
		
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
			var side = Math.round(Math.sqrt(weights.length));
			var halfSide = Math.floor(side / 2);
			var pixels = context.getImageData(0, 0, img.width, img.height); //getPixelData(v, w, h);
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
			
			// Iterate through the destination image pixels
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
		}
	},

	onStart: function () {
		
	}
};