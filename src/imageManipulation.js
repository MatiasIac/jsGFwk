class ImageManipulation {

    _name = "ImageManipulation";

    constructor () { }

    static merge(sourceA, sourceB, config) { 
        const tempCanvas = document.createElement("canvas");
		tempCanvas.width = config.width;
		tempCanvas.height = config.height;
		const tempContext = tempCanvas.getContext("2d");
		
		if (config.backgroundColor !== undefined) {
			tempContext.fillStyle = config.backgroundColor;
			tempContext.fillRect(0, 0, config.width, config.height);
		}
		
		tempContext.drawImage(sourceB.image,
			sourceB.crop.x, sourceB.crop.y, sourceB.crop.width, sourceB.crop.height,
			sourceB.target.x, sourceB.target.y, sourceB.target.width, sourceB.target.height);
		
		tempContext.drawImage(sourceA.image, 
			sourceA.crop.x, sourceA.crop.y, sourceA.crop.width, sourceA.crop.height,
			sourceA.target.x, sourceA.target.y, sourceA.target.width, sourceA.target.height);
		
		if (config.filter !== undefined) {
			config.filter(tempContext, config);
        }
		
		const image = new Image();
		image.src =  tempCanvas.toDataURL();
		
		return image;
    }

}

export { ImageManipulation };