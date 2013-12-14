var enemy = {
	id: "enemy",
	zOrder: 3,
	visible: true,
	x: 0,
	y: 0,
	enemies: [],
	
	enemy: function () {
		return {
			x: 600,
			y: 20,
			width: 20,
			height: 15,
			draw: function(context) {
				context.save();
					context.strokeStyle = "blue";
					context.beginPath();
					context.moveTo(this.x, this.y + 7);
					context.lineTo(this.x + 20, this.y);
					context.lineTo(this.x + 20, this.y + 15);
					context.lineTo(this.x, this.y + 7);
					context.stroke();
					context.closePath();
				context.restore();
			},
			update: function(delta) {
				this.x-= GLOBALS.ENEMY_SPEED;
				
				if (this.x < -20) {
					this.y = (Math.random() * 5) * 48;
					this.x = (Math.random() * 100) + GLOBALS.CANVAS_SIZE.width;
				}
			}
		};
	},
	
	init: function () {
		for (var i = 0; i < 6; i++) {
			var e = this.enemy();
			e.y = (Math.random() * 6) * (GLOBALS.CANVAS_SIZE.height * 6);
			e.x = (Math.random() * 100) + GLOBALS.CANVAS_SIZE.width;
			jsGFwk.Collisions.onObjectCreated(e);
			this.enemies.push(e);
		}
	},
		
	update: function (delta) {
		for (var i = 0; i < this.enemies.length; i++) {
			this.enemies[i].update(delta);
		}
	},
	
	draw: function (context) {
		for (var i = 0; i < this.enemies.length; i++) {
			this.enemies[i].draw(context);
		}
	}
};