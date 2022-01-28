var controller = {
	id: "controller",
	visible: true,
	
	gravity: 0.09,
	initialVel: 0,
	won: false,
	
	init: function () {
		jsGFwk.Container.createContainer("container", brick);
		
		var isPrice = parseInt(Math.random() * 29);
		for (var i = 0; i < 30; i++) {
			var rX = parseInt(Math.random() * 500);
			var rY = parseInt(Math.random() * 450) + 10;			
			jsGFwk._gameObjects.container.cloneObject({x: rX, y: rY, isPrice: isPrice == i});
		}
	},
	update: function (delta) {
		for (var o in jsGFwk._gameObjects) {
			if (o !== "controller" && o !== "container") {
				var obj = jsGFwk._gameObjects[o];
				if (obj.__vel__ === undefined) {
					obj.__vel__ = this.initialVel;
				}
				if (obj.__life__ === undefined) {
					obj.__life__ = 10;
				}
				
				var tempY = obj.y;
				var tempX = obj.x;
				var tempVel = obj.__vel__;
				var collide = false;
				var won = false;
				obj.__vel__ = obj.__vel__ + this.gravity;
				obj.y += obj.__vel__;
				
				jsGFwk._gameObjects.container.eachCloned(function (clon, event) {
					collide = obj.isRectColliding(clon);
					won = clon.isPrice;
					event.cancel = collide;
					//Best way: Collect all the colliding object. Test them to see if can move
					/*if (collide) {
						obj.notRight = clon.x < obj.x && (clon.y < obj.y && clon.y > obj.y);
						obj.notLeft = clon.x > obj.x;
					}*/
				});
				
				if (collide) {
					obj.y = tempY;
					obj.x = tempX;
					obj.__vel__ = this.initialVel;
					this.won = won;
				} else {
					if (obj.x > 600 || obj.x < (obj.width * -1) || obj.y > 400 || obj.y < (obj.height * -1)) {
						obj.__life__ -= 1;
						obj.x = 300 - (obj.width / 2);
						obj.y = 200 - (obj.height / 2);
					}
				}
			}
		}
	},
	
	draw: function (context) {
		context.save();
			context.fillStyle = "white";
			context.font = "20pt arial";
			for (var o in jsGFwk._gameObjects) {
				if (o !== "controller" && o !== "container") {
					if (jsGFwk._gameObjects[o].__life__) {
						context.fillText("Vidas: " + jsGFwk._gameObjects[o].__life__, 10, 30);
					}
				}
			}
			
			if (this.won) {
				context.fillText("You won!", 200, 200);
			}
		context.restore();
	}
};

var brick = {
	onInit: function (initializationParameters) {
		this.x = initializationParameters.x;
		this.y = initializationParameters.y;
		this.width = 50;
		this.height = 10;
		this.isPrice = initializationParameters.isPrice;
	},
	onUpdate: function (delta) { },
	onDraw: function (context) {
		if (this.isPrice) {	
			context.fillStyle = "yellow"; 
		} else { 
			context.fillStyle = "rgb(155,155,155)";
		}
		context.fillRect(this.x, this.y, 50, 10);
	}
}