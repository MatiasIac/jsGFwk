var background = {
	id: "background",
	x: 0, y: 0,
	visible: true,
	init: function () {},
	update: function (delta) {},
	draw: function (context) {
		context.drawImage(jsGFwk.ResourceManager.graphics['level' + GLOBAL.currentLevel].image, this.x, this.y);
	}
};