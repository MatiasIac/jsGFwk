jsGFwk.ResourceManager = {
		_totalResources: 0,
		_totalLoadedResources: 0,
		_loadDispatcher: function () {
			jsGFwk.ResourceManager._totalLoadedResources++;
			
			if (jsGFwk.ResourceManager._totalLoadedResources >= jsGFwk.ResourceManager._totalResources) {
				jsGFwk.ResourceManager.onResourcesLoadedCompleted();
			} else {
				jsGFwk.ResourceManager.onResourcesLoaded();
			}
		},
		
		sounds: {},
		graphics: {},
		
		//source: { name: "object Name", source: "sprite Path", image: created by the framework }
		addGraphic: function (source) {
			var image = new Image();
			image.onload = this._loadDispatcher;
			source.image = image
			this.graphics[source.name] = source;
			this._totalResources++;
		},
		
		//source: { name: "object Name", source: "audio Path", audio: created by the framework }
		addSound: function (source) {
			var sound = new Audio();
			sound.addEventListener('canplaythrough', this._loadDispatcher, false);
			source.audio = sound;
			this.sounds[source.name] = source;
			this._totalResources++;
		},
		
		start: function() {
			setTimeout(function () {
				for (var imageSource in jsGFwk.ResourceManager.graphics) {
					if (jsGFwk.ResourceManager.graphics.hasOwnProperty(imageSource)) {
						jsGFwk.ResourceManager.graphics[imageSource].image.src = jsGFwk.ResourceManager.graphics[imageSource].source;
					}
				}
				
				for (var soundSource in jsGFwk.ResourceManager.sounds) {
					if (jsGFwk.ResourceManager.graphics.hasOwnProperty(imageSource)) {
						jsGFwk.ResourceManager.sounds[soundSource].audio.src = jsGFwk.ResourceManager.sounds[soundSource].source;
					}
				}
			}, 2000);
		},
		
		onResourcesLoadedCompleted: function () {},
		
		onResourcesLoaded: function() {}
};