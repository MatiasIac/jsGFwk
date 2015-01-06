var player = {
	id: "player",
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
	
	energy: 100, energyCalc: 0,
	shield: 100, shieldCalc: 0,
	
	fakeMouse: { x: 0, y: 0, width: 1, height: 1 },
	tallButton: { x: 10, y: 5, width: 79, height: 20 },
	wideButton: { x: 100, y: 5, width: 79, height: 20 },
	circleButton: { x: 190, y: 5, width: 79, height: 20 },
	dropButton: { x: 570, y: 425, width: 62, height: 56 },
	
	playedTimeTick: 1, playedTimer: {},
	
	backgroundColorTimer: {}, backgroundColorTimerTick: 0.2,
	
	energyTimerTick: 1, energyTimer: {},
	
	centryTimerTick: 2, centryTimer: {},
	
	overchargerTimerTick: 0.5, overchargerTimer: {},
	
	isOverCharged: false,
	
	//sounds
	pillSound: {}, shotSound: {}, crashSound: {},
	
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
	
	enemyCollide: function () {
		this.shield--;
		
		this.crashSound.play();
		
		if (this.shield <= 1) {
			jsGFwk._gameObjects.estela.clearAll();
			jsGFwk._gameObjects.enemies.clearAll();
			jsGFwk._gameObjects.pills.clearAll();
			jsGFwk.Scenes.scenes.endGame.enable();
		}
	},
	
	pillEaten: function (type, value) {
		value = Math.floor(value / 10);
		
		this.pillSound.play();
		
		switch (type) {
			case 1:
				this.shield += value;
				jsGFwk.settings.clearColor = "green";
				if (this.shield > 100) { this.shield = 100; }
				break;
			case 2:
				this.energy += value;
				jsGFwk.settings.clearColor = "red";
				if (this.energy > 100) { 
					this.energy = 100;
					this.isOverCharged = true;
				}
				break;
			case 3:
				satRad += value;
				jsGFwk.settings.clearColor = "orange";
				if (satRad > 35) { satRad = 35; }
				break;
		}
	},
	
	init: function () {
		//Reset
		this.energy = 100;
		this.shield = 100;
		this.setTall();
		//
		
		var self = this;
		
		this.shotSound = new jsGFwk.Jukebox({volume: 0.5, channels: 5, source: jsGFwk.ResourceManager.sounds.shot });
		this.pillSound = new jsGFwk.Jukebox({volume: 0.5, channels: 5, source: jsGFwk.ResourceManager.sounds.powerup });
		this.crashSound = new jsGFwk.Jukebox({volume: 0.3, channels: 5, source: jsGFwk.ResourceManager.sounds.hit });
		
		this.estelaTimer = new jsGFwk.Timer({
			action: function () {
				if (!self.isOverCharged) {
					jsGFwk._gameObjects.estela.cloneObject({ x: satX,
						y: satY, radius: parseInt(satRad / 2) });
					self.energy--;
				} else {
					//Super override!
					jsGFwk._gameObjects.estela.cloneObject({ x: satX,
						y: satY, radius: 10 });
				}
				self.shotSound.play();
			}, tickTime: self.estelaTime
		});
		
		this.overchargerTimer = new jsGFwk.Timer({
			action: function () {
				self.isOverCharged = false;
			}, tickTime: self.overchargerTimerTick
		});
		
		this.playedTimer = new jsGFwk.Timer({
			action: function () {
				playedTime++;
			}, tickTime: self.playedTimeTick
		});
		
		this.backgroundColorTimer = new jsGFwk.Timer({
			action: function () {
				jsGFwk.settings.clearColor = "rgb(50, 50, 50)";
			}, tickTime: self.backgroundColorTimerTick
		});
		
		this.energyTimer = new jsGFwk.Timer({
			action: function () {
				if (self.energy <= 100) {
					self.energy++;
				}
			}, tickTime: self.energyTimerTick
		});
		
		this.centryTimer = new jsGFwk.Timer({
			action: function () {
				if (satRad > 4) {
					satRad--;
				}
			}, tickTime: self.centryTimerTick
		});
				
		jsGFwk.Collisions.onObjectCreated(this.fakeMouse);
		jsGFwk.Collisions.onObjectCreated(this.tallButton);
		jsGFwk.Collisions.onObjectCreated(this.wideButton);
		jsGFwk.Collisions.onObjectCreated(this.circleButton);
		//jsGFwk.Collisions.onObjectCreated(this.dropButton);
		
		this.mouseClickId = jsGFwk.IO.mouse.registerClick(function (coord) {
			self.fakeMouse.x = coord.x;
			self.fakeMouse.y = coord.y;
			
			if (self.fakeMouse.isRectColliding(self.tallButton)) {
				self.setTall();
			} else if (self.fakeMouse.isRectColliding(self.wideButton)) {
				self.setWide();
			} else if (self.fakeMouse.isRectColliding(self.circleButton)) {
				self.setCircle();
			}/* else if (self.fakeMouse.isRectColliding(self.dropButton)) {
				self.setDrop();
			}*/ else {
				self.moveTargetX = coord.x;
				self.moveTargetY = coord.y;
			}
		});
	},
	update: function (delta) {
		finalDegree = satAcc * DEGREE_CONVERTION_VALUE;
		satX = ((this.xWide + this.asterRad) * Math.cos(finalDegree)) + this.asterX;
		satY = ((this.yWide + this.asterRad) * Math.sin(finalDegree)) + this.asterY;
		
		satAcc -= this.droidSpeed;
		
		if (satAcc <= -360) { satAcc = 0; }

		this.checkKeys();
		
		if (/*this.showButtonHalo && */this.energy > 0) {
			if (this.fromKey) { 
				this.estelaTimer.tick(delta);
				this.fromKey = false;
			}/* else {
				this.estelaTimer.tick(1);
			}*/
		}
		
		if (this.isOverCharged) {
			this.estelaTimer.tick(0.05);
			this.overchargerTimer.tick(delta);
		}
		
		this.playedTimer.tick(delta);
		this.backgroundColorTimer.tick(delta);
		this.energyTimer.tick(delta);
		this.centryTimer.tick(delta);
		
		//Fix for Zero index in calculation FF and IE doesn't support it
		this.energyCalc = Math.min(Math.max((136 * this.energy) / 100, 1), 136);
		this.shieldCalc = Math.max((131 * this.shield) / 100, 1);
		
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

			context.drawImage(jsGFwk.Sprites.actionbackground.image, (this.formationSelected * 90) + 31, 15);
			context.drawImage(jsGFwk.Sprites.formationTall.image, (0 * 90) + 31, 15);
			context.drawImage(jsGFwk.Sprites.formationWide.image, (1 * 90) + 31, 15);
			context.drawImage(jsGFwk.Sprites.formationCircle.image, (2 * 90) + 31, 15);
			
			/*if (this.showButtonHalo) {
				context.drawImage(jsGFwk.Sprites.dropButtonHalo.image, 549, 416);
				this.showButtonHalo = false;
			}
			context.drawImage(jsGFwk.Sprites.dropButton.image, 560, 426);*/
			
			context.drawImage(jsGFwk.Sprites.shieldBar.image,
				0, 0, this.shieldCalc, 7,
				24, 448, this.shieldCalc, 7);
					
			context.drawImage(jsGFwk.Sprites.energyBar.image, 
				0, 0, this.energyCalc, 22,
				25, 440, this.energyCalc, 22);
				
			context.drawImage(jsGFwk.Sprites.energyBarHalo.image, 13, 433);
			
			context.fillStyle = "white";
			context.textAlign = "center";
			context.font = "60pt zxBold";
			
			var minutes = parseInt(playedTime / 60);
			minutes = ((minutes + "").length === 1 ? "0" + minutes : minutes);
			var seconds = parseInt(playedTime % 60);
			seconds = ((seconds + "").length === 1 ? "0" + seconds : seconds);
			
			context.fillText(minutes + ":" + seconds, 490, 35);
			
			context.font = "18pt zxBold";
			context.fillText("SCORE", 320, 430);
			
			context.font = "28pt zxBold";
			context.fillText(points, 320, 460);
			
			if (this.isOverCharged) {
				context.font = "80pt zxBold";
				context.fillStyle = "red";
				context.fillText("OVERCHARGED!!!", 320, 220);
			}
			
		context.restore();
	}	
};