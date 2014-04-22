var loader = {
		id: "progress",
		visible: true,
		barWidth: 0,
		init: function() {
			jsGFwk.ResourceManager.onResourcesLoadedCompleted = function() {
				jsGFwk.Sprites.createSprite({id: "map", graphic: jsGFwk.ResourceManager.graphics.main.image, 
					left: 0, top: 0, width: 336, height: 372, inverted: false});
					
				jsGFwk.Sprites.createSprite({id: "normalPill", graphic: jsGFwk.ResourceManager.graphics.main.image, 
					left: 342, top: 5, width: 5, height: 5, inverted: false});
					
				jsGFwk.Sprites.createSprite({id: "bigPill", graphic: jsGFwk.ResourceManager.graphics.main.image, 
					left: 358, top: 6, width: 12, height: 12, inverted: false});
					 
				jsGFwk.Sprites.createSpriteCollection("rightPacman", jsGFwk.ResourceManager.graphics.main.image, 
					[{left: 413, top: 63, width: 17, height: 18, inverted: false},
					 {left: 430, top: 63, width: 18, height: 18, inverted: false},
					 {left: 448, top: 63, width: 17, height: 18, inverted: false}]);
				jsGFwk.Sprites.rightPacman.loop(true);
					 
				jsGFwk.Sprites.createSpriteCollection("leftPacman", jsGFwk.ResourceManager.graphics.main.image, 
					[{left: 448, top: 63, width: 17, height: 18, inverted: true},
					 {left: 430, top: 63, width: 18, height: 18, inverted: false},
					 {left: 413, top: 63, width: 17, height: 18, inverted: true}]);
				jsGFwk.Sprites.leftPacman.loop(true);
					 
				jsGFwk.Sprites.createSpriteCollection("upPacman", jsGFwk.ResourceManager.graphics.main.image, 
					[{left: 412, top: 85, width: 18, height: 17, inverted: false},
					 {left: 430, top: 84, width: 18, height: 18, inverted: false},
					 {left: 448, top: 85, width: 18, height: 17, inverted: false}]);
				jsGFwk.Sprites.upPacman.loop(true);
					 
				jsGFwk.Sprites.createSpriteCollection("downPacman", jsGFwk.ResourceManager.graphics.main.image, 
					[{left: 412, top: 105, width: 18, height: 17, inverted: false},
					 {left: 430, top: 105, width: 18, height: 18, inverted: false},
					 {left: 448, top: 105, width: 18, height: 17, inverted: false}]);
				jsGFwk.Sprites.downPacman.loop(true);
							
				jsGFwk.Scenes.scenes.game.enable();
				jsGFwk._gameObjects.progress.destroy();
			};
		},
		update: function(delta) {
			var a = (jsGFwk.ResourceManager._totalLoadedResources * 100) / jsGFwk.ResourceManager._totalResources;
			this.barWidth = (a * 280) / 100;
		},
		draw: function (context) {
			context.save();
				context.fillStyle = "black";
				context.fillRect(0,0, 336, 372);

				context.fillStyle = "#ACACAC";
				context.font = "18pt arial bold";
				context.fillText("GhostMan!", 25, 140);
				
				context.fillStyle = "#BBBBBB";
				context.font = "12pt arial bold";
				context.fillText("loading...", 25, 170);
				
				context.fillStyle = "YELLOW";
				context.strokeStyle = "#BBBBBB";
				context.strokeRect(25, 180, 280, 30);
				context.fillRect(25, 180, this.barWidth, 30);
			context.restore();
		}
	};