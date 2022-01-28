var loader = {
		id: "progress",
		visible: true,
		barWidth: 0,
		ran: 10,
		blinking: false,
		init: function() {
			jsGFwk.ResourceManager.onResourcesLoadedCompleted = function() {
				jsGFwk.Sprites.createSpriteCollection("walkingRight", jsGFwk.ResourceManager.graphics.main.image, 
					[{left: 0, top: 0, width: 25, height: 29, inverted: false},
					 {left: 49, top: 0, width: 25, height: 29, inverted: false},
					 {left: 25, top: 0, width: 24, height: 29, inverted: false}]);
				jsGFwk.Sprites.walkingRight.loop(true);
				
				jsGFwk.Sprites.createSpriteCollection("walkingLeft", jsGFwk.ResourceManager.graphics.main.image, 
					[{left: 25, top: 0, width: 24, height: 29, inverted: true},
					 {left: 49, top: 0, width: 25, height: 29, inverted: true},
					 {left: 0, top: 0, width: 25, height: 29, inverted: true}]);
				jsGFwk.Sprites.walkingLeft.loop(true);
				
				jsGFwk.Sprites.createSpriteCollection("floor", jsGFwk.ResourceManager.graphics.main.image, 
					[{left: 0, top: 38, width: 30, height: 15, inverted: false},
					 {left: 30, top: 38, width: 30, height: 15, inverted: false}]);
					 
				jsGFwk.Sprites.createSpriteCollection("coin", jsGFwk.ResourceManager.graphics.main.image, 
					[{left: 65, top: 37, width: 10, height: 14, inverted: false},
					 {left: 75, top: 37, width: 10, height: 14, inverted: false},
					 {left: 85, top: 37, width: 10, height: 14, inverted: false},
					 {left: 95, top: 37, width: 10, height: 14, inverted: false}]);
				jsGFwk.Sprites.coin.loop(true);
				
				jsGFwk.Sprites.createSpriteCollection("shareButton", jsGFwk.ResourceManager.graphics.main.image, 
					[{left: 112, top: 11, width: 40, height: 40, inverted: false},
					 {left: 156, top: 11, width: 40, height: 40, inverted: false}]);
					 
				jsGFwk.Sprites.createSpriteCollection("smoke", jsGFwk.ResourceManager.graphics.main.image, 
					[{left: 7, top: 69, width: 32, height: 28, inverted: false},
					 {left: 39, top: 69, width: 32, height: 28, inverted: false}]);
				jsGFwk.Sprites.smoke.loop(true);
				
				jsGFwk.Sprites.createSprite({id: "winLeft", graphic: jsGFwk.ResourceManager.graphics.main.image, 
					left: 75, top: 0, 
					width: 25, height: 29, 
					inverted: false});
					
				jsGFwk.Sprites.createSprite({id: "winRight", graphic: jsGFwk.ResourceManager.graphics.main.image, 
					left: 75, top: 0, 
					width: 25, height: 29, 
					inverted: true});
			
				jsGFwk.Scenes.scenes.scene1.enable();
				jsGFwk._gameObjects.hud.start();
			};
		},
		update: function(delta) {
			var a = (jsGFwk.ResourceManager._totalLoadedResources * 100) / jsGFwk.ResourceManager._totalResources;
			this.barWidth = (a * 270) / 100;
			this.blinking = !this.blinking;
			this.ran++;
			if (this.ran >= 200) { this.ran = 0; }
		},
		draw: function (context) {
			context.save();
				context.fillStyle = "#00FF00";
				context.fillRect(0,0, 320, 240);
				
				if (this.blinking) {
					for (var i = 0; i <= 10; i++) {
						for (var j = 0; j <= 3; j++) {
							context.fillStyle = "#FF00FF";
							context.fillRect(j * 110, ((i * 50) + (j * 10) + this.ran) - 200, 110, 20);
						}
					}
				}
			
				context.fillStyle = "#FFFF00";
				context.fillRect(20, 20, 280, 200);
				
				context.fillStyle = "#000000";
				context.font = "20pt zxFont";
				context.fillText("Loading...", 110, 100);
				
				context.strokeStyle = "#FFFFFF";
				context.strokeRect(25, 120, 270, 30);
				context.fillRect(25, 120, this.barWidth, 30);
			context.restore();
		}
	};