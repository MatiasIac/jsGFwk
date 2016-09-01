var Intro = {
	id: "intro",
	x: 310, y: 100,
	visible: true,
    timerAcc: 0,
    startGame: function () {
        jsGFwk.IO.mouse.unregisterClick(this.mouseId);
        jsGFwk.Scenes.scenes.game.enable();
    },
	init: function () {
        var self = this;

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

        if (this.timerAcc > 5) {
            this.startGame();
        }
    },
	draw: function (context) {
        context.fillStyle = "black";
        context.fillRect(0, 0, 630, 480);

		context.fillStyle = "red";
        context.font = "20pt zxBold";
        context.textAlign = 'center';
        context.fillText("Was a satisfying night.", this.x, this.y);
        context.fillText("A party night. A bloody night.", this.x, this.y + 20);
        context.fillText("The night Di lost the castle key.", this.x, this.y + 40);

        context.font = "30pt zxBold";
        context.fillText("...the sun is close,", this.x, this.y + 80);
        context.fillText("the coffin is life...", this.x, this.y + 100);
	}
};