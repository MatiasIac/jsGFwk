var background = {
	id: "background",
	visible: true,
	
	x: 0,
	x2: 0,
	
	update: function (delta) {
		this.x -= 2;
		
		if (this.x <= -640) {
			this.x = 0;
		}
		
		this.x2 -= 1.5;
		
		if (this.x2 <= -640) {
			this.x2 = 0;
		}
	},
	draw: function (context) {
		context.save();
			context.drawImage(jsGFwk.ResourceManager.graphics.estrellas.image,
				this.x2, 0, 640, 480);
			context.drawImage(jsGFwk.ResourceManager.graphics.estrellas.image,
				this.x2 + 640, 0, 640, 480);
				
			context.drawImage(jsGFwk.ResourceManager.graphics.estrellas2.image,
				this.x, 0, 640, 480);
			context.drawImage(jsGFwk.ResourceManager.graphics.estrellas2.image,
				this.x + 640, 0, 640, 480);
		context.restore();
	}
};