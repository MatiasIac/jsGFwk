var hud = {
	id: "hud",
	visible: true,
	
	mouseClickId: 0,
	dummyStartGameObject: { width: 400, height: 90, x: 0, y: 90 },
	dummyMouse: { width: 1,	height: 1, x: 0, y: 0 },
	
	init: function () {
		jsGFwk.Collisions.onObjectCreated(this.dummyStartGameObject);
		jsGFwk.Collisions.onObjectCreated(this.dummyMouse);
		
		this.mouseClickId = jsGFwk.IO.mouse.registerClick(function (coord) {
			jsGFwk._gameObjects.hud.dummyMouse.x = coord.x;
			jsGFwk._gameObjects.hud.dummyMouse.y = coord.y;
			
			if (jsGFwk._gameObjects.hud.dummyMouse.isRectColliding(jsGFwk._gameObjects.hud.dummyStartGameObject)) {
				jsGFwk.IO.mouse.unregisterClick(jsGFwk._gameObjects.hud.mouseClickId);
				jsGFwk.Scenes.scenes.juego.enable();
				jsGFwk.Container.createContainer("bala", bala);
			}
		});
	},
	
	update: function (delta) { },
	
	draw: function (context) {
		context.save();
			context.drawImage(jsGFwk.ResourceManager.graphics.splash.image,
				0, 0);
				
			context.fillStyle = "black";
			context.font = "50pt zxBold";
			context.fillText("Start Game", 20, 110);
		context.restore();
	}
};