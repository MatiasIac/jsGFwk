var enemy = {
	x: 0, y: 0, size: 10,
	strokeColor: "red",
	targetX: 0, targetY: 0, enemySpeed: 50,
	rotationAngle: 45, rotationSpeed: 0.01,
	
	hit: function (val) {
		jsGFwk.settings.clearColor = "white";
		enemyJuke.play();
		this.size -= val;
		points = parseInt(points + val);
		if (this.size <= 4) {
			finalenemyJuke.play();
			this.destroy();
		}
	},
	
	onInit: function (parameters) {
		this.x = parameters.x;
		this.y = parameters.y;
		this.enemySpeed = parameters.speed;
		this.size = parameters.size;
		
		this.targetX = jsGFwk._gameObjects.player.asterX;
		this.targetY = jsGFwk._gameObjects.player.asterY;
		
		switch (parameters.enemyType) {
			case 1:
				this._updatePointer = this._followerUpdate;
				this._draw = this._squareDraw;
				this.rotationSpeed = this.rotationSpeed / this.size;
				break;
			case 2:
				this._updatePointer = this._jumperUpdate;
				this._draw = this._squareDraw;
				this.rotationSpeed = this.rotationSpeed / this.size;
				break;
			case 3:
				this._updatePointer = this._followerUpdate;
				this._draw = this._bigDraw;
				this.rotationSpeed = -0.00005;
				this._innerUpdate = this._innerUpdateFinal;
				var self = this;
				this.innerShipTimer = new jsGFwk.Timer({
					action: function () {
						var coords = jsGFwk._gameObjects.enemyController._getObjectBasedOnCoords();
						coords.x = self.x;
						coords.y = self.y;
						coords.size = 10;
						jsGFwk._gameObjects.enemies.cloneObject(coords);
					}, tickTime: 4
				});
				break;
		}
		
		this.strokeColor = "rgb(" + this.size * 2 + "," + this.enemySpeed * 2 + ",110)";
	},
	
	_updateAngle: function () {
		this.rotationAngle += this.rotationSpeed;
	},
	
	_updatePointer: function () {},
	
	_followerUpdate: function () {
		this.targetX = jsGFwk._gameObjects.player.asterX - (this.size / 2);
		this.targetY = jsGFwk._gameObjects.player.asterY - (this.size / 2);
	},
	
	_jumperUpdate: function () {
		var collide = jsGFwk.Collisions._disColliding.call(
			{x: this.x, y: this.y, radius: 2, center: { x: 1, y: 1}},
			{x: this.targetX, y: this.targetY, radius: 3, center: { x: 1, y: 1}});
		
		if (collide) {
			this.targetX = jsGFwk._gameObjects.player.asterX - (this.size / 2);
			this.targetY = jsGFwk._gameObjects.player.asterY - (this.size / 2);
		}
	},
	
	_checkCollision: function () {
		var collide = jsGFwk.Collisions._disColliding.call(
			{x: this.x, y: this.y, radius: this.size, center: { x: this.size / 2, y: this.size / 2}},
			{x: jsGFwk._gameObjects.player.asterX, y: jsGFwk._gameObjects.player.asterY,
			 radius: jsGFwk._gameObjects.player.asterRad, 
			 center: { 
				x: jsGFwk._gameObjects.player.asterRad / 2, 
				y: jsGFwk._gameObjects.player.asterRad / 2}
			});
	
		if (collide) {
			jsGFwk._gameObjects.player.enemyCollide();
			this.hit(1);
		}
	},
	
	_innerUpdateFinal: function (delta) {
		this.innerShipTimer.tick(delta);
	},
	
	_innerUpdate: function () {},
	
	_bigDraw: function (context) {
		context.translate(this.x, this.y);
		context.rotate(this.rotationAngle * (180/Math.PI));
		context.translate(-(this.size / 2), -(this.size / 2));
		context.fillStyle = this.strokeColor;
		context.lineWidth = this.size / 2;
		context.lineCap = 'round';
		context.beginPath();
		
		context.moveTo(10, 0);
		context.lineTo(40, 0);
		context.lineTo(50, this.size);
		context.lineTo(40, this.size * 2);
		context.lineTo(10, this.size * 2);
		context.lineTo(0, this.size);
		context.lineTo(10, 0);
		context.closePath();
		context.fill();
	},
	
	_squareDraw: function (context) {
		context.translate(this.x, this.y);
		context.rotate(this.rotationAngle * (180/Math.PI));
		context.translate(-(this.size / 2), -(this.size / 2));
		context.strokeStyle = this.strokeColor;
		context.lineWidth = this.size / 2;
		context.strokeRect(0, 0, this.size, this.size);
	},
	
	_draw: function () { },
	
	onUpdate: function (delta) {
		this.x += (this.targetX - this.x) / this.enemySpeed;
		this.y += (this.targetY - this.y) / this.enemySpeed;
		
		this._updatePointer();
		this._updateAngle();
		this._checkCollision();
		this._innerUpdate(delta);
	},
	onDraw: function (context) {
		context.save();
			this._draw(context);
		context.restore();
	}
};