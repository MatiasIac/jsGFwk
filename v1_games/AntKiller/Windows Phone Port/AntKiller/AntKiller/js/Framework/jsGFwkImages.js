jsGFwk.Images = {
	_plugInName: "Images",
	_loaded: false;
	merge: function (fromData, toData, settings) {
		var tempCanvas = document.createElement("canvas");
		tempCanvas.width = settings.width;
		tempCanvas.height = settings.height;
		var tempContext = tempCanvas.getContext("2d");
		
		if (settings.backgroundColor !== undefined) {
			tempContext.fillStyle = settings.backgroundColor;
			tempContext.fillRect(0, 0, settings.width, settings.height);
		}
		
		tempContext.drawImage(toData.image,
			toData.crop.x, toData.crop.y, toData.crop.width, toData.crop.height,
			toData.target.x, toData.target.y, toData.target.width, toData.target.height);
		
		tempContext.drawImage(fromData.image, 
			fromData.crop.x, fromData.crop.y, fromData.crop.width, fromData.crop.height,
			fromData.target.x, fromData.target.y, fromData.target.width, fromData.target.height);
		
		if (settings.filter !== undefined) {
			settings.filter(tempContext, settings);
		}
		
		var image = new Image();
		image.src =  tempCanvas.toDataURL();
		
		return image;
	},

	onStart: function () { },
	onLoadReady: function () {
		jsGFwk.include(this._plugInName);
		if (!this._loaded) { this._loaded = true; this.onStart(); }
	}
};