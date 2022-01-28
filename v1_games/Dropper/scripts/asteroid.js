var asteroid = {
	id: "asteroid",
	visible: true,
	init: function () {},
	update: function (delta) {

	},
	draw: function (context) {
		context.save();
			context.fillStyle = "#BBBBBB";
			context.beginPath();
			context.arc(asterX, asterY, asterRad, 0, Math.PI * 2);
			context.closePath();
			context.fill();
		context.restore();
	}	
};