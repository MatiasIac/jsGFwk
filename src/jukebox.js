class Jukebox {
    _name = "Jukebox";

    _source = {};
    _channels = [];
    _volume = 0;
    _totalChannels = 1;

    constructor(source, channels, volume) {
        this._source = source;
        this._volume = volume || 0;
        this._totalChannels = channels || 1;

        if (source !== undefined) {
            this.createChannels(this._totalChannels);
        }
    }

    setSource(source) {
        this._source = source;
        this.createChannels(this._totalChannels);
    }

    createChannels(howMany) {
        // remove any previously created channel
        this._channels = [];

        for (var i = 0; i < howMany; i++) {
            var audio = new Audio();
            audio.src = this._source.audio.src;
            audio.volume = this._volume;
            this._channels.push(audio);
        }
    }

    pause() {
        for (var i = 0; i < this._channels.length; i++) {
            this._channels[i].pause();
        }
    }

    play() {
        for (var i = 0; i < this._channels.length; i++) {
            if (this._channels[i].paused) {
                this._channels[i].play();
                break;
            }
        }
    }

    volume(volume) {
        if (volume === undefined) { return this._volume; }

        for (var i = 0; i < this._channels.length; i++) {
            this._channels[i].volume = volume;
        }

        this._volume = volume;
    }
}

export { Jukebox };