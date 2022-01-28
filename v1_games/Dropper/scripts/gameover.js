var gameOver = {
	id: "gameOver",
	blink: true, blinkingTimer: {}, mouseClickId: 0,
	playButton: { x: 115, y: 311, width: 413, height: 44},
	fakeMouse: { x: 0, y: 0, width: 1, height: 1 },
	visible: true,
	init: function () {
		var self = this;
		this.blinkingTimer = new jsGFwk.Timer({
			action: function () {
				self.blink = !self.blink;
			}, tickTime: 0.1
		});
		
		jsGFwk.Collisions.onObjectCreated(this.playButton);
		jsGFwk.Collisions.onObjectCreated(this.fakeMouse);
		
		this.mouseClickId = jsGFwk.IO.mouse.registerClick(function (coord) {
			self.fakeMouse.x = coord.x;
			self.fakeMouse.y = coord.y;
			
			if (self.fakeMouse.isRectColliding(self.playButton)) {
				jsGFwk.IO.mouse.unregisterClick(self.mouseClickId);
				jsGFwk.Scenes.scenes.hud.enable();
			}
		});
	},
	update: function (delta) {
		jsGFwk.settings.clearColor = "rgb(50, 50, 50)";
		this.blinkingTimer.tick(delta);
	},
	draw: function (context) {
		context.save();
			var minutes = parseInt(playedTime / 60);
			minutes = ((minutes + "").length === 1 ? "0" + minutes : minutes);
			var seconds = parseInt(playedTime % 60);
			seconds = ((seconds + "").length === 1 ? "0" + seconds : seconds);
			
			context.fillStyle = "white";
			context.textAlign = "center";
			
			context.font = "30pt zxBold";
			context.fillText("You resisted", 320, 200);
			
			context.fillText("Final Score: " + points, 320, 150);
			
			if (this.blink) {
				context.fillText("Click or tap here", 320, 330);
				context.fillText("for another round", 320, 348);
			}
			
			context.font = "60pt zxBold";
			context.fillText(minutes + ":" + seconds, 320, 240);
		context.restore();
	}
};