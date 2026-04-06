var enemyController = {
	id: "enemyController",
	enemyTimer: {}, enemyTimerTime: 4,
	bigTimer: {}, bigTimerTime: 60,
	order: 0,
	visible: false,
	
	_getObjectBasedOnCoords: function () {
		var x, y, speed, size;
		
		switch (this.order) {
			case 1:
				x = 320;
				y = -30;
				break;
			case 2:
				x = 670;
				y = 220;
				break;
			case 3:
				x = 320;
				y = 510;
				break;
			case 4:
				x = -30;
				y = 220;
				break;
		}
		
		return { x: x, y: y, 
			enemyType: Math.floor((Math.random() * 2) + 1),
			speed: Math.floor((Math.random() * 50) + 25),
			size: Math.floor((Math.random() * 30) + 10) };
	},
	
	init: function () {
		var self = this;
		
		this.bigTimer = new jsGFwk.Timer({
			action: function () {
				jsGFwk._gameObjects.enemies.cloneObject(
					{ x: 650, y: 240, 
						enemyType: 3,
						speed: 1000,
						size: 50}
				);
			}, tickTime: self.bigTimerTime
		});
		
		this.enemyTimer = new jsGFwk.Timer({
			action: function () {
				self.order++;
				if (self.order > 4) { self.order = 1; }
				jsGFwk._gameObjects.enemies.cloneObject(self._getObjectBasedOnCoords());
			}, tickTime: self.enemyTimerTime
		});
	},
	update: function (delta) {
		this.enemyTimer.tick(delta);
		this.bigTimer.tick(delta);
	}
};