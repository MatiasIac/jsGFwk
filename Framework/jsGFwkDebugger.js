jsGFwk.Debugger = {

	_settings: {
		textFillStyle: "rgb(0,255,0)",
		textSize: "8pt arial",
		lineStrokeStyle: "rgb(255,0,0)",
		lineStrokeWidth: 1,
	},
	
	_drawCoords: function(context, target) {
		if (isNaN(target.x) || isNaN(target.y)) { return; }
		
		context.fillText("x: " + target.x + " - y: " + target.y, target.x, target.y - 10);
	},
	
	_drawCollRads: function(context, target) {
		if (isNaN(target.x) || isNaN(target.y)) { return; }
		if (isNaN(target.radius)) { return; }
		if (target.center == undefined) { return; }
		
		context.beginPath();
		context.arc(target.x + target.center.x, target.y + target.center.y, target.radius, 0, (Math.PI * 2), true);
		context.closePath();
		context.stroke();
	},
	
	_drawBoundBox: function(context, target) {
		if (isNaN(target.x) || isNaN(target.y)) { return; }
		if (isNaN(target.width) || isNaN(target.height)) { return; }
		
		context.strokeRect(target.x, target.y, target.width, target.height);
	},
	
	on: false,

	onStart: function () {
	},
	
	onObjectCreated: function (newObject) {
		var oldDraw = newObject.draw;
		newObject._draw = oldDraw;
		newObject.draw = function (context) {
			this._draw(context);
			
			if (jsGFwk.Debugger.on) {
				context.save();
					context.lineWidth = jsGFwk.Debugger._settings.lineStrokeWidth;
					context.strokeStyle = jsGFwk.Debugger._settings.lineStrokeStyle;
					context.fillStyle = jsGFwk.Debugger._settings.textFillStyle;
					context.font = jsGFwk.Debugger._settings.textSize;
				
					jsGFwk.Debugger._drawCoords(context, this);
					jsGFwk.Debugger._drawBoundBox(context, this);
					jsGFwk.Debugger._drawCollRads(context, this);
				context.restore();
			}
		};
	}
};