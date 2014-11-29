var puntos = {
	id: "puntos",
	visible: true,
	x: 10, y: 15, mx: 640, my: 230,
	init: function () {
	},
	update: function (delta) {
		if (GLOBALS.altitud < 35780 && !GLOBALS.lost) {
			GLOBALS.altitud += 10;
		} else if (!GLOBALS.lost) {
			GLOBALS.won = true;	
		} else {
			this.mx -= 0.5;
		}
	},
	draw: function (context) {
		context.save();
			context.fillStyle = "white";
			context.font = "20pt zxBold";
			context.fillText("Altitud: " + GLOBALS.altitud + " km", this.x, this.y);
			
			for (i=0; i < GLOBALS.lives; i++) {
				context.drawImage(jsGFwk.Sprites.smallHeart.image, (20 * i) + 570, 5);
			}
			
			if (GLOBALS.won) {
				context.font = "60pt zxBold";
				context.fillText("YOU WON!!!", 150, 200);
				
				context.font = "30pt zxBold";
				context.fillText("ArSat I is in position", 130, 250);
				context.fillText("Vultures Dominated", 160, 280);
				
				context.font = "80pt zxBold";
				context.fillText(GLOBALS.vulturesClicked, 270, 350);
			} else if (GLOBALS.lost) {
				context.drawImage(jsGFwk.Sprites.rocketMenem.image, this.mx, this.my);
				
				context.font = "60pt zxBold";
				context.fillText("YOU LOST!!!", 150, 200);
				
				context.font = "30pt zxBold";
				context.fillText("ArSat I crashed",	200, 250);
			}
		context.restore();
	}
};