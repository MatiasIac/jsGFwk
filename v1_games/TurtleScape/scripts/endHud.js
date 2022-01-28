var endHud = {
	id: "endHud",
	zOrder: 1,
	visible: true,
	counterDelta: 0,
	
	init: function () {
		this.counterDelta = 0;
		if (GLOBALS.METERS > GLOBALS.RECORD) {
			GLOBALS.RECORD = GLOBALS.METERS;
		}
	},
	update: function (delta) { 
		this.counterDelta += delta;
		if (this.counterDelta > 5) {
			jsGFwk.Scenes.scenes.intro.enable();
		}
	},
	draw: function (context) { 
		context.save();
			context.drawImage(jsGFwk.ResourceManager.graphics.gameOverScreen.image, 0, 0);
			context.strokeStyle = "red";
			context.font = "41pt normalFont";
			context.strokeText("Score: " + GLOBALS.METERS, 18, 300);
			context.strokeText("Record: " + GLOBALS.RECORD, 18, 370);
			
			context.fillStyle = "white";
			context.font = "40pt normalFont";
			context.fillText("Score: " + GLOBALS.METERS, 20, 300);
			context.fillText("Record: " + GLOBALS.RECORD, 20, 370);
		context.restore();
	}
}