var loader = {
		id: "progress",
		visible: true,
		barWidth: 0,
		init: function() {
			jsGFwk.ResourceManager.onResourcesLoadedCompleted = function() {
				jsGFwk.Sprites.createSpriteCollection("redButton", jsGFwk.ResourceManager.graphics.mainGraphics.image, 
					[{left: 732, top: 536, width: 133, height: 133, inverted: false},
					 {left: 882, top: 536, width: 133, height: 133, inverted: false}]);
					 
				jsGFwk.Sprites.createSpriteCollection("metter", jsGFwk.ResourceManager.graphics.mainGraphics.image, 
					[{left: 624, top: 264, width: 375, height: 37, inverted: false},
					 {left: 623, top: 314, width: 378, height: 40, inverted: false}]);
				
				jsGFwk.Sprites.createSpriteCollection("turtleIdle", jsGFwk.ResourceManager.graphics.mainGraphics.image, 
					[{left: 472, top: 14, width: 27, height: 45, inverted: false},
					 {left: 503, top: 14, width: 28, height: 45, inverted: false},
					 {left: 534, top: 14, width: 28, height: 45, inverted: false},
					 {left: 563, top: 14, width: 28, height: 45, inverted: false},
					 {left: 594, top: 14, width: 27, height: 45, inverted: false},
					 {left: 625, top: 14, width: 27, height: 45, inverted: false}]);
				jsGFwk.Sprites.turtleIdle.loop(true);
				
				jsGFwk.Sprites.createSpriteCollection("turtleRunning", jsGFwk.ResourceManager.graphics.mainGraphics.image, 
					[{left: 476, top: 84, width: 29, height: 44, inverted: false},
					 {left: 524, top: 84, width: 36, height: 44, inverted: false},
					 {left: 572, top: 84, width: 39, height: 44, inverted: false},
					 {left: 623, top: 84, width: 37, height: 45, inverted: false},
					 {left: 676, top: 84, width: 29, height: 44, inverted: false},
					 {left: 727, top: 84, width: 29, height: 45, inverted: false},
					 {left: 771, top: 84, width: 36, height: 44, inverted: false},
					 {left: 823, top: 84, width: 32, height: 44, inverted: false}]);
				jsGFwk.Sprites.turtleRunning.loop(true);
				
				jsGFwk.Sprites.createSprite({id: "floor", graphic: jsGFwk.ResourceManager.graphics.environment1.image, 
					left: 0, top: 0, width: 690, height: 128, inverted: false});
					
				jsGFwk.Sprites.createSprite({id: "alertSign", graphic: jsGFwk.ResourceManager.graphics.mainGraphics.image, 
					left: 352, top: 8, width: 100, height: 101, inverted: false});
					
				jsGFwk.Sprites.createSprite({id: "clouds", graphic: jsGFwk.ResourceManager.graphics.environment1.image, 
					left: 0, top: 144, width: 690, height: 320, inverted: false});
					
				jsGFwk.Sprites.createSpriteCollection("obstacles", jsGFwk.ResourceManager.graphics.mainGraphics.image, 
					[{left: 183, top: 616, width: 28, height: 51, inverted: false},
					 {left: 249, top: 618, width: 28, height: 51, inverted: false},
					 {left: 179, top: 699, width: 28, height: 51, inverted: false}]);
				jsGFwk.Sprites.obstacles.loop(false);
							
				jsGFwk.Scenes.scenes.intro.enable();
				jsGFwk._gameObjects.progress.destroy();
			};
		},
		update: function(delta) {
			var a = (jsGFwk.ResourceManager._totalLoadedResources * 100) / jsGFwk.ResourceManager._totalResources;
			this.barWidth = (a * 550) / 100;
		},
		draw: function (context) {
			context.save();
				context.fillStyle = "#FFFFFF";
				context.fillRect(0,0, 600, 400);

				context.fillStyle = "#ACACAC";
				context.font = "18pt arial bold";
				context.fillText("Que no se te escape la tortuga!", 25, 140);
				
				context.fillStyle = "#BBBBBB";
				context.font = "12pt arial bold";
				context.fillText("loading...", 25, 170);
				
				context.fillStyle = "#CCCCCC";
				context.strokeStyle = "#BBBBBB";
				context.strokeRect(25, 180, 550, 30);
				context.fillRect(25, 180, this.barWidth, 30);
				context.drawImage(jsGFwk.ResourceManager.graphics.loadingTurtle.image,
					this.barWidth + 28, 190);
			context.restore();
		}
	};