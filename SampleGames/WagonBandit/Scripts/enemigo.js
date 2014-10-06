var enemigo = {
	id: "enemigo",
	visible: true,
	
	x: 0,
	y: 0,
	width: 50,
	height: 50,
	
	init: function () { },
	update: function (delta) {
		this.y++;
		if (this.y > 480) {
			this.y = -50;
		}
	},
	draw: function (context) {
		context.save();
			context.fillStyle = "red";
			context.fillRect(this.x, this.y, 50, 50);
		context.restore();
	}
};