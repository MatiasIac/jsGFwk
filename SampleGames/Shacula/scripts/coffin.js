var coffin = {
	id: "goal",
	x: 0, y: 0,
	visible: true,
	init: function () {},
	update: function (delta) {},
	draw: function (context) {
        context.drawImage(jsGFwk.Sprites.goal.image, this.x, this.y - 6);
	}
};