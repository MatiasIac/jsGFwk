jsGFwk.Sprites = {

	sprites: {},
	
	//{ id: 'Sprite Name', graphic: image, top: 0, left: 0, width: 0, height: 0 }
	createSprite: function (spriteObject) {
		var tempCanvas = document.createElement("canvas");
		tempCanvas.width = spriteObject.width;
		tempCanvas.height = spriteObject.height;
		var tempContext = tempCanvas.getContext("2d");
		
		tempContext.drawImage(spriteObject.graphic, 
			spriteObject.top, spriteObject.left, spriteObject.width, spriteObject.height,
			0,0,spriteObject.width, spriteObject.height);
		
		jsGFwk.Sprites.sprites[spriteObject.id] = {};
		jsGFwk.Sprites.sprites[spriteObject.id].top = spriteObject.top;
		jsGFwk.Sprites.sprites[spriteObject.id].left = spriteObject.left;
		jsGFwk.Sprites.sprites[spriteObject.id].width = spriteObject.width;
		jsGFwk.Sprites.sprites[spriteObject.id].height = spriteObject.height;
		jsGFwk.Sprites.sprites[spriteObject.id].image = new Image();
		jsGFwk.Sprites.sprites[spriteObject.id].image.src = tempCanvas.toDataURL();
	},

	onStart: function () {
		
	}
};