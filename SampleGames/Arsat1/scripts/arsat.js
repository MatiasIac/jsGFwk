var arsat = {
	id: "arsat",
	visible: true,
	x: 10, y: 10, width: 80, height: 80,
	angle: 0,
	rotationPoint: { x: 50, y: 50 },
	sinC: 0,
	cosC: 0,
	accMovement: 0,
	deadSpeed: 0,
	moveUpDown: true,
	init: function () { 
		this.x = 300;
	},
	update: function (delta) {
		if (!GLOBALS.lost) {
			this.angle += 0.5;
			this.accMovement += delta;
			this.y = (Math.sin(this.sinC) * 100) + 250;
			this.x = (Math.cos(this.cosC) * 100) + 280;
			
			if (this.moveUpDown) {
				this.sinC += 0.01;
			} else {
				this.cosC += 0.01;
			}
			
			if (this.accMovement > 3) {
				this.moveUpDown = (Math.random() * 100) > 50;
				this.accMovement = 0;
			}
		} else {
			if (this.y < 800) {
				this.y += this.deadSpeed;
				this.deadSpeed += 0.2;
			}
		}
	},
	draw: function (context) {
		context.save();
			this.rotate({ angle: this.angle, then: function (c) {
				context.drawImage(jsGFwk.Sprites.arsat.image,
					0, 0, 80, 80);
				}
			});
			
		context.restore();
	}
};