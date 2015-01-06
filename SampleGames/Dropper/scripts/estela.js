var estela = {
	x: 0, y: 0,
	radMin: 0.4,
	r: 110, g: 0, b: 110, a: 1,
	onInit: function (parameters) {
		this.x = parameters.x;
		this.y = parameters.y;
		this.radius = parameters.radius;
		this.maxAcc = 0.5;
		
		this.r = parseInt(Math.random() * 255);
		this.g = parseInt(Math.random() * 255);
		this.b = parseInt(Math.random() * 255);
		this.a = (Math.random() * 1) + 0.1;
		
		var self = this;
		this.radTimer = new jsGFwk.Timer({
			action: function () {
				self.radius -= self.radMin;
			}, tickTime: self.maxAcc
		});
	},
	onUpdate: function (delta) {
		this.radTimer.tick(delta);
		
		if (this.radius <= 0) {
			this.destroy();
		} else {
			var self = this;
			jsGFwk._gameObjects.enemies.eachCloned(function (enemy, event) {
				var collide = jsGFwk.Collisions._disColliding.call(
					{x: self.x, y: self.y, radius: self.radius, center: { x: self.radius / 2, y: self.radius / 2}},
					{x: enemy.x, y: enemy.y, radius: enemy.size, center: { x: enemy.size / 2, y: enemy.size / 2}});
			
				if (collide) {
					enemy.hit(self.radius);
					event.cancel = true;
					self.destroy();
				}
			});
		}
	},
	onDraw: function (context) {
		context.save();
			context.fillStyle = "rgba(" + this.r + "," + this.g + "," + this.b + "," + this.a +")" ; //#C146DA";
			context.beginPath();
			context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
			context.closePath();
			context.fill();
		context.restore();
	}
};