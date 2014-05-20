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
		}
	},

	onStart: function () {
		
	}
};