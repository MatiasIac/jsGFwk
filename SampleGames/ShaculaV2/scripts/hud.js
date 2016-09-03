var hud = {
	id: 'hud',
	visible: true,
	mouseId: 0,
	startSpriteToShow: 0,
	fakeMouse: { x: 0, y: 0 },
	startCoord: { x: 280, y: 200, width: 75, height: 48},
	buttonAcc: 0,
	startAndUnregister: function () {
		jsGFwk.IO.mouse.unregisterClick(this.mouseId);
		GLOBAL.cloudContainer.clearAll();
		jsGFwk.Scenes.scenes.intro.enable();
	},
	init: function () {
		var self = this;

		jsGFwk.ResourceManager.sounds.ambient_cave.audio.pause();
		jsGFwk.ResourceManager.sounds.ambient_cave.audio.currentTime = 0;
		jsGFwk.ResourceManager.sounds.ambient_night.audio.pause();
		jsGFwk.ResourceManager.sounds.ambient_night.audio.currentTime = 0;
		jsGFwk.ResourceManager.sounds.ingamemusic.audio.pause();
		jsGFwk.ResourceManager.sounds.ingamemusic.audio.currentTime = 0;

		this.buttonAcc = 0;
		
		jsGFwk.Collisions.onObjectCreated(this.fakeMouse);
		
		this.mouseId = jsGFwk.IO.mouse.registerClick(function (coord) {
			self.startAndUnregister.call(self);
		});
	},
	update: function (delta) {
		this.buttonAcc += delta;

		for (var i = 0; i < jsGFwk.Gamepad.pads.length; i++) {
			//Pad is connected
			if (jsGFwk.Gamepad.pads[jsGFwk.Gamepad.PADTYPE['PAD' + i]] !== undefined) {
				if (jsGFwk.Gamepad.pads[jsGFwk.Gamepad.PADTYPE['PAD' + i]].buttons.length > 0) {
					GLOBAL.selectedPad = i;
				}
			} 
		}

		//check if is connected
		if (jsGFwk.Gamepad.pads[GLOBAL.selectedPad] !== undefined &&
			jsGFwk.Gamepad.pads[GLOBAL.selectedPad].buttons[0].pressed &&
			this.buttonAcc > 1.5) {
			this.startAndUnregister();
		}

        var p = (Math.random() * 50) + 50;

        GLOBAL.cloudContainer.cloneObject({ 
            x: (Math.random() * 600) + 10, 
            y: 480, 
            width: (89 * p) / 100,
            height: (86 * p) / 100, 
            speed: (Math.random() * 1) + 1
        });
    },
	draw: function (context) {
		context.drawImage(jsGFwk.ResourceManager.graphics.main.image, 0, 0);
	}
};