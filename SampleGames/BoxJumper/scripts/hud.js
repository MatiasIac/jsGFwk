var hud = {
	id: "hud",
	visible: true,
	
	init: function () {
	},
	
	update: function (delta) {
		if (jsGFwk.IO.keyboard._activeKey[83]) {
			jsGFwk.Scenes.scenes.juego.enable();
		}
	},
	
	draw: function (context) {
		context.save();
			context.drawImage(jsGFwk.ResourceManager.graphics.splash.image,
				0, 0);
		context.restore();
	}
};