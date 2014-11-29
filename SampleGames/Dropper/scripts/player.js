var player = {
	id: "player",
	visible: true,
	
	estelaTime: 0.1, estelaTimer: null,
	
	xWide: 220, yWide: 220,
	elapsedApproachMax: 0.5,
	
	init: function () {
		var self = this;
		this.estelaTimer = new jsGFwk.Timer({
			action: function () {
				jsGFwk._gameObjects.estela.cloneObject({ x: satX, y: satY });
			}, tickTime: self.estelaTime
		});
		
		this.gravityTimer = new jsGFwk.Timer({
			action: function () {
				self.xWide--;
				self.yWide--;
			}, tickTime: self.elapsedApproachMax
		});
	},
	update: function (delta) {
		finalDegree = satAcc * DEGREE_CONVERTION_VALUE;
		satX = (this.xWide * Math.cos(finalDegree)) + 320;
		satY = (this.yWide * Math.sin(finalDegree)) + 240;
		
		satAcc -= 1;
		
		if (satAcc <= -360) { satAcc = 0; }
	
		this.estelaTimer.tick(delta);
		this.gravityTimer.tick(delta);
	},
	draw: function (context) {
		context.save();		
			context.fillStyle = "orange";
			context.beginPath();
			context.arc(satX, satY, satRad, 0, Math.PI * 2);
			context.closePath();
			context.fill();
				
			context.fillStyle = "black";
			context.fillRect(320, 240, 2, 2);
				
			if (isDropping) {
				bombX += (targetX - bombX) / bombSpeed;
				bombY += (targetY - bombY) / bombSpeed;
				
				context.fillStyle = "orange";
				context.beginPath();
				context.arc(bombX, bombY, bombRad, 0, Math.PI * 2);
				context.closePath();
				context.fill();
					
				var x = bombX - asterX, y = bombY - asterY,	dist = Math.sqrt(x*x + y*y);
					
				if(dist < (bombRad + asterRad)){
					isDropping = false;
				}
			}
		context.restore();
	}	
};