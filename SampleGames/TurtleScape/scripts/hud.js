var hud = {
	id: "hud",
	zOrder: 1,
	visible: true,
	
	mouseClickId: -1,
	mouseMoveId: -1,
	startGameColor: "black",
	
	dummyObject: { width: 92, height: 44, x: 450, y: 330 },
	dummyMouse: { width: 1,	height: 1, x: 0, y: 0 },
	
	init: function () {
		jsGFwk.Collisions.onObjectCreated(this.dummyObject);
		jsGFwk.Collisions.onObjectCreated(this.dummyMouse);
		
		this.mouseClickId = jsGFwk.IO.mouse.registerClick(function (coord) {
			jsGFwk._gameObjects.hud.dummyMouse.x = coord.x;
			jsGFwk._gameObjects.hud.dummyMouse.y = coord.y;

			if (jsGFwk._gameObjects.hud.dummyMouse.isRectColliding(jsGFwk._gameObjects.hud.dummyObject)) {
				jsGFwk.IO.mouse.unregisterClick(jsGFwk._gameObjects.hud.mouseClickId);
				jsGFwk.IO.mouse.unregisterMove(jsGFwk._gameObjects.hud.mouseMoveId);
				jsGFwk.Scenes.scenes.game.enable();
			}
		});
		
		this.mouseMoveId = jsGFwk.IO.mouse.registerMove(function (coord) {
			jsGFwk._gameObjects.hud.dummyMouse.x = coord.x;
			jsGFwk._gameObjects.hud.dummyMouse.y = coord.y;
		});
	},
	update: function (delta) { 
		this.startGameColor = jsGFwk._gameObjects.hud.dummyMouse.isRectColliding(jsGFwk._gameObjects.hud.dummyObject) ? "red" : "black";
	},
	draw: function (context) { 
		context.save();
			context.drawImage(jsGFwk.ResourceManager.graphics.mainScreen.image, 0, 0);
			context.fillStyle = this.startGameColor;
			context.font = "40pt normalFont";
			context.fillText("Start", 450, 370);
		context.restore();
	}
}