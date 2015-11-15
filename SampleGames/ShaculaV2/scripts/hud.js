var hud = {
	id: 'hud',
	visible: true,
	mouseId: 0,
	mouseMoveId: 0,
	startSpriteToShow: 0,
	fakeMouse: { x: 0, y: 0 },
	startCoord: { x: 280, y: 200, width: 75, height: 48},
	init: function () {
		jsGFwk.Collisions.onObjectCreated(this.fakeMouse);
		this.mouseId = jsGFwk.IO.mouse.registerClick(function (coord) {
			jsGFwk._gameObjects.hud.fakeMouse.x = coord.x;
			jsGFwk._gameObjects.hud.fakeMouse.y = coord.y;
			
			if (jsGFwk._gameObjects.hud.fakeMouse.isRectColliding(jsGFwk._gameObjects.hud.startCoord)) {
				jsGFwk.IO.mouse.unregisterClick(jsGFwk._gameObjects.hud.mouseId);
				jsGFwk.IO.mouse.unregisterMove(jsGFwk._gameObjects.hud.mouseMoveId);
				jsGFwk.Scenes.scenes.game.enable();
			}
		});
		
		this.mouseMoveId = jsGFwk.IO.mouse.registerMove(function (coord) {
			jsGFwk._gameObjects.hud.fakeMouse.x = coord.x;
			jsGFwk._gameObjects.hud.fakeMouse.y = coord.y;
			if (jsGFwk._gameObjects.hud.fakeMouse.isRectColliding(jsGFwk._gameObjects.hud.startCoord)) {
				jsGFwk._gameObjects.hud.startSpriteToShow = 1;
			} else {
				jsGFwk._gameObjects.hud.startSpriteToShow = 0;
			}
		});
	},
	update: function (delta) { },
	draw: function (context) {
		context.drawImage(jsGFwk.ResourceManager.graphics.main.image, 0, 0);
		context.drawImage(jsGFwk.Sprites.startButton.spriteBag[this.startSpriteToShow].image, 
			this.startCoord.x, this.startCoord.y);
	}
};