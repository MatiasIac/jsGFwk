jsGFwk.Sprites = {

	_genSprite: function (spriteObject) {
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
			
		return tempCanvas.toDataURL();
	},
	
	createSpriteCollection: function (collectionId, graphic, values) {
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
			sprite: {},
		};
		
		for (var i = 0; i < values.length; i++) {
			var spriteObject = { top: values[i].top, left: values[i].left, 
								 width: values[i].width, height: values[i].height, 
								 graphic: graphic, inverted: values[i].inverted || false };
			var image = new Image();
			image.src = this._genSprite(spriteObject);
			spriteObject.image = image;
			delete spriteObject.graphic;
			
			jsGFwk.Sprites[collectionId].spriteBag[i] = spriteObject;
			jsGFwk.Sprites[collectionId].loop(false);
		}
	},
	
	//{ id: 'Sprite Name', graphic: image, top: 0, left: 0, width: 0, height: 0 }
	createSprite: function (spriteObject) {
		jsGFwk.Sprites[spriteObject.id] = {};
		jsGFwk.Sprites[spriteObject.id].top = spriteObject.top;
		jsGFwk.Sprites[spriteObject.id].left = spriteObject.left;
		jsGFwk.Sprites[spriteObject.id].width = spriteObject.width;
		jsGFwk.Sprites[spriteObject.id].height = spriteObject.height;
		jsGFwk.Sprites[spriteObject.id].image = new Image();
		
		jsGFwk.Sprites[spriteObject.id].image.src = this._genSprite(spriteObject);
	},

	onStart: function () {
		
	}
};