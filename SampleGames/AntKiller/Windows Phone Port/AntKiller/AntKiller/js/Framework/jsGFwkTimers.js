jsGFwk.Timer = (function() {

	var timers = function (processor) {
		var self = this;
		
		if (processor !== undefined) {
			self.setAction(processor.action || self._action);
			self.tickTime = processor.tickTime || self.tickTime;
		}
	};
	
	timers.prototype.setAction = function (action) {
		var self = this;
		self._action = action;
	};
	
	timers.prototype.tick = function (deltaTick) {
		var self = this;
		self._counter += deltaTick;
		if (self._counter >= self.tickTime) {
			self._counter = 0;
			self._action();
		}
	};
	
	timers.prototype.tickTime = 0;
	timers.prototype._action = function () {};
	timers.prototype._counter = 0;

	timers.prototype.onStart = function () { };
	timers.prototype.onObjectCreated = function (newObject) { };
	timers.prototype.onLoadReady = function () {};
	
	return timers;
})();