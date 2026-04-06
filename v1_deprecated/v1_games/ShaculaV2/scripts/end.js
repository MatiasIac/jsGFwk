var End = {
	id: "end",
	x: 310, y: 100,
	visible: true,
    timerAcc: 0,
    startGame: function () {
        jsGFwk.IO.mouse.unregisterClick(this.mouseId);
        jsGFwk.Scenes.scenes.main.enable();
    },
	init: function () {
        var self = this;

        this.mouseId = jsGFwk.IO.mouse.registerClick(function (coord) {
            self.startGame.call(self);
		});
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
        context.fillText("Di is safe.", this.x, this.y);
        context.fillText("Di can sleep today.", this.x, this.y + 20);
        context.fillText("But it is still thirsty...", this.x, this.y + 40);
	}
};