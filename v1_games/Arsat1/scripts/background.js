var background = {
	id: "background",
	visible: true,
	init: function () {	},
	update: function (delta) {
	},
	draw: function (context) {
		context.save();
			var gradient = context.createLinearGradient(GLOBALS.width / 2, 
				(GLOBALS.maxAltitud * -1) + GLOBALS.altitud,
				GLOBALS.width / 2, GLOBALS.altitud);
			gradient.addColorStop(0, "black");
			gradient.addColorStop(0.2, "#253647");
			gradient.addColorStop(0.5, "blue");
			gradient.addColorStop(0.7, "#9DC9F5");
			gradient.addColorStop(1, "cyan");
			context.fillStyle = gradient;
			context.fillRect(0, 0, GLOBALS.width, GLOBALS.height);
			
			context.drawImage(jsGFwk.ResourceManager.graphics.starfield.image,
				0, (GLOBALS.maxAltitud * -1) + GLOBALS.altitud);
			context.drawImage(jsGFwk.ResourceManager.graphics.starfield.image,
				300, (GLOBALS.maxAltitud * -1) + GLOBALS.altitud);
		context.restore();
	}
};