var player = {
	id: "player",
	visible: true,
	
	estelaTime: 0.1, estelaTimer: null,
	
	xWide: 80, yWide: 80,
	elapsedApproachMax: 0.5,
	
	playerSpeed: 30, moveTargetX: 320, moveTargetY: 240,
	asterX: 320, asterY: 240, asterRad: 15,
	droidSpeed: 1,
	
	xGradOffset: 5,
	
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
		
		this.mouseClickId = jsGFwk.IO.mouse.registerClick(function (coord) {
			self.moveTargetX = coord.x;
			self.moveTargetY = coord.y;
		});
	},
	update: function (delta) {
		finalDegree = satAcc * DEGREE_CONVERTION_VALUE;
		satX = (this.xWide * Math.cos(finalDegree)) + this.asterX;
		satY = (this.yWide * Math.sin(finalDegree)) + this.asterY;
		
		satAcc -= this.droidSpeed;
		
		if (satAcc <= -360) { satAcc = 0; }
	
		this.estelaTimer.tick(delta);
		//this.gravityTimer.tick(delta);
		
		this.asterX += (this.moveTargetX - this.asterX) / this.playerSpeed;
		this.asterY += (this.moveTargetY - this.asterY) / this.playerSpeed;
	},
	draw: function (context) {
		context.save();		
			context.fillStyle = "orange";
			context.beginPath();
			context.arc(satX, satY, satRad, 0, Math.PI * 2);
			context.closePath();
			context.fill();
			
			var gradient = context.createRadialGradient(this.asterX, this.asterY, this.asterRad,
				this.asterX + this.xGradOffset, this.asterY + 7, 5);
			gradient.addColorStop(0, "#7a52ff");
			gradient.addColorStop(1, "#b79bff");
			context.fillStyle = gradient;
			
			//context.fillStyle = "#BBBBBB";
			context.beginPath();
			context.arc(this.asterX, this.asterY, this.asterRad, 0, Math.PI * 2);
			context.closePath();
			context.fill();

		context.restore();
	}	
};