var controller = {
	id: "controller",
	x: 0, y: 100,
	width: 138, height: 138,
	visible: true,
	km: 0,
	time: 60,
	timeAcc: 0,
	cosTraveled: 0,
	traveledSize: 0,
	maxKm: 9396,
	clicksCount: 0,
	maxClicks: 20,
	gameStatus: "none",
	init: function () {
		jsGFwk.IO.mouse.registerClick(function (coord) {
			if (jsGFwk._gameObjects.controller.gameStatus === "none") {
				var pointer = {x: coord.x, y: coord.y, width: 1, height: 1};
				if (jsGFwk._gameObjects.controller.isRectColliding(pointer)) {
					jsGFwk._gameObjects.controller.km += 10;
					jsGFwk._gameObjects.controller.clicksCount++;
					if (jsGFwk._gameObjects.controller.clicksCount >= jsGFwk._gameObjects.controller.maxClicks) {
						jsGFwk._gameObjects.controller.clicksCount = 0;
						jsGFwk._gameObjects.controller.time++;
					}
					if (jsGFwk._gameObjects.controller.km >= jsGFwk._gameObjects.controller.maxKm) {
						jsGFwk._gameObjects.controller.gameStatus = "won";
					}
				}
			}
		});
	},
	update: function (delta) {
		if (jsGFwk._gameObjects.controller.gameStatus === "none") {
			this.timeAcc += delta;
			if (this.timeAcc >= 1) {
				this.timeAcc = 0;
				this.time--;
			}
		
			this.traveledSize = (Math.cos(this.cosTraveled) * 10) + 50;
			this.cosTraveled += 0.05;
			
			this.x = (this.km * 500) / this.maxKm;
		
			if (this.time <= 0 && this.km < this.maxKm) {
				jsGFwk._gameObjects.controller.gameStatus = "lost";
			}
		}
	},
	draw: function (context) {
		context.save();
			context.fillStyle = "white";
			context.font = this.traveledSize + "pt zxBold";
			context.fillText(this.km + "km Traveled", 20, 30);
			
			context.fillStyle = "white";
			context.font = "14pt zxBold";
			context.fillText("Time remaining: " + this.time, 530, 20);
			
			context.beginPath();
			context.lineWidth = 10;
			context.lineCap = "round";
			context.strokeStyle = "gray";
			context.moveTo(this.x + 150, 169);
			context.lineTo(535, 169);
			context.stroke();
			
			context.drawImage(jsGFwk.ResourceManager.graphics.eriel.image, this.x, this.y);
			context.drawImage(jsGFwk.ResourceManager.graphics.kiwi.image, 550, this.y);
			
			if (this.gameStatus === "won") {
				context.fillStyle = "white";
				context.font = "30pt zxBold";
				context.fillText("Ayudaste a Eiriel a llegar a Kiwilandia :)", 20, 150);
			} else if (this.gameStatus === "lost") {
				context.fillStyle = "red";
				context.font = "34pt zxBold";
				context.fillText("Eiriel no pudo llegar a Kiwilandia :(", 20, 150);				
			}
		context.restore();
	}
};