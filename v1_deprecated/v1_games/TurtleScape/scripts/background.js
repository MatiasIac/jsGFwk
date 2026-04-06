var background = {
	id: "background",
	zOrder: 1,
	visible: true,
	
	xCloud: 0,
	xFloor: 0,
	
	init: function () {	
		
	},
	
	moveScreen: function (value) {
		this.xCloud -= value / 1.5;
		if (this.xCloud <= -690) { this.xCloud = 0; }
		
		this.xFloor -= value / 2.5;
		if (this.xFloor <= -690) { this.xFloor = 0; }
	},
	
	update: function (delta) { },
	
	draw: function (context) { 
		context.save();
			context.drawImage(jsGFwk.Sprites.clouds.image, this.xCloud, 0);
			context.drawImage(jsGFwk.Sprites.clouds.image, this.xCloud + 690, 0);
			
			context.drawImage(jsGFwk.Sprites.floor.image, this.xCloud, 280);
			context.drawImage(jsGFwk.Sprites.floor.image, this.xCloud + 690, 280);
		context.restore();
	}
}