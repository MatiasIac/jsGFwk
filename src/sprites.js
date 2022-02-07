class SpriteCollection {

	_isLooping = false;
	sprites = [];
	seeker = -1;
	sprite = { };

	constructor () { }

	_looper() {
		this.seeker++;
		this.seeker = this.seeker % this.sprites.length;
	}

	_oneWay() {
		if (this.seeker < this.sprites.length) {	
			this.seeker++;
		}
	}

	_moveFrame() { }
		
	loop(on) {
		this._moveFrame = on ? this._looper : this._oneWay;
		this._isLooping = on;
	}

	moveNextSprite() {
		this._moveFrame();				
		this.sprite = this.sprites[this.seeker];
	}

	reset() {
		this.seeker = -1;
		this.moveNextSprite();
	}

	clone() {
		const cloned = new SpriteCollection();

		for (let i = 0; i < this.sprites.length; i++) {
			let img = new Image();
			img.src = self.sprites[i].image.src;

			cloned.sprites.push({
				height: this.sprites[i].height,
				image: img,
				inverted: this.sprites[i].inverted,
				left: this.sprites[i].left,
				top: this.sprites[i].top,
				width: this.sprites[i].width,
			});
		}

		cloned.loop(this._isLooping);

		return cloned;
	}
}

class Sprites {

    _name = "Sprites";

    SPRITES_BAG = {};

    constructor() {}

	static _genSprite(object, filter) {
		const tempCanvas = document.createElement("canvas");
		const tempContext = tempCanvas.getContext("2d");

        tempCanvas.width = object.width;
		tempCanvas.height = object.height;
		
		if (object.inverted) {
			tempContext.translate(spriteObject.width, 0);
			tempContext.scale(-1, 1);
		}
		
		tempContext.drawImage(object.graphic, 
			object.left, object.top, object.width, object.height,
			0, 0, object.width, object.height);
		
		if (filter !== undefined) {
			filter(tempContext, object);
		}
		
		return tempCanvas.toDataURL();
	}

	static createCropSequence(base, howMany, isInverted) {
		let values = [];

		for (let i = 0; i < howMany; i++) {
			values.push({
				left: base.left + (i * base.width),
				top: base.top,
				width: base.width,
				height: base.height,
				inverted: isInverted !== undefined && isInverted
			});
		}

		return values;
	}

	createCollection(id, graphic, values, filter) {
	    this.SPRITES_BAG[id] = new SpriteCollection();
		
		for (let i = 0; i < values.length; i++) {
			let spriteObject = { top: values[i].top, left: values[i].left, 
				width: values[i].width, height: values[i].height, 
				graphic: graphic, inverted: values[i].inverted || false };

			let image = new Image();
			image.src = Sprites._genSprite(spriteObject, filter);
			spriteObject.image = image;
			delete spriteObject.graphic;
			
			this.SPRITES_BAG[id].sprites[i] = spriteObject;
			this.SPRITES_BAG[id].loop(false);
		}
	}

    create(object, filter) {
        const imageSource = new Image();

		this.SPRITES_BAG[object.id] = {
            top: object.top,
            left: object.left,
            width: object.width,
            height: object.height,
            image: imageSource
        };

        imageSource.src = Sprites._genSprite(object, filter);
	}
}

export { SpriteCollection, Sprites };