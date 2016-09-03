var Intro = {
	id: "intro",
	x: 310, y: 100,
	visible: true,
    timerAcc: 0,
    startGame: function () {
        jsGFwk.IO.mouse.unregisterClick(this.mouseId);
        jsGFwk.Scenes.scenes.game.enable();
        jsGFwk.ResourceManager.sounds.ingamemusic.audio.play();
    },
	init: function () {
        var self = this;

        this.timerAcc = 0;

        this.mouseId = jsGFwk.IO.mouse.registerClick(function (coord) {
            self.startGame.call(self);
		});

        GLOBAL.spikeContainer.clearAll();
        GLOBAL.bloodContainer.clearAll();
        GLOBAL.batContainer.clearAll();
        GLOBAL.exitContainer.clearAll();
        GLOBAL.fallingWallContainer.clearAll();
        GLOBAL.leverContainer.clearAll();
        GLOBAL.movableWallContainer.clearAll();
        GLOBAL.sawContainer.clearAll();

        GLOBAL.currentLevel = 10;
        GLOBAL.maxOil = 500;
        GLOBAL.lightOil = 100;
        GLOBAL.minRadiusLight = 50;
        GLOBAL.maxRadiusLight = 50;
        GLOBAL.resetMaxMinLight = 50;
        GLOBAL.consumeLight = 0.005;
        GLOBAL.lightConsum = 3;
        GLOBAL.lightIncrement = 1;
        GLOBAL.item = 0;
        GLOBAL.lives = 2;

        SkeletonDoor.isOpen = false;
        BatteryContainer.isCharged = false;
        StakeDoor.isOpen = false;

        Levels = JSON.parse(JSON.stringify(LevelsTemp));
    },
	update: function (delta) {
        this.timerAcc += delta;

        if (jsGFwk.Gamepad.pads[GLOBAL.selectedPad] !== undefined &&
			jsGFwk.Gamepad.pads[GLOBAL.selectedPad].buttons[0].pressed &&
			this.timerAcc > 1.5) {
			this.startGame();
		}

        if (this.timerAcc > 5) {
            this.startGame();
        }
    },
	draw: function (context) {
        context.drawImage(jsGFwk.ResourceManager.graphics['intro'].image, 0, 0);
	}
};