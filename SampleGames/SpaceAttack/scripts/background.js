var Background = {
	id: "background", x: 0, y: 0, visible: true,

	lineWidth: 15, speed: 3, h_lineHeightFactor: 10,
	horizontalLines: [],
	
	_drawVerticalLine: function (context, lineNumber) {
		context.beginPath();

		var beginPoint = camera.displayCenter + (lineNumber + 20),
			barWidth = beginPoint + this.lineWidth,
			baseOffset = (lineNumber * 250) + camera.displayCenter;

		context.moveTo(beginPoint, camera.topLine);
		context.lineTo(barWidth, camera.topLine);
		context.lineTo((baseOffset + barWidth) + 35, 480);
		context.lineTo((baseOffset + beginPoint) - 35, 480);

		context.closePath();
		context.fill();
	},

	_drawHorizontalLines: function (context, line) {
		context.beginPath();
		context.fillRect(0, line.position, 640, line.lineHeight);
	},

	init: function () {
		for (var i = 0; i < 7; i++) {
			this.horizontalLines.push({
				position: camera.topLine + (40 * i),
				lineHeight: 20 + (i * 2)
			});
		}
	},

	update: function (delta) {
		this.h_lineHeightFactor = camera.topLine;

		for (var i = 0; i < this.horizontalLines.length; i++) {
			this.horizontalLines[i].position += this.speed;
			this.horizontalLines[i].lineHeight = 15 + (i * 3);
		}

		if (this.horizontalLines[this.horizontalLines.length - 1].position > 480) {
			var lastLine = this.horizontalLines.pop();
			lastLine.position = camera.topLine;
			lastLine.lineHeight = 20;
			this.horizontalLines.unshift(lastLine);
		}
	},

	draw: function (context) {
		context.fillStyle = '#0284F5';
		context.fillRect(0, 0, 640, camera.topLine);

		context.fillStyle = '#7DD1C6';
		context.fillRect(0, camera.topLine, 640, 480 - camera.topLine);

		context.fillStyle = '#7DBCD1';
		for (var i = -40; i < 40; i++) {
			this._drawVerticalLine(context, i);
		}

		context.fillStyle = '#84BED1';
		for (var i = 0; i < this.horizontalLines.length; i++) {
			this._drawHorizontalLines(context, this.horizontalLines[i]);
		}
	}
};