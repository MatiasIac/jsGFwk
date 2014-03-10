var hud = {
	id: "hud",
	zOrder: 1,
	visible: true,
	
	deltaCounter: 0,
	deltaRainbown: 0,
	blink: false,
	colorRainbow: ["#0000FF", "#CD0000", "#FF0000", "#0000FF", "#CD00CD", "#FF00FF", 
				   "#00CD00", "#00FF00", "#00CDCD", "#00FFFF", "#CDCD00", "#FFFF00", "#CDCDCD", "#FFFFFF"],
	colorStartingPoint: 0,
	
	init: function () {	
		jsGFwk.IO.mouse.registerClick(function (coord) {
			// Change scene 2
		});	
	},
	update: function (delta) {	
		this.deltaCounter += delta;
		this.deltaRainbown += delta;
		
		if (this.deltaCounter > 0.5) {
			this.deltaCounter = 0;
			this.blink = !this.blink;
		}
		
		if (this.deltaRainbown > 0.1) {
			this.deltaRainbown = 0;
			this.colorStartingPoint++;
			if (this.colorStartingPoint >= this.colorRainbow.length) { this.colorStartingPoint = 0; }
		}
	},
	draw: function (context) { 
		context.save();
			context.font = "40pt zxFont";
			
			var rCounter = this.colorStartingPoint;
			
			for (var i = 0; i < "Valour Knight!".length; i++) {
				context.fillStyle = this.colorRainbow[rCounter];
				context.fillText("Valour Knight!"[i], (i * 20) + 15, 50);
				
				rCounter++;
				if (rCounter >= this.colorRainbow.length) { rCounter = 0; }
			}
			
			if (!this.blink) {
				context.fillStyle = "white";
				context.font = "20pt zxFont";
				context.fillText("Tap to play", 90, 150);
			}
		context.restore();

		/*context.save();
			*/
			context.drawImage(jsGFwk.ResourceManager.graphics.main.image,
				0, 0, 25, 29,
				50, 130, 25, 29);
		/*context.restore();*/
	}
}