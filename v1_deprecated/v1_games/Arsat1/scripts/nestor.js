var nestor = {
	id: "nestor",
	visible: true,
	x: 10, y: 10,
	angle: 0,
	rotationPoint: { x: 250, y: 250 },
	segment: 1,
	segmentAcc: -0.001,
	animAcc: 0,
	init: function () { 
		this.x = 300;
		this.y = 300;
		jsGFwk.Sprites.nestor.reset();
		this.path.setPath(
			{x: -100, y: 100},
			{x: 660, y: 100},
			{x: 320, y: 20},
			{x: 320, y: 400}
		);
	},
	update: function (delta) {
		this.angle += 0.5;
		this.animAcc += delta;
		if (this.animAcc > 0.2) {
			jsGFwk.Sprites.nestor.next();
			this.animAcc = 0;
		}
		
		this.segment += this.segmentAcc;
		var point = this.path.getPointAt(this.segment);
		this.x = point.x;
		this.y = point.y;
		
		if (this.segment >= 1 || this.segment <= 0) {
			this.segmentAcc *= -1;
		}
	},
	draw: function (context) {
		if (GLOBALS.altitud >= 35780) {
			context.save();
				this.rotate({ angle: this.angle, then: function (c) {
					context.drawImage(jsGFwk.Sprites.nestor.sprite.image, this.x, this.y);
				}});
			context.restore();
		}
	}
};