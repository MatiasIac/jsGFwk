var pillController = {
	id: "pillController",
	pillTimer: {}, pillTimerTime: 5,
	visible: false,
	
	init: function () {
		var self = this;
		this.pillTimer = new jsGFwk.Timer({
			action: function () {
				jsGFwk._gameObjects.pills.cloneObject({
					x: Math.floor((Math.random() * 600) + 20),
					y: Math.floor((Math.random() * 440) + 20),
					pillType: (Math.floor(Math.random() * 3) + 1)
				});
			}, tickTime: self.pillTimerTime
		});
	},
	update: function (delta) {
		this.pillTimer.tick(delta);
	}
};