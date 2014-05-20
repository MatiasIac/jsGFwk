var enemigo = {
	id: "enemigo",
	visible: true,
	x: 650,
	y: 200,
	width: 50,
	height: 50,
	destruido: function() {
		this.x = 650;
	},
	update: function (delta) {
		this.x -= 1.5;
		
		if (this.x + this.width < 0) {
			this.x = 650;
		}
	},
	draw: function (context) {
		context.save();
			context.fillStyle = "blue";
			context.fillRect(this.x, this.y, this.width, this.height);
		context.restore();
	}
};