class Sprites {

    _name = "Sprites";

    static SPRITES_BAG = {};

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
			filter(tempContext, spriteObject);
		}
		
		return tempCanvas.toDataURL();
	}

    static create(object, filter) {
        const imageSource = new Image();

		this[object.id] = {
            top: object.top,
            left: object.left,
            width: object.width,
            height: object.height,
            image: imageSource
        };

        imageSource.src = this._cropFromImage(object, filter);
	}

    //generateStandardCrop
    //createSpriteCollection
    //filters
}