jsGFwk.Effects = {

	DEGREE_CONVERTION_VALUE: 0.0174532925199432957,

	degreeToRadians: function(degree) {
		return degree * this.DEGREE_CONVERTION_VALUE;
	},
	
	rotateAndDraw: function (params) {
		if (params == undefined || params == null) { return; }
		if (!this.rotationPoint) { 
			this.rotationPoint = { x: 0, y: 0 };
		}
	
		var context = jsGFwk._2Dbuffer;
		context.save();
			context.translate(this.x, this.y);
			context.rotate(jsGFwk.Effects.degreeToRadians(params.angle));
			context.translate(-this.rotationPoint.x, -this.rotationPoint.y);
			context.drawImage(params.sprite.image, 0, 0);
		context.restore();
	},

	onStart: function () {
	},
	
	onObjectCreated: function (newObject) {
		newObject.rotateAndDraw = this.rotateAndDraw;
	}
};