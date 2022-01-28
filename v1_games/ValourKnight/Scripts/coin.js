var hud = {
	id: "player",
	zOrder: 1,
	visible: true,
	x: 10,
	y: 10,
	mX: 10,
	mY: 10,
	speed: 2.5,
	lives: [],
	
	init: function () {
		this.dummySantaDraw = this.santaDraw;
		this.dummyLiveDraw = this.liveDraw;
		
		for (var i = 0; i < 5; i++) {
			var l = new Live();
			jsGFwk.Collisions.onObjectCreated(l);
			this.lives.push(l);
		}
		
		jsGFwk.IO.mouse.registerMove(function (coord) {
			jsGFwk._gameObjects.player.mX = coord.x;
			jsGFwk._gameObjects.player.mY = coord.y;
		});
	},
	
	update: function (delta) {
		var delta_x = this.mX - this.x;
		var delta_y = this.mY - this.y;
		var goal_dist = Math.sqrt((delta_x * delta_x) + (delta_y * delta_y));
		if (goal_dist > this.speed) {
			var ratio = this.speed / goal_dist;
			var x_move = ratio * delta_x; 
			var y_move = ratio * delta_y;
			this.x = x_move + this.x; 
			this.y = y_move + this.y;
		} else {
			this.x = this.mX;
			this.y = this.mY;
		}
		
		var liveLost = 0;
		
		for(var i = 0; i < this.lives.length; i++) {
			this.lives[i].update(delta);
			
			for (var j = 0; j < jsGFwk._gameObjects.enemy.enemies.length; j++) {
				if (this.lives[i].isRectColliding(jsGFwk._gameObjects.enemy.enemies[j])) {
					jsGFwk._gameObjects.enemy.enemies[j].x = -20;
					liveLost++;
				}
			}
		}
		
		if (liveLost > 0) {
			for (var i = 0; i < liveLost; i++) {
				this.lives.splice(0, 1);
				jsGFwk.ResourceManager.sounds.explode.audio.play();
			}
		}
		
		GLOBALS.METERS++;
		
		if (this.lives.length == 0) {
			document.getElementById("puntaje").innerHTML = GLOBALS.METERS;
			document.getElementById("mensaje").style.display = "";
			jsGFwk.stop();
		}
	},
	
	/*Drawing functions */
	dummySantaDraw: function (context) { },
	dummyLiveDraw: function (context) { },
	
	santaDraw: function (context) {
		context.save();
			context.lineWidth = 2;
			context.strokeStyle = "#AA0000";
			context.strokeRect(this.x, this.y, 12, 12);
			
			context.strokeRect(this.x - 3, this.y + 15, 17, 1);
		context.restore();
	},
	
	liveDraw: function (context) {
		for(var i = 0; i < this.lives.length; i++) {
			this.lives[i].y = (this.y + 5);
			this.lives[i].x = (this.x + (i * 12)) + 20;
			this.lives[i].draw(context);
		}
	},
	
	draw: function (context) {
		this.dummySantaDraw(context);
		this.dummyLiveDraw(context);
		
		context.save()
			context.fillStyle = "white";
			context.fillText(GLOBALS.METERS + "m", 10, 10);
		context.restore();
	}
}