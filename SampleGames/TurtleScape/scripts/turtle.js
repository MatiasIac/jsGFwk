var turtle = {
	id: "turtle",
	zOrder: 8,
	visible: true,
	
	deltaCount: 0,
	deltaHit: 0,
	
	//0 = idle, 1 = running, 2 = climbing
	state: 0,
	needItMode: 1,
	imageToDraw: {},
	
	x: 100,
	y: 250,
	width: 29,
	height: 45,
	
	mouseClickId: -1,
	hitSpeed: 0,
	accumulatorSpeed: 1.25,
	decumulatorSpeed: 0.25,

	meterCounter: 0,
	
	dummyMouse: { width: 1,	height: 1, x: 0, y: 0 },
	
	init: function () {
		this.hitSpeed = 0;
		this.accumulatorSpeed = 1.25;
		this.decumulatorSpeed = 0.25;
		this.meterCounter = 0;
		this.state = 0;
		this.deltaHit = 0;
	
		jsGFwk.Sprites.turtleIdle.next();
		this.imageToDraw = jsGFwk.Sprites.turtleIdle.sprite.image;
		
		this.mouseClickId = jsGFwk.IO.mouse.registerClick(function (coord) {
			jsGFwk._gameObjects.turtle.dummyMouse.x = coord.x;
			jsGFwk._gameObjects.turtle.dummyMouse.y = coord.y;

			if (jsGFwk._gameObjects.keyHelper.isRectColliding(jsGFwk._gameObjects.turtle.dummyMouse)) {
				jsGFwk._gameObjects.keyHelper.isPressed = true;
				jsGFwk._gameObjects.turtle.deltaHit = 0;
				jsGFwk._gameObjects.turtle.hitSpeed += jsGFwk._gameObjects.turtle.accumulatorSpeed;
			} else {
				jsGFwk._gameObjects.keyHelper.isPressed = false;
			}
		});
	},
	
	update: function (delta) {
		if (this.isRectColliding(jsGFwk._gameObjects.magma)) {
			jsGFwk.IO.mouse.unregisterClick(jsGFwk._gameObjects.turtle.mouseClickId);
			jsGFwk.Scenes.scenes.end.enable();
			return;
		}
	
		this.deltaCount += delta;

		if (this.hitSpeed > 0) {
			this.state = this.needItMode;
			this.deltaHit += delta;
			this.hitSpeed -= this.decumulatorSpeed;
			this.meterCounter += this.hitSpeed;
						
			if (this.meterCounter >= 100) {
				this.meterCounter -= 100;
				GLOBALS.METERS += 1;
			}
			
			this.hitSpeed = Math.min(this.hitSpeed, 6);
			
		} else if (this.state != 0) {
			jsGFwk.Sprites.turtleIdle.reset();
			jsGFwk.Sprites.turtleRunning.reset();
			this.state = 0;
			this.hitSpeed = 0;
		}
	
		if (this.deltaCount > 0.08) {
			this.deltaCount = 0;
			switch (this.state) {
				case 0:
					jsGFwk.Sprites.turtleIdle.next();
					this.imageToDraw = jsGFwk.Sprites.turtleIdle.sprite.image;
					break;
				case 1:
					jsGFwk.Sprites.turtleRunning.next();
					this.imageToDraw = jsGFwk.Sprites.turtleRunning.sprite.image;
					break;
				case 2:
					break;
			}
		}
		
		if (this.deltaHit > 0.1) {
			jsGFwk._gameObjects.keyHelper.isPressed = false;
		}
		
		jsGFwk._gameObjects.background.moveScreen(this.hitSpeed);
		jsGFwk._gameObjects.metter.speed = this.hitSpeed;
		jsGFwk._gameObjects.magma.x -= this.hitSpeed;
	},
	draw: function (context) { 
		context.save();
			context.drawImage(this.imageToDraw, this.x, this.y);
		context.restore();
	}
}