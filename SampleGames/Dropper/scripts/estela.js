var estela = {
	x: 0, y: 0,
	radMin: 0.4,
	r: 110, g: 0, b: 110, a: 1,
	onInit: function (parameters) {
		this.x = parameters.x;
		this.y = parameters.y;
		this.rad = 3;
		this.maxAcc = 0.5;
		/*this.r = parseInt(Math.random() * 255);
		this.g = parseInt(Math.random() * 255);
		this.b = parseInt(Math.random() * 255);
		this.a = (Math.random() * 1) + 0.1;
		this.rad = (Math.random() * 5) + 1;*/
		
		var self = this;
		this.radTimer = new jsGFwk.Timer({
			action: function () {
				self.rad -= self.radMin;
				//console.log(self.rad);
			}, tickTime: self.maxAcc
		});
	},
	onUpdate: function (delta) {
		this.radTimer.tick(delta);
		
		if (this.rad <= 0) {
			this.destroy();
		}
	},
	onDraw: function (context) {
		context.save();
			context.fillStyle = "rgba(" + this.r + "," + this.g + "," + this.b + "," + this.a +")" ; //#C146DA";
			context.beginPath();
			context.arc(this.x, this.y, this.rad, 0, Math.PI * 2);
			context.closePath();
			context.fill();
		context.restore();
	}
};