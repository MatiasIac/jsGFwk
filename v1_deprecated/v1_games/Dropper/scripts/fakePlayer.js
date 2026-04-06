var fakePlayer = {
	id: "fakePlayer",
	visible: true,
	
	estelaTime: 0.1, estelaTimer: null,
	
	centryOffSet: 0,
	xWide: 20, yWide: 120,
	elapsedApproachMax: 0.5,
	
	playerSpeed: 30, moveTargetX: 320, moveTargetY: 240,
	asterX: 320, asterY: 240, asterRad: 5,
	droidSpeed: 5, currentDroidSpeed: 5,
	
	formationSelected: 0,
	showButtonHalo: false,
	fromKey: false,
	
	fakeMouse: { x: 0, y: 0, width: 1, height: 1 },
	tallButton: { x: 10, y: 5, width: 79, height: 20 },
	wideButton: { x: 100, y: 5, width: 79, height: 20 },
	circleButton: { x: 190, y: 5, width: 79, height: 20 },
	dropButton: { x: 570, y: 425, width: 62, height: 56 },
	
	playedTimeTick: 1, playedTimer: {},
		
	centryTimerTick: 2, centryTimer: {},
	
	isGrowingCentry: true,
	
	setTall: function () {
		this.formationSelected = 0;
		this.xWide = 20 + this.centryOffSet;
		this.yWide = 120 + this.centryOffSet;
		this.droidSpeed = this.currentDroidSpeed;
	},
	setWide: function () {
		this.formationSelected = 1;
		this.xWide = 120 + this.centryOffSet;
		this.yWide = 20 + this.centryOffSet;
		this.droidSpeed = this.currentDroidSpeed;
	},
	setCircle: function () {
		this.formationSelected = 2;
		this.xWide = 80 + this.centryOffSet;
		this.yWide = 80 + this.centryOffSet;
		this.droidSpeed = this.currentDroidSpeed / 2;
	},
	setDrop: function () {
		this.showButtonHalo = true;
	},
	
	checkKeys: function () {
		//W
		if (jsGFwk.IO.keyboard._activeKey[87]) { 
			this.setWide();
		}
		//T
		if (jsGFwk.IO.keyboard._activeKey[84]) { 
			this.setTall();
		}
		//C
		if (jsGFwk.IO.keyboard._activeKey[67]) { 
			this.setCircle();
		}
		//D
		if (jsGFwk.IO.keyboard._activeKey[68]) { 
			this.fromKey = true;
			this.setDrop();
		}
	},
	
	init: function () {
		this.setTall();
		
		var self = this;
		
		this.estelaTimer = new jsGFwk.Timer({
			action: function () {
				jsGFwk._gameObjects.estela.cloneObject({ x: satX,
					y: satY, radius: parseInt(satRad / 2) });
			}, tickTime: self.estelaTime
		});
		
		this.centryTimer = new jsGFwk.Timer({
			action: function () {
				if (self.isGrowingCentry) {
					satRad++;
					if (satRad >= 15) { self.isGrowingCentry = false; }
				} else {
					satRad--;
					if (satRad <= 4) { self.isGrowingCentry = true; }
				}
			}, tickTime: self.centryTimerTick
		});
		
		this.mouseClickId = jsGFwk.IO.mouse.registerClick(function (coord) {
			self.moveTargetX = coord.x;
			self.moveTargetY = coord.y;
		});
	},
	update: function (delta) {
		finalDegree = satAcc * DEGREE_CONVERTION_VALUE;
		satX = ((this.xWide + this.asterRad) * Math.cos(finalDegree)) + this.asterX;
		satY = ((this.yWide + this.asterRad) * Math.sin(finalDegree)) + this.asterY;
		
		satAcc -= this.droidSpeed;
		
		if (satAcc <= -360) { satAcc = 0; }

		this.checkKeys();
		
		if (this.fromKey) { 
			this.estelaTimer.tick(delta);
			this.fromKey = false;
		}
		
		this.centryTimer.tick(delta);
				
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
			
			context.fillStyle = "#99FF00";
			context.beginPath();
			context.arc(this.asterX, this.asterY, this.asterRad, 0, Math.PI * 2);
			context.closePath();
			context.fill();
		context.restore();
	}	
};