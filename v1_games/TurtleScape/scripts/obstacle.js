var obstacle = {
	id: "obstacle",
	zOrder: 7,
	visible: true,
	
	x: 500,
	width: 50,
	height: 480,
	y: 0,
	selectedObstacle: 0,
	
	magmaMovementSpeed: 1.5,
	
	init: function () {
		this.x = 500;
		this.width = 50;
		this.height = 480;
		this.y = 0;
		this.selectedObstacle = parseInt(Math.random() * 3);
		this.magmaMovementSpeed = 2.5;
	},
	
	update: function (delta) {
		this.x += this.magmaMovementSpeed;
	},
	
	draw: function (context) { 
		context.save();
			context.drawImage(jsGFwk.Sprites.obstacles.spriteBag[this.selectedObstacle].image, this.x, this.y);
		context.restore();
	}
}