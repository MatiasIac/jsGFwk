var monitor = {
	id: "monitor",
	visible: true,
	init: function () {},
	update: function () {},
	draw: function (context) {
		context.save();
			context.drawImage(jsGFwk.Sprites.monitorBackground.image, 0, 0);
		context.restore();
	}
};