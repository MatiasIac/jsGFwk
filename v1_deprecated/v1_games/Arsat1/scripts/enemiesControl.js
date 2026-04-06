var enemiesControl = {
	id: 'control',
	visible: false,
	deltaCount: 0,
	flappyCount: 0,
	speedOfClonation: 3.5,
	init: function () {
		jsGFwk.Sprites.flappingVulture.reset();
		jsGFwk.Sprites.flappingVultureInverted.reset();
	},
	update: function (delta) {
		this.deltaCount += delta;
		
		if (GLOBALS.altitud < 35000 && !GLOBALS.lost) {			
			if (this.deltaCount > this.speedOfClonation) {
				var dir = parseInt(Math.random() * 10);
				var nextX = dir <= 5 ? 0 : 600;
				var nextY = parseInt((Math.random() * 100) + 50);
				dir = dir <= 5 ? 1 : 0;
				
				jsGFwk._gameObjects.vultures.cloneObject({x: nextX, y: nextY, direction: dir});
				this.deltaCount = 0;
			}
			
			if (this.speedOfClonation > 0.4) {
				this.speedOfClonation -= 0.005;
			}			
		}
		
		this.flappyCount += delta;
		if (this.flappyCount > 0.5) {
			jsGFwk.Sprites.flappingVulture.next();
			jsGFwk.Sprites.flappingVultureInverted.next();
			this.flappyCount = 0;
		}
	}
};