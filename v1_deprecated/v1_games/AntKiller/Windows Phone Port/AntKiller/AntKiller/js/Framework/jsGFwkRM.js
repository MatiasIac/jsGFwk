jsGFwk.ResourceManager = {
		_plugInName: "ResourceManager",
		_loaded: false,
		_totalResources: 0,
		_totalLoadedResources: 0,
		_loadDispatcher: function () {
			jsGFwk.ResourceManager._totalLoadedResources++;
			
			if (jsGFwk.ResourceManager._totalLoadedResources == jsGFwk.ResourceManager._totalResources) {
				jsGFwk.ResourceManager._detachEvents();
				jsGFwk.ResourceManager.onResourcesLoadedCompleted();
			} else {
				jsGFwk.ResourceManager.onResourcesLoaded();
			}
		},
		
		_detachEvents: function () {
			for (var soundSource in jsGFwk.ResourceManager.sounds) {
				if (jsGFwk.ResourceManager.sounds.hasOwnProperty(soundSource) && soundSource !== 'format') {
					jsGFwk.ResourceManager.sounds[soundSource].audio.removeEventListener('canplaythrough', jsGFwk.ResourceManager._loadDispatcher);
				}
			}
		},
		
		sounds: {
			format: { 
				ogg: 'audio/ogg; codecs="vorbis"',
				wav: 'audio/wav; codecs="1"',
				mp3: 'audio/mpeg;',
				acc: 'audio/mp4; codecs="mp4a.40.2"'
			}
		},
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
			var errorFound = false;
			
			//Many possible sources
			if (source.sources != undefined) {
				//Replace the property source.source with the correct source
				for (var format in this.sounds.format) {
					if (!!(sound.canPlayType && sound.canPlayType(this.sounds.format[format]).replace(/no/, ''))) {
						if (source.sources[this.sounds.format[format]] == undefined) { 
							errorFound = true;
							break;
						}
						source.source = source.sources[this.sounds.format[format]].source;
						break;
					}
				}
			}
			
			if (!errorFound) {
				sound.addEventListener('canplaythrough', this._loadDispatcher, false);
				source.audio = sound;
				this.sounds[source.name] = source;
				this._totalResources++;
			}
		},
		
		onStart: function() {
			setTimeout(function () {
				for (var imageSource in jsGFwk.ResourceManager.graphics) {
					if (jsGFwk.ResourceManager.graphics.hasOwnProperty(imageSource)) {
						jsGFwk.ResourceManager.graphics[imageSource].image.src = jsGFwk.ResourceManager.graphics[imageSource].source;
					}
				}
				
				for (var soundSource in jsGFwk.ResourceManager.sounds) {
					if (jsGFwk.ResourceManager.sounds.hasOwnProperty(soundSource) && soundSource !== 'format') {
						jsGFwk.ResourceManager.sounds[soundSource].audio.src = jsGFwk.ResourceManager.sounds[soundSource].source;
					}
				}
			}, 2000);
		},
		
		onResourcesLoadedCompleted: function () {},
		
		onResourcesLoaded: function() {},
		
		onLoadReady: function () {
			jsGFwk.include(this._plugInName);
			if (!this._loaded) { this._loaded = true; this.onStart(); }
		}
};