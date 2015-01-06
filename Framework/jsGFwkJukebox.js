jsGFwk.Jukebox = (function() {

	var juke = function (settings) {
		var self = this;
		
		self._source = settings.source;
		if (settings.channels !== undefined) { self.channels(settings.channels); }
		if (settings.volume !== undefined) { self.volume(settings.volume); }
	};
	
	juke.prototype._source = {};
	juke.prototype._channels = [];
	juke.prototype._volume = 0;
	
	juke.prototype.pause = function () {
		var self = this;
		for (var i = 0; i < self._channels.length; i++) {
			self._channels[i].pause();
		}
	};
	
	juke.prototype.play = function () {
		var self = this;
		for (var i = 0; i < self._channels.length; i++) {
			if (self._channels[i].paused) {
				self._channels[i].play();
				break;
			}
		}
	};
	
	juke.prototype.channels = function (channels) {
		var self = this;
		if (channels === undefined) { return self._channels.length; }
		
		self._channels = [];
		for (var i = 0; i < channels; i++) {
		   var au = new Audio();
		   au.src = self._source.audio.src;
		   self._channels.push(au);
		}
	};
	
	juke.prototype.volume = function (volume) {
		var self = this;
		if (volume === undefined) {	return self._volume; }

		for (var i = 0; i < self._channels.length; i++) {
			self._channels[i].volume = volume;
		}
		
		self._volume = volume;
	};
	
	juke.prototype.onStart = function () { };
	juke.prototype.onObjectCreated = function (newObject) { };
	juke.prototype.onLoadReady = function () {};
	
	return juke;
})();