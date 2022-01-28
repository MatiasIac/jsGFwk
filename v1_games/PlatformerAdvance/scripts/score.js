var score = {
	id: "puntaje",
	visible: true,
	update: function (delta) {
	},
	draw: function (context) {
		context.save();
			context.fillStyle = "white";
			context.font = "50pt zxBold";
			context.fillText(GLOBALS.score, 10, 30);
		context.restore();
	}
};