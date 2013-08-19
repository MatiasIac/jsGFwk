jsGFwk.resources = {
		_totalResources: 0,
		_totalLoadedResources: 0,
		_loadDispatcher: function () {
			jsGFwk.resources._totalLoadedResources++;
			
			if (jsGFwk.resources._totalLoadedResources >= jsGFwk.resources._totalResources) {
				jsGFwk.resources.onResourcesLoadedCompleted();
			} else {
				jsGFwk.resources.onResourcesLoaded();
			}
		},
		
		sounds: {},
		sprites: {},
		
		//source: { name: "object Name", source: "sprite Path", image: created by the framework }
		addSprite: function (source) {
			var image = new Image();
			image.onload = this._loadDispatcher;
			source.image = image
			this.sprites[source.name] = source;
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
				for (var imageSource in jsGFwk.resources.sprites) {
					jsGFwk.resources.sprites[imageSource].image.src = jsGFwk.resources.sprites[imageSource].source;
				}
				
				for (var soundSource in jsGFwk.resources.sounds) {
					jsGFwk.resources.sounds[soundSource].audio.src = jsGFwk.resources.sounds[soundSource].source;
				}
			}, 2000);
		},
		
		onResourcesLoadedCompleted: function () {},
		
		onResourcesLoaded: function() {}
};