var hud = {
	id: 'hud',
	visible: true,
	mouseId: 0,
	startSpriteToShow: 0,
	fakeMouse: { x: 0, y: 0 },
	startCoord: { x: 280, y: 200, width: 75, height: 48},

	startAndUnregister: function () {
		jsGFwk.IO.mouse.unregisterClick(this.mouseId);
		GLOBAL.cloudContainer.clearAll();
		jsGFwk.Scenes.scenes.intro.enable();
	},

	init: function () {
		var self = this;
		jsGFwk.Collisions.onObjectCreated(this.fakeMouse);
		this.mouseId = jsGFwk.IO.mouse.registerClick(function (coord) {
			self.startAndUnregister.call(self);
		});
	},
	update: function (delta) {
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
			jsGFwk.Gamepad.pads[GLOBAL.selectedPad].buttons[0].pressed) {
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
		/*context.drawImage(jsGFwk.Sprites.startButton.spriteBag[this.startSpriteToShow].image, 
			this.startCoord.x, this.startCoord.y);*/
	}
};