var hud = {
	id: "hud",
	mouseClickId: 0,
	playButton: { x: 503, y: 410, width: 103, height: 44},
	fakeMouse: { x: 0, y: 0, width: 1, height: 1 },
	visible: true,
	init: function () {
		var self = this;
		jsGFwk.ResourceManager.sounds.music.audio.pause();
		jsGFwk.ResourceManager.sounds.music.audio.currentTime = 0;
		jsGFwk.ResourceManager.sounds.music.audio.volume = 0.2;
		jsGFwk.ResourceManager.sounds.music.audio.loop = true;

		jsGFwk.Collisions.onObjectCreated(this.playButton);
		jsGFwk.Collisions.onObjectCreated(this.fakeMouse);
		
		this.mouseClickId = jsGFwk.IO.mouse.registerClick(function (coord) {
			self.fakeMouse.x = coord.x;
			self.fakeMouse.y = coord.y;
		
			if (self.fakeMouse.isRectColliding(self.playButton)) {
				jsGFwk.IO.mouse.unregisterClick(self.mouseClickId);
				resetGame();
				jsGFwk._gameObjects.estela.clearAll();
				jsGFwk._gameObjects.enemies.clearAll();
				jsGFwk._gameObjects.pills.clearAll();
				jsGFwk.ResourceManager.sounds.music.audio.play();
				jsGFwk.Scenes.scenes.game.enable();
			}
		});
	},
	update: function () {},
	draw: function (context) {
		context.save();
			context.drawImage(jsGFwk.ResourceManager.graphics.splash.image, 0, 0);
			
			context.font = "28pt zxBold";
			context.fillStyle = "white";
			context.fillText("Created by: Matias Iacono", 20, 440);
			context.fillText("matias.iacono@gmail.com", 30, 460);
		context.restore();
	}
};