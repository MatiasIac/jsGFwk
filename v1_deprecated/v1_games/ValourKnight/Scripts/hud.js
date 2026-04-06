var hud = {
	id: "hud",
	zOrder: 1,
	visible: true,
	
	deltaCounter: 0,
	deltaRainbown: 0,
	colorRainbow: ["#0000FF", "#CD0000", "#FF0000", "#0000FF", "#CD00CD", "#FF00FF", 
				   "#00CD00", "#00FF00", "#00CDCD", "#00FFFF", "#CDCD00", "#FFFF00", "#CDCDCD", "#FFFFFF"],
	colorStartingPoint: 0,
	selectedOption: 0,
	keyPressId: -1,
	
	init: function () {	},
	
	start: function () {
		jsGFwk._gameObjects.progress.destroy();
		jsGFwk.Sprites.walkingRight.next();
		jsGFwk.Sprites.walkingLeft.next();
		this.keyPressId = jsGFwk.IO.keyboard.registerKeypress(function (code) {
			switch(code) {
				case 49:
					GLOBALS.SELECTED_GAME = 0;
					jsGFwk._gameObjects.hud.selectedOption = 0;
					jsGFwk.ResourceManager.sounds.selection.audio.play();
					break;
				/*case 50:
					GLOBALS.SELECTED_GAME = 1;
					jsGFwk._gameObjects.hud.selectedOption = 1;
					break;*/
				case 51:
					//start game
					jsGFwk.ResourceManager.sounds.selection.audio.play();
					jsGFwk.IO.keyboard.unregisterKeypress(jsGFwk._gameObjects.hud.keyPressId);
					jsGFwk.Scenes.scenes["game"].enable();
					jsGFwk._gameObjects.game.startGame();
					break;
			}			
		});
	},
	
	update: function (delta) {	
		this.deltaCounter += delta;
		this.deltaRainbown += delta;
		
		if (this.deltaRainbown > 0.1) {
			jsGFwk.Sprites.walkingRight.next();
			jsGFwk.Sprites.walkingLeft.next();
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
			
			context.font = "20pt zxFontNormal";
			
			context.fillStyle = "#FF00FF";
			context.fillRect(65, 135 + (this.selectedOption * 20), 210, 20);

			context.fillStyle = "white";			
			context.fillText("1. HUMAN Vs. CPU", 70, 150);
			//context.fillText("2. HUMAN Vs. HUMAN", 70, 170);
			context.fillText("3. START GAME", 70, 190);
			
			context.drawImage(jsGFwk.Sprites.walkingRight.sprite.image, 20, 130 + (this.selectedOption * 20));
			context.drawImage(jsGFwk.Sprites.walkingLeft.sprite.image, 290, 130 + (this.selectedOption * 20));
		context.restore();
	}
}