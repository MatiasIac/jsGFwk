var knights = {
	id: "knights",
	zOrder: 11,
	visible: true,
	leftKnightX: 0,
	rightKnightX: 292,
	isMoving: false,
	movingSpeed: 3,
	walkingDelta: 0,
	showSmoke: false,
	smokeDelta: 0,
	maxSmokeIntervals: 10,
	smokeIntervals: 0,
	
	deltaSound: 0,
	
	signalOfEndAnimation: function () {},
	
	restart: function () {
		jsGFwk.Sprites.walkingRight.reset();
		jsGFwk.Sprites.walkingLeft.reset();
		jsGFwk.Sprites.smoke.reset();
		this.leftKnightX = 0;
		this.rightKnightX = 292;
		this.isMoving = false;
		this.movingSpeed = 3;
		this.showSmoke = false;
		this.smokeIntervals = 0;
		this._update = this._updateRef;
	},
	
	init: function () {
		jsGFwk.Sprites.walkingRight.reset();
		jsGFwk.Sprites.walkingLeft.reset();
		jsGFwk.Sprites.smoke.reset();
		this._update = this._updateRef;
	},
	
	_updateRef: function (delta) {
		if (this.isMoving) {
			this.walkingDelta += delta;
			this.deltaSound += delta;
			
			if (this.walkingDelta > 0.1) {
				this.walkingDelta = 0;
				jsGFwk.Sprites.walkingRight.next();
				jsGFwk.Sprites.walkingLeft.next();
			}
			
			this.leftKnightX += this.movingSpeed;
			this.rightKnightX -= this.movingSpeed;
			
			if (this.deltaSound > 0.2) {
				this.deltaSound = 0;
				jsGFwk.ResourceManager.sounds.hit.audio.play();
			}
			
			if (this.leftKnightX >= 140) {
				this.isMoving = false;
				this.showSmoke = true;
			}
		}
		
		if (this.showSmoke) {
			this.smokeDelta += delta;
			if (this.smokeDelta > 0.1) {
				this.smokeDelta = 0;
				this.smokeIntervals++;
				jsGFwk.Sprites.smoke.next();
			}
			
			if (this.maxSmokeIntervals == this.smokeIntervals) {
				this.showSmoke = false;
				this.signalOfEndAnimation();
				this.visible = false;
				this._update = this._updateEmpty;
			}
		}
	},
	
	_updateEmpty: function() {},
	
	_update: function() {},
	
	update: function (delta) {
		this._update(delta);
	},
	
	draw: function (context) {
		context.save()
			if (!this.showSmoke) {
				context.drawImage(jsGFwk.Sprites.walkingRight.sprite.image, this.leftKnightX, 175);
				context.drawImage(jsGFwk.Sprites.walkingLeft.sprite.image, this.rightKnightX, 175);
			} else {
				context.drawImage(jsGFwk.Sprites.smoke.sprite.image, 140, 175);
			}
		context.restore();
	}
}