var dayCounter = {
	id: "dayCounter",
	x: 300, y: 480,
	angle: 270,
	rotationPoint: { x: 50, y: 50 },
	delayRotation: 1, delayAcc: 0, defaultDelayRotation: 1,
	visible: true,
	init: function () {
		this.delayRotation = this.defaultDelayRotation;
		this.angle = 270;
	},
	update: function (delta) {
		this.delayAcc+=delta;
		
		if (this.delayAcc >= this.delayRotation) {
			this.angle--;
			this.delayAcc = 0;
		}
		
		if (this.angle <= 0) {
			//Lost
		}
		//this.angle++;
	},
	draw: function (context) {
        this.rotate({ angle: this.angle, then: function (c) {
            context.drawImage(jsGFwk.ResourceManager.graphics.dayNight.image,
                0, 0, 100, 100);
            }
        });
	}
};