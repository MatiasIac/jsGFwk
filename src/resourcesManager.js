class ResourcesManager {

    _name = "ResourcesManager";
    static _totalResources = 0;
    static _loadedResources = 0;

    static PERCENTAGE_LOADED = 0;

    static SOUNDS = {
        FORMAT: { 
            OGG: 'audio/ogg; codecs="vorbis"',
            WAVE: 'audio/wav; codecs="1"',
            MP3: 'audio/mpeg;',
            AAC: 'audio/mp4; codecs="mp4a.40.2"'
        },
        isMuted: false,
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
        }
    };

    static GRAPHICS = {};

    constructor() { }

    static _loadDispatcher() {
        ResourcesManager._loadedResources++;
        ResourcesManager.PERCENTAGE_LOADED = (ResourcesManager._loadedResources * 100) / ResourcesManager._totalResources;
        
        if (ResourcesManager._loadedResources == ResourcesManager._totalResources) {
            ResourcesManager._detachEvents();
            ResourcesManager.onResourcesLoadedCompleted();
        } else {
            ResourcesManager.onResourceLoaded(this);
        }
    }

    static _detachEvents() {
        for (let soundSource in this.SOUNDS) {
            if (this.SOUNDS.hasOwnProperty(soundSource) && 
                (soundSource !== 'FORMAT' && soundSource !== 'isMuted' && soundSource !== 'mute' && soundSource !== 'unMute' && soundSource !== 'doMute')) {
                    this.SOUNDS[soundSource]._volume = 0;
                    this.SOUNDS[soundSource].audio.removeEventListener('canplaythrough', this._loadDispatcher);
            }
        }
    }

    static addGraphic(source) {
        const image = new Image();
        image.onload = this._loadDispatcher;
        source.image = image;
        this.GRAPHICS[source.name] = source;
        this._totalResources++;
    }

    static addSound(source) {
        const sound = new Audio();
        let errorFound = false;
        
        if (source.sources != undefined) {
            for (let format in this.SOUNDS.FORMAT) {
                if (!!(sound.canPlayType && sound.canPlayType(this.SOUNDS.FORMAT[format]).replace(/no/, ''))) {
                    if (source.sources[this.SOUNDS.FORMAT[format]] == undefined) { 
                        errorFound = true;
                        break;
                    }

                    source.source = source.sources[this.SOUNDS.FORMAT[format]].source;
                    break;
                }
            }
        }
        
        if (!errorFound) {
            sound.addEventListener('canplaythrough', this._loadDispatcher, false);
            source.audio = sound;
            this.SOUNDS[source.name] = source;
            this._totalResources++;
        }
    }

    static onResourcesLoadedCompleted() { };
		
    static onResourceLoaded() { };

    onStart() {
        setTimeout(function () {
            for (let imageSource in ResourcesManager.GRAPHICS) {
                if (ResourcesManager.GRAPHICS.hasOwnProperty(imageSource)) {
                    ResourcesManager.GRAPHICS[imageSource].image.src = ResourcesManager.GRAPHICS[imageSource].source;
                }
            }
            
            for (let soundSource in ResourcesManager.SOUNDS) {
                if (ResourcesManager.SOUNDS.hasOwnProperty(soundSource) && 
                    (soundSource !== 'FORMAT' && soundSource !== 'isMuted' && soundSource !== 'mute' && soundSource !== 'unMute' && soundSource !== 'doMute')) {
                        ResourcesManager.SOUNDS[soundSource].audio.src = ResourcesManager.SOUNDS[soundSource].source;
                }
            }
        }, 2000);
    }
}