var starBackground = {
	x: 0, y: 0,	layer: 0, speed: 1,	lineWidth: 1,
	layerColor: "white",
	onInit: function (parameters) {
		switch (parameters.layer) {
			case 1:
				this.speed = 2;
				this.layerColor = "#ABABAB";
				this.lineWidth = 2;
				break;
			case 2:
				this.speed = 4;
				this.layerColor = "white";
				this.lineWidth = Math.floor((Math.random() * 6) + 2);
				break;
		}
		
		this.x = 641 + (Math.random() * 3);
		this.y = (Math.random() * 480);
	},
	onUpdate: function (delta) {
		this.x -= this.speed;
		
		/*var collide = jsGFwk.Collisions._disColliding.call(
			{x: this.x, y: this.y, radius: 1, center: { x: 1, y: 1}},
			{x: satX, y: satY, radius: satRad, center: { x: satRad, y: satRad}});*/
				
		if (/*collide || */(this.x + this.lineWidth) < 0) {
			this.destroy();
		}
	},
	onDraw: function (context) {
		context.save();
			context.strokeStyle = this.layerColor;
			context.lineWidth = 2;
			context.beginPath();
				context.moveTo(this.x, this.y);
				context.lineTo(this.x + this.lineWidth, this.y);
			context.stroke();
		context.restore();
	}
};