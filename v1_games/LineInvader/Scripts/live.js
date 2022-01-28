function Live() {
	var self = this;
	
	this.visible = true;
	this.x = 0;
	this.y = 0;
	this.width = 7;
	this.height = 7;
	
	var foot = 0;
	
	this.update = function (delta) {
		foot++;
		foot = foot > 1 ? 0 : foot;
	};
	
	this.draw = function (context) {
		context.save();
			context.lineWidth = 1;
			context.strokeStyle = "#AAAA00";
			context.strokeRect(self.x, self.y, 6, 4);
			
			context.strokeRect(self.x + 7, self.y -1, 2, 2);
			
			context.strokeRect(self.x, self.y + 5, 1, 2 - foot);
			context.strokeRect(self.x + 6, self.y + 5, 1, 1 + foot);
		context.restore();
	};
}