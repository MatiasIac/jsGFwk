var counters = {
	id: "counters",
	zOrder: 10,
	visible: true,
	
	init: function () {	},
	
	update: function (delta) { },
	
	draw: function (context) { 
		context.save();
			context.font = "30px normalFont";
			context.fillStyle = "black";
			context.strokeStyle = "white";
			context.strokeText("Distance: " + GLOBALS.METERS + "m", 10, 30);
			context.fillText("Distance: " + GLOBALS.METERS + "m", 10, 30);
		context.restore();
	}
}