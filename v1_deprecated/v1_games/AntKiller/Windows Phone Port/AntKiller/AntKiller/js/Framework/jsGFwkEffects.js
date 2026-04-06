jsGFwk.Effects = {
	_plugInName: "Effects",
	_loaded: false,
	DEGREE_CONVERTION_VALUE: 0.0174532925199432957,

	degreeToRadians: function(degree) {
		return degree * this.DEGREE_CONVERTION_VALUE;
	},
	
	rotateAndDraw: function (params) {
		if (params == undefined || params == null) { return; }
		if (!this.rotationPoint) { 
			this.rotationPoint = { x: 0, y: 0 };
		}
	
		var context = jsGFwk.FastAnimation._2Dbuffer;
		context.save();
			context.translate(this.x, this.y);
			context.rotate(jsGFwk.Effects.degreeToRadians(params.angle));
			context.translate(-this.rotationPoint.x, -this.rotationPoint.y);
			context.drawImage(params.sprite.image, 0, 0);
		context.restore();
	},
	
	rotate: function (params) {
		if (params == undefined || params == null) { return; }
		if (params.then == undefined || params.then == null) { return; }
		
		if (!this.rotationPoint) { 
			this.rotationPoint = { x: 0, y: 0 };
		}
	
		var context = jsGFwk.FastAnimation._2Dbuffer;
		context.save();
			context.translate(this.x, this.y);
			context.rotate(jsGFwk.Effects.degreeToRadians(params.angle));
			context.translate(-this.rotationPoint.x, -this.rotationPoint.y);
		
			params.then.call(this, context);
		context.restore();
	},

	onStart: function () {
	},
	
	onObjectCreated: function (newObject) {
		newObject.rotateAndDraw = this.rotateAndDraw;
		newObject.rotate = this.rotate;
	},
	onLoadReady: function () {
		jsGFwk.include(this._plugInName);
		if (!this._loaded) { this._loaded = true; this.onStart(); }
	}
};