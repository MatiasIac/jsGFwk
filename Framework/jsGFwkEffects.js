jsGFwk.Effects = {

	DEGREE_CONVERTION_VALUE: 0.0174532925199432957,

	degreeToRadians: function(degree) {
		return degree * this.DEGREE_CONVERTION_VALUE;
	},
	
	rotate: function (angle, func) {
		if (angle == undefined || angle == null) { return; }
		if (func == undefined) { return; }
		if (!this.rotationPoint) { return; }
	
		var context = jsGFwk._2Dbuffer;
		context.save();
			context.translate(this.x, this.y);
			context.rotate(jsGFwk.Effects.degreeToRadians(angle));
			context.translate(-this.rotationPoint.x, -this.rotationPoint.y);
			func(context);
		context.restore();
	},

	start: function () {
		Object.prototype.rotate = this.rotate;
	}
};