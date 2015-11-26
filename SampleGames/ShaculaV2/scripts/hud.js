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
                GLOBAL.cloudContainer.clearAll();
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
        
        //GLOBAL.wallPattern = jsGFwk.FastAnimation._2Dbuffer.createPattern(jsGFwk.Sprites.wall1.image, "repeat");
	},
	update: function (delta) { 
        var p = (Math.random() * 50) + 50;

        GLOBAL.cloudContainer.cloneObject({ 
            x: (Math.random() * 600) + 10, 
            y: 480, 
            width: (89 * p) / 100,
            height: (86 * p) / 100, 
            speed: (Math.random() * 1) + 1
        });
    },
	draw: function (context) {
		context.drawImage(jsGFwk.ResourceManager.graphics.main.image, 0, 0);
		context.drawImage(jsGFwk.Sprites.startButton.spriteBag[this.startSpriteToShow].image, 
			this.startCoord.x, this.startCoord.y);
	}
};