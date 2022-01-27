class ResourcesManager {

    _name = "ResourcesManager";
    _totalResources = 0;
    _loadedResources = 0;

    PERCENTAGE_LOADED = 0;

    static SOUND_FORMATS = { 
        OGG: 'audio/ogg; codecs="vorbis"',
        WAVE: 'audio/wav; codecs="1"',
        MP3: 'audio/mpeg;',
        AAC: 'audio/mp4; codecs="mp4a.40.2"'
    };

    SOUNDS = {
        //TODO: Analyze if this is actually necessary
        //having these features in the sound manager is not a good idea
        //and, instead, should be implemented in each sound source
        
        /*isMuted: false,
        mute: function() {
            this.isMuted = true;
            this.doMute();
        },
        unMute: function () {
            this.isMuted = false;
            this.doMute();
        },
        doMute: function () {
            for (var soundSource in ResourcesManager.SOUNDS) {
                if (ResourcesManager.SOUNDS.hasOwnProperty(soundSource) && 
                    (soundSource !== 'format' && soundSource !== 'isMuted' && soundSource !== 'mute' && soundSource !== 'unMute' && soundSource !== 'doMute')) {
                        ResourcesManager.SOUNDS[soundSource]._volume = this.isMuted ? 
                            ResourcesManager.SOUNDS[soundSource].audio.volume : 
                            ResourcesManager.SOUNDS[soundSource]._volume;

                        ResourcesManager.SOUNDS[soundSource].audio.volume = this.isMuted ? 
                            0 :
                            ResourcesManager.SOUNDS[soundSource]._volume = this.isMuted ? 
                                ResourcesManager.SOUNDS[soundSource].audio.volume : 
                                ResourcesManager.SOUNDS[soundSource]._volume;
                }
            }
        }*/
    };

    GRAPHICS = {};

    constructor() { }

    _loadDispatcher(object) {
        this._loadedResources++;
        this.PERCENTAGE_LOADED = (this._loadedResources * 100) / this._totalResources;
        
        if (this._loadedResources == this._totalResources) {
            this._detachEvents();
            this.onResourcesLoadedCompleted();
        } else {
            this.onResourceLoaded(object);
        }
    }

    _detachEvents() {
        for (let soundSource in this.SOUNDS) {
            if (this.SOUNDS.hasOwnProperty(soundSource) && 
                (soundSource !== 'FORMAT' && soundSource !== 'isMuted' && soundSource !== 'mute' && soundSource !== 'unMute' && soundSource !== 'doMute')) {
                    this.SOUNDS[soundSource]._volume = 0;
                    this.SOUNDS[soundSource].audio.removeEventListener('canplaythrough', this._loadDispatcher);
            }
        }
    }

    addGraphic(source) {
        const image = new Image();
        image.onload = this._loadDispatcher.bind(this, image);
        source.image = image;
        this.GRAPHICS[source.name] = source;
        this._totalResources++;
    }

    addSound(source) {
        const sound = new Audio();
        let errorFound = false;
        
        if (source.sources != undefined) {
            for (let format in ResourcesManager.SOUND_FORMATS) {
                if (!!(sound.canPlayType && sound.canPlayType(ResourcesManager.SOUND_FORMATS[format]).replace(/no/, ''))) {
                    if (source.sources[ResourcesManager.SOUND_FORMATS[format]] == undefined) { 
                        errorFound = true;
                        break;
                    }

                    source.source = source.sources[ResourcesManager.SOUND_FORMATS[format]].source;
                    break;
                }
            }
        }
        
        if (!errorFound) {
            sound.addEventListener('canplaythrough', this._loadDispatcher.bind(this, sound), false);
            source.audio = sound;
            this.SOUNDS[source.name] = source;
            this._totalResources++;
        }
    }

    onResourcesLoadedCompleted() { };
		
    onResourceLoaded() { };

    onStart() {
        const self = this;

        setTimeout(function () {
            for (let imageSource in self.GRAPHICS) {
                if (self.GRAPHICS.hasOwnProperty(imageSource)) {
                    self.GRAPHICS[imageSource].image.src = self.GRAPHICS[imageSource].source;
                }
            }
            
            for (let soundSource in self.SOUNDS) {
                if (self.SOUNDS.hasOwnProperty(soundSource) && 
                    (soundSource !== 'FORMAT' && soundSource !== 'isMuted' && soundSource !== 'mute' && soundSource !== 'unMute' && soundSource !== 'doMute')) {
                        self.SOUNDS[soundSource].audio.src = self.SOUNDS[soundSource].source;
                }
            }
        }, 2000);
    }
}