var share = {
	id: "share",
	zOrder: 10,
	visible: false,
	
	keyPressId: -1,
	
	bind: function () {
		this.keyPressId = jsGFwk.IO.keyboard.registerKeypress(function (code) {
			if (code == 49) {
				jsGFwk.IO.keyboard.unregisterKeypress(jsGFwk._gameObjects.share.keyPressId);
				GLOBALS.WONS = 0;
				jsGFwk._gameObjects.game.restart();
			}
		});
	},
	
	init: function () {	},
	
	update: function (delta) {},
	
	draw: function (context) {
		context.save()
			context.fillStyle = "white";

			context.font = "28pt zxFont";
			context.fillText("Record: " + GLOBALS.RECORD, 80, 150);
			
			context.font = "34pt zxFont";
			context.fillText("Wons: " + GLOBALS.WONS, 80, 120);
			
			context.font = "38pt zxFont";
			context.fillText("GAME OVER", 65, 90);
			
			/*context.font = "20pt zxFont";
			context.fillText("Share your score", 60, 120);
			context.fillText("with your friends", 55, 135);
			context.drawImage(jsGFwk.Sprites.shareButton.spriteBag[0].image, 100, 150);
			context.drawImage(jsGFwk.Sprites.shareButton.spriteBag[1].image, 160, 150);*/
			
			context.font = "24pt zxFont";
			context.fillText("1 - Play again", 60, 50);
		context.restore();
	}
}