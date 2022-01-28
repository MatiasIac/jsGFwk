var game = {
	id: "game",
	zOrder: 0,
	visible: true,
	
	turn: 0,
	coinRolling: true,
	coinDelta: 0,
	coinXPos: 190,
	coinSpeed: 12,
	playerSelection: 0,
	playerSelected: false,
	keyPressId: -1,
	showOptions: true,
	
	winRight: false,
	winLeft: false,
	
	init: function () {	},
	
	startGame: function () {
		jsGFwk.Sprites.coin.next();
		this.registerKeys();
	},
	
	registerKeys: function () {
		jsGFwk._gameObjects.game.keyPressId = jsGFwk.IO.keyboard.registerKeypress(function (code) {
			switch(code) {
				case 49:
					jsGFwk.ResourceManager.sounds.selection.audio.play();
					jsGFwk._gameObjects.game.playerSelection = 0;
					jsGFwk._gameObjects.game.playerSelected = true;
					break;
				case 50:
					jsGFwk.ResourceManager.sounds.selection.audio.play();
					jsGFwk._gameObjects.game.playerSelection = 1;
					jsGFwk._gameObjects.game.playerSelected = true;
					break;
			}			
		});
	},
	
	restart: function () {
		jsGFwk.Sprites.coin.reset();
		jsGFwk._gameObjects.knights.restart();
		jsGFwk._gameObjects.knights.visible = true;
		jsGFwk._gameObjects.share.visible = false;
		jsGFwk._gameObjects.game.showOptions = true;
		jsGFwk._gameObjects.game.winRight = false;
		jsGFwk._gameObjects.game.winLeft = false;
		jsGFwk._gameObjects.game.coinXPos = 190;
		jsGFwk._gameObjects.game.playerSelection = 0;
		jsGFwk._gameObjects.game.playerSelected = false;
		jsGFwk._gameObjects.game.registerKeys();
		jsGFwk._gameObjects.game.coinSpeed = 12;
		jsGFwk._gameObjects.game.coinRolling = true;
	},
	
	calculateGame: function() {
		var coinResult = parseInt(Math.random() * 2);
	
		if (!jsGFwk._gameObjects.game.playerSelected || coinResult != jsGFwk._gameObjects.game.playerSelection) {
			jsGFwk._gameObjects.share.bind();
			jsGFwk._gameObjects.share.visible = true;
			jsGFwk._gameObjects.game.showOptions = false;
			jsGFwk._gameObjects.game.winRight = true;
			
			if (GLOBALS.RECORD < GLOBALS.WONS) {
				GLOBALS.RECORD = GLOBALS.WONS;
			}
			return;
		}
		
		jsGFwk.ResourceManager.sounds.won.audio.play();
		
		GLOBALS.WONS++;
		jsGFwk._gameObjects.game.winLeft = true;
		setTimeout(function() {	jsGFwk._gameObjects.game.restart(); }, 2000);
	},
	
	update: function (delta) {
		if (this.coinRolling) {
			this.coinDelta += delta;
			if (this.coinDelta > 0.1) {
				this.coinDelta = 0;
				jsGFwk.Sprites.coin.next();
				this.coinXPos -= this.coinSpeed;
				
				if (this.coinXPos < 70) {
					this.coinSpeed *= -1;
				}
				
				if (this.coinXPos > 190) {
					//Signal of calculate game
					this.coinSpeed = 0;
					this.coinXPos = 190;
					this.coinRolling = false;
					jsGFwk.IO.keyboard.unregisterKeypress(this.keyPressId);
					jsGFwk._gameObjects.knights.restart();
					jsGFwk._gameObjects.knights.isMoving = true;
					jsGFwk._gameObjects.knights.signalOfEndAnimation = this.calculateGame;
				}
			}			
		}
	},
	
	draw: function (context) {
		context.save()
			if (this.showOptions) {
				context.drawImage(jsGFwk.Sprites.coin.sprite.image, 150, this.coinXPos);
				
				context.fillStyle = "white";
				
				context.font = "28pt zxFont";
				context.fillText("Wons: " + GLOBALS.WONS, 10, 20);
				
				context.font = "20pt zxFontNormal";
				context.fillText("1 - Tail   or   2 - Head", 30, 70);
				
				if (this.playerSelected) {
					context.fillText((this.playerSelection == 0 ? "Tail" : "Head"), 140, 90);
				}
			}
			
			if (this.winRight) {
				context.drawImage(jsGFwk.Sprites.winRight.image, 210, 175);
			} else if (this.winLeft) {
				context.drawImage(jsGFwk.Sprites.winLeft.image, 40, 175);
			}
		context.restore();
	}
}