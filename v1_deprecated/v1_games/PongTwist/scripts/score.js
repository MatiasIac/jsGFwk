var score = {
	id: "puntaje",
	visible: true,
	update: function (delta) {
	},
	draw: function (context) {
		context.save();
			context.fillStyle = "white";
			context.font = "100pt zxBold";
			context.fillText(GLOBALS.score, 260, 240);
		context.restore();
	}
};